"use client";

import Search from "@/assets/images/honeytips/search.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 쿼리 파라미터를 전달 `search-results` 페이지로 이동
      router.push(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4" role="search">
      <div className="relative w-[362px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-2xl text-gray-400" />
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="키워드를 입력해주세요."
          className="h-[40px] w-full rounded border p-2 pl-10"
        />
      </div>
    </form>
  );
};

export default SearchForm;
