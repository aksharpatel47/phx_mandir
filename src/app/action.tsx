"use server";

import { sendMessage } from "@/app/telegram/bot";
import {
  registrationMessage,
  registrationSchema,
  type RegistrationState,
} from "@/lib/registration";

export async function insertUserData(
  _prevState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const result = registrationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!result.success) {
    return {
      status: "error",
      message:
        "Please enter your full name and a valid email address, cell phone number, or address.",
    };
  }
  try {
    await sendMessage(registrationMessage(result.data));
    return {
      status: "success",
      message: "Your registration has been received.",
    };
  } catch {
    return {
      status: "error",
      message:
        "We couldn’t send your details. Please try again or ask a mandir volunteer for help.",
    };
  }
}
