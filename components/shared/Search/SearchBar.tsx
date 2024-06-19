"use client";

import { FC, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  query: string;
  term: string;
  setQuery: (query: string) => void;
  handleSearch: (term: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ query, term, setQuery, handleSearch }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const debouncedHandleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    debouncedHandleSearch(term);
  }, [term, debouncedHandleSearch]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div className="search-bar flex items-center mb-4 justify-center">
      <div className="relative w-1/2">
        <Input
          className="input w-full pl-10 "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for anything..."
          defaultValue={searchParams.get('query')?.toString() || ''}
        />
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      </div>
      <Button className="ml-2" onClick={() => handleSearch(query)}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
