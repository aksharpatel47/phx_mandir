import { z } from "zod";

export const registrationSchema = z
  .object({
    fullname: z.string().trim().min(1).max(120),
    email: z.string().trim().max(254).pipe(z.email().or(z.literal(""))),
    cellPhone: z.string().trim().max(20),
    addressLine: z.string().trim().max(500),
  })
  .refine((data) => Boolean(data.email || data.cellPhone || data.addressLine), {
    error: "Please provide an email address, cell phone number, or address.",
  });

export type RegistrationState = {
  status: "idle" | "error" | "success";
  message: string;
};

export function escapeMarkdownV2(text: string) {
  return text.replace(/([\\_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

export function registrationMessage(data: z.infer<typeof registrationSchema>) {
  return [
    "*New User Registration*",
    `*Name:* ${escapeMarkdownV2(data.fullname)}`,
    `*Email:* ${escapeMarkdownV2(data.email)}`,
    `*Cell Phone:* ${escapeMarkdownV2(data.cellPhone)}`,
    `*Address:* ${escapeMarkdownV2(data.addressLine)}`,
  ].join("\n");
}
