"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import Link from "next/link";
interface iFormData {
  type: string;
  htmlFor: string;
  id: string;
  name: string;
  placeholder?: string;
  str: string;
}

export function FormData(data: iFormData) {
  return (
    <>
      <div className="block flex">
        <Label
          htmlFor={data.htmlFor}
          className="inline-block  text-left text-[18px] w-[300px]"
        >
          {data.str}{" "}
        </Label>
        <Input
          type={data.type}
          id={data.id}
          name={data.name}
          placeholder={data.placeholder}
          className=" ml-4 inline-block border-black rounded border text-black"
        />
      </div>
    </>
  );
}

interface iLinkButton {
  href: string;
  text: string;
}
export function LinkButton(str: iLinkButton) {
  const pathname = usePathname();
  return (
    <>
      <Link
        href={str.href}
        className={`py-4 rounded-full text-center ${pathname === `${str.href}` ? "bg-white text-black" : "bg-black text-white"}`}
      >
        {str.text}
      </Link>
    </>
  );
}
