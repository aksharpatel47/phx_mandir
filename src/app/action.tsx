"use server";

import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const userSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email().optional(),
    cellPhone: z.string().max(13).optional(),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
  })
  .refine((data) => {
    if (
      data.email ||
      data.cellPhone ||
      (data.addressLine1 && data.city && data.state && data.zipCode)
    ) {
      return true;
    }

    return false;
  });

export async function insertUserData(formdata: FormData) {
  const validationData = userSchema.safeParse(
    Object.fromEntries(formdata.entries()),
  );

  if (!validationData.success) {
    // TODO
    return;
  }

  await db.insert(users).values(validationData.data);

  revalidatePath("/");
  redirect("/");
}
