"use client";

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
      <label htmlFor="searchQuery" className="sr-only">
        키워드 검색
      </label>
      <input
        type="text"
        id="searchQuery"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="키워드를 입력해주세요."
        className="rounded border p-2"
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default SearchForm;
