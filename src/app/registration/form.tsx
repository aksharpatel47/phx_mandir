"use client";
import { useActionState, useState } from "react";
import { ArrowRight, Check, AlertCircle, LoaderCircle } from "lucide-react";
import { insertUserData } from "@/app/action";

export function Form() {
  const [state, formAction, isPending] = useActionState(insertUserData, {
    status: "idle" as const,
    message: "",
  });
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    cellPhone: "",
    addressLine: "",
  });
  const fieldProps = (name: keyof typeof values) => ({
    value: values[name],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setValues((previous) => ({ ...previous, [name]: event.target.value })),
  });
  if (state.status === "success") {
    return (
      <div className="registration-form success-panel" role="status">
        <span className="success-icon">
          <Check size={32} />
        </span>
        <p className="eyebrow">JAI SWAMINARAYAN</p>
        <h2>Thank you for connecting.</h2>
        <p>
          Your details have been shared with the mandir team. We look forward to
          seeing you again.
        </p>
      </div>
    );
  }
  return (
    <form
      action={formAction}
      className="registration-form"
      aria-busy={isPending}
    >
      <div className="form-heading">
        <h2>Your details</h2>
        <p>Please enter your name and at least one way to reach you.</p>
      </div>
      <fieldset disabled={isPending} className="form-fields">
        <div className="form-field">
          <label htmlFor="fullname">
            Full name <span className="required-mark">*</span>
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            placeholder="Your full name"
            required
            maxLength={120}
            autoComplete="off"
            {...fieldProps("fullname")}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            maxLength={254}
            autoComplete="off"
            {...fieldProps("email")}
          />
        </div>
        <div className="form-field">
          <label htmlFor="cellPhone">Cell phone</label>
          <input
            id="cellPhone"
            name="cellPhone"
            type="tel"
            placeholder="Your phone number"
            maxLength={20}
            autoComplete="off"
            {...fieldProps("cellPhone")}
          />
        </div>
        <div className="form-field">
          <label htmlFor="addressLine">Address</label>
          <input
            id="addressLine"
            name="addressLine"
            type="text"
            placeholder="Street address, city, and ZIP code"
            maxLength={500}
            autoComplete="off"
            {...fieldProps("addressLine")}
          />
        </div>
      </fieldset>
      {state.status === "error" && (
        <div className="form-error" role="alert">
          <AlertCircle size={20} />
          <p>{state.message}</p>
        </div>
      )}
      <button
        disabled={isPending}
        className="button button-primary submit-button"
        type="submit"
      >
        {isPending ? (
          <>
            Submitting… <LoaderCircle className="loading-icon" size={19} />
          </>
        ) : (
          <>
            Stay connected <ArrowRight size={19} />
          </>
        )}
      </button>
      <p className="form-footnote">
        Please check your details before submitting.
      </p>
    </form>
  );
}
