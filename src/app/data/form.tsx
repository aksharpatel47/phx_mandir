"use client";
import { insertUserData } from "@/app/action";

import { FormData } from "@/app/components/data";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";

export function Form() {
  const [state, formAction] = useFormState(insertUserData, "");

  return (
    <>
      <div>
        {state && <div className="text-white text-center py-4">{state}</div>}
        <form
          action={formAction}
          className=" flex flex-col gap-4 mx-auto w-2/4  text-center my-4 p-8  text-black "
        >
          <h1 className="text-4xl border-b-2 border-slate-500 font-bold p-3 mb-3">
            Registration
          </h1>
          <FormData
            type={"text"}
            htmlFor={"firstName"}
            id={"firstName"}
            name={"firstName"}
            placeholder={"Enter your firstname"}
            str={"FirstName: "}
          />
          <FormData
            type={"text"}
            htmlFor={"lastName"}
            id={"lastName"}
            name={"lastName"}
            placeholder={"Enter your lastname"}
            str={"LastName: "}
          />
          <FormData
            type={"email"}
            htmlFor={"email"}
            id={"email"}
            name={"email"}
            placeholder={"Enter your email"}
            str={"Email: "}
          />
          <FormData
            type={"text"}
            htmlFor={"cellPhone"}
            id={"cellPhone"}
            name={"cellPhone"}
            placeholder={"Enter your cellphone"}
            str={"Cellphone: "}
          />
          <FormData
            type={"text"}
            htmlFor={"addressLine1"}
            id={"addressLine1"}
            name={"addressLine1"}
            str={"Address line 1: "}
            placeholder="Street address"
          />
          <FormData
            type={"text"}
            htmlFor={"addressLine2"}
            id={"addressLine2"}
            name={"addressLine2"}
            str={"Address line 2: "}
            placeholder="Apartment/Suite"
          />
          <FormData
            type={"text"}
            htmlFor={"city"}
            id={"city"}
            name={"city"}
            str={"City: "}
            placeholder="City"
          />
          <FormData
            type={"text"}
            htmlFor={"state"}
            id={"state"}
            name={"state"}
            str={"State: "}
            placeholder="State"
          />
          <FormData
            type={"number"}
            htmlFor={"zipCode"}
            id={"zipCode"}
            name={"zipCode"}
            str={"Zip Code: "}
            placeholder="ZipCode"
          />

          <Button className="border border-[2px] text-[18px] w-[100%] h-14 rounded block mx-auto border-black rounded">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
