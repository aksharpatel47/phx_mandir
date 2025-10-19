"use client";
import { useActionState } from "react";
import { insertUserData } from "@/app/action";

import { FormData } from "@/app/components/data";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function Form() {
  const [state, formAction, isPending] = useActionState(insertUserData, "");

  return (
    <>
      <div>
        <form
          action={formAction}
          className=" flex flex-col gap-4 mx-auto w-2/4 my-4 p-8  text-black "
        >
          <div className="text-center flex flex-col gap-4">
            <h1 className="text-4xl border-b-2 border-slate-500 font-bold p-3 ">
              Registration
            </h1>
            <p className="py-4">
              To receive notifications about our upcoming events, please share
              your contact details.
            </p>
            <FormData
              type={"text"}
              htmlFor={"fullname"}
              id={"fullname"}
              name={"fullname"}
              placeholder={"Enter your FullName"}
              str={"FullName: "}
              disabled={isPending}
            />

            <FormData
              type={"email"}
              htmlFor={"email"}
              id={"email"}
              name={"email"}
              placeholder={"Enter your email"}
              str={"Email: "}
              disabled={isPending}
            />
            <FormData
              type={"text"}
              htmlFor={"cellPhone"}
              id={"cellPhone"}
              name={"cellPhone"}
              placeholder={"Enter your cellphone"}
              str={"Cellphone: "}
              disabled={isPending}
            />
            <FormData
              type={"text"}
              htmlFor={"addressLine"}
              id={"addressLine"}
              name={"addressLine"}
              str={"Address: "}
              placeholder={"Enter your Address"}
              disabled={isPending}
            />
          </div>

          {state && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state}</AlertDescription>
            </Alert>
          )}

          <Button
            disabled={isPending}
            className="border border-[2px] text-[18px] w-[100%] h-14 rounded block mx-auto border-black rounded"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </>
  );
}
