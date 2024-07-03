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
      <div className="block mt-4">
        <Label
          htmlFor={data.htmlFor}
          className="inline-block w-[10%] text-left "
        >
          {data.str}{" "}
        </Label>
        <Input
          type={data.type}
          id={data.id}
          name={data.name}
          placeholder={data.placeholder}
          className="w-[40%] ml-4 inline-block border-black rounded border text-black"
        />
      </div>
    </>
  );
}

export function LinkButton() {
  const pathname = usePathname();

  return (
    <>
      <div className="w-full text-center text-white flex items-center justify-center">
        <Link
          className={`link p-4 ${pathname === "/data" ? "active" : "border-b-4 border-b-white"}`}
          href="/"
        >
          Home
        </Link>

        <Link
          className={`link p-4 ${pathname === "/" ? "active" : "border-b-4 border-b-white"}`}
          href="/data"
        >
          Registeration
        </Link>
      </div>
    </>
  );
}
