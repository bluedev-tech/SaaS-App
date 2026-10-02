"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") ?? "";
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    if (searchQuery === query) return;

    const timeoutId = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchQuery.trim()) {
        params.set("topic", searchQuery.trim());
      } else {
        params.delete("topic");
      }

      const hasParams = params.toString();
      const nextUrl = `${pathname}${hasParams ? `?${hasParams}` : ""}`;
      router.push(nextUrl, { scroll: false });
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [pathname, query, router, searchParams, searchQuery]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-2 h-fit">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input
        type="text"
        className="outline-none w-full"
        placeholder="Search for lessons"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </div>
  );
};

export default SearchInput;
