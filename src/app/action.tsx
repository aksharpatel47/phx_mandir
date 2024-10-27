"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendMessage } from "@/app/telegram/bot";

const userSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email().optional().or(z.string().max(0)),
    cellPhone: z.string().max(20).optional(),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.cellPhone ||
        data.email ||
        (data.addressLine1 && data.city && data.state && data.zipCode)
      ) {
        return true;
      }

      return false;
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
    return "Please enter your First Name and Last Name along with at least one of the following: Email, Cell Phone, or Address";
  }

  const textArr = [
    ">New User Registration:",
    `*First Name:* ${escapeMarkdownV2(validationData.data.firstName)}`,
    `*Last Name:* ${escapeMarkdownV2(validationData.data.lastName)}`,
    `*Email:* ${escapeMarkdownV2(validationData.data.email || "")}`,
    `*Cell Phone:* ${escapeMarkdownV2(validationData.data.cellPhone || "")}`,
    `*Address Line 1:* ${escapeMarkdownV2(validationData.data.addressLine1 || "")}`,
    `*Address Line 2:* ${escapeMarkdownV2(validationData.data.addressLine2 || "")}`,
    `*City:* ${escapeMarkdownV2(validationData.data.city || "")}`,
    `*State:* ${escapeMarkdownV2(validationData.data.state || "")}`,
    `*Zip Code:* ${escapeMarkdownV2(validationData.data.zipCode || "")}`,
  ];
  const text = textArr.join("\n");

  await sendMessage(text);

  revalidatePath("/");
  redirect("/");
}
