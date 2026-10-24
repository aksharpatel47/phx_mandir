import { beforeEach, describe, expect, mock, test } from "bun:test";
import { escapeMarkdownV2, registrationSchema } from "../src/lib/registration";

// Never contact Telegram from automated tests.
const sendMessage = mock(async (_message: string) => {});
mock.module("../src/app/telegram/bot", () => ({ sendMessage }));
const { insertUserData } = await import("../src/app/action");
const valid = {
  fullname: "Visitor Example",
  email: "visitor@example.com",
  cellPhone: "",
  addressLine: "",
};
const idle = { status: "idle" as const, message: "" };
function form(values: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

beforeEach(() => {
  sendMessage.mockClear();
});

describe("registration", () => {
  test("requires a real name and at least one contact method", () => {
    expect(
      registrationSchema.safeParse({ ...valid, fullname: "  " }).success,
    ).toBe(false);
    expect(
      registrationSchema.safeParse({
        ...valid,
        email: "",
        cellPhone: "  ",
        addressLine: " ",
      }).success,
    ).toBe(false);
  });
  test("supports each existing contact option independently", () => {
    for (const contact of [
      { email: "visitor@example.com" },
      { cellPhone: "480-555-0100" },
      { addressLine: "123 Example St" },
    ]) {
      expect(
        registrationSchema.safeParse({ ...valid, email: "", ...contact })
          .success,
      ).toBe(true);
    }
  });
  test("rejects invalid email and oversized input", () => {
    expect(
      registrationSchema.safeParse({ ...valid, email: "invalid" }).success,
    ).toBe(false);
    expect(
      registrationSchema.safeParse({ ...valid, fullname: "a".repeat(121) })
        .success,
    ).toBe(false);
  });
  test("escapes Telegram formatting including backslashes", () => {
    expect(escapeMarkdownV2("A_B \\ (C)!")).toBe("A\\_B \\\\ \\(C\\)\\!");
  });
  test("invalid submissions never reach Telegram", async () => {
    expect(
      (await insertUserData(idle, form({ ...valid, fullname: " " }))).status,
    ).toBe("error");
    expect(sendMessage).not.toHaveBeenCalled();
  });
  test("successful delivery returns confirmation", async () => {
    expect((await insertUserData(idle, form(valid))).status).toBe("success");
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage.mock.calls[0][0]).toContain("Visitor Example");
  });
  test("delivery failure returns a recoverable error instead of success", async () => {
    sendMessage.mockRejectedValueOnce(new Error("Unavailable"));
    expect((await insertUserData(idle, form(valid))).status).toBe("error");
  });
});
