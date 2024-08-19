import React from "react";
import Search from "@/components/shared/Search/SearchInput";

const SearchPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4">
      <Search />
    </div>
  );
};

export default SearchPage;
