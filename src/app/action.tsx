"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendMessage } from "@/app/telegram/bot";

const userSchema = z
  .object({
    fullname: z.string(),
    email: z.string().email().optional().or(z.string().max(0)),
    cellPhone: z.string().max(20).optional(),
    addressLine: z.string().optional(),
  })
  .refine(
    (data) => {
      return !!(
        data.fullname &&
        (data.cellPhone || data.email || data.addressLine)
      );
    },
    {
      message:
        "You must provide either an email or a cell phone number or an address",
    },
  );

// Escape markdown characters
function escapeMarkdownV2(text: string) {
  return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

export async function insertUserData(prevState: string, formdata: FormData) {
  const validationData = userSchema.safeParse(
    Object.fromEntries(formdata.entries()),
  );

  if (!validationData.success) {
    return "Please enter your Full Name along with at least one of the following: Email, Cell Phone, or Address";
  }

  const textArr = [
    ">New User Registration:",
    `*Name:* ${escapeMarkdownV2(validationData.data.fullname)}`,
    `*Email:* ${escapeMarkdownV2(validationData.data.email || "")}`,
    `*Cell Phone:* ${escapeMarkdownV2(validationData.data.cellPhone || "")}`,
    `*Address:* ${escapeMarkdownV2(validationData.data.addressLine || "")}`,
  ];
  const text = textArr.join("\n");

  await sendMessage(text);

  revalidatePath("/");
  redirect("/");
}
