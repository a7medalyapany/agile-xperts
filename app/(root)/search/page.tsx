import React from "react";
import { createClient } from "@/lib/supabase/server";
import Search from "@/components/shared/Search/SearchInput";
import SearchFilter from "@/components/shared/Search/FilterSidebar";

const SearchPage: React.FC = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col sm:space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="hidden w-fit sm:block sm:w-1/5">
        <SearchFilter />
      </aside>
      <div className="block lg:max-w-2xl lg:flex-1">
        <div className="flex min-h-screen flex-col items-center gap-4">
          <Search userId={user?.id ?? null} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
