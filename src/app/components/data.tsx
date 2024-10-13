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
      <div className="flex">
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
          autoComplete="new-password"
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

interface iEvents {
  title: string;
  time: string;
  paragraph: string;
  img: string;
}
export function Events(data: iEvents) {
  return (
    <>
      <div className="flex items-center mx-auto pt-10 w-2/4 ">
        <img
          src={data.img}
          alt={"Murti"}
          className="object-cover h-60 w-60 border-solid border-4 border-white float-left"
        />
        <div className="pl-5">
          <h1 className="text-red-700 text-2xl">{data.title}</h1>
          <p className="font-bold">{data.time}</p>
          <p className="pt-4">{data.paragraph}</p>
        </div>
      </div>
    </>
  );
}
