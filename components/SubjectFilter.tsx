"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSubject = searchParams.get("subject") ?? "";
  const [subject, setSubject] = useState<string>(selectedSubject);

  useEffect(() => {
    setSubject(selectedSubject);
  }, [selectedSubject]);

  useEffect(() => {
    if (subject === selectedSubject) return;

    const params = new URLSearchParams(searchParams.toString());

    if (subject) {
      params.set("subject", subject);
    } else {
      params.delete("subject");
    }

    const hasParams = params.toString();
    const nextUrl = `${pathname}${hasParams ? `?${hasParams}` : ""}`;
    router.push(nextUrl, { scroll: false });
  }, [pathname, router, searchParams, selectedSubject, subject]);

  return (
    <Select
      value={subject || undefined}
      onValueChange={(value) => setSubject(value ?? "")}
      defaultValue={subject || undefined}
    >
      <SelectTrigger className="w-180px rounded-lg border border-black bg-white text-sm">
        <SelectValue placeholder="All subjects" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          <SelectItem value="">All subjects</SelectItem>
          {subjects.map((item) => (
            <SelectItem key={item} value={item} className="capitalize">
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
