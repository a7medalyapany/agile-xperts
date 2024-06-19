import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';

interface FilterDropdownProps {
  filter: string;
  setFilter: (filter: string) => void;
  handleSearch: (term: string) => void;
}

const FilterDropdown: FC<FilterDropdownProps> = ({ filter, setFilter, handleSearch }) => (
  <div className="filter-dropdown flex place-content-start mb-2 pr-4 mt-6">
    <Select onValueChange={setFilter} defaultValue={filter}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        <SelectItem value="category1">Category 1</SelectItem>
        <SelectItem value="category2">Category 2</SelectItem>
        <SelectItem value="recent">Most Recent</SelectItem>
      </SelectContent>
    </Select>
    <Button className="ml-2" onClick={() => handleSearch('')}>
      Apply Filter
    </Button>
  </div>
);

export default FilterDropdown;
