import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SearchResultsProps {
  results: Array<{ title: string; description: string; link: string }>;
}

const SearchResults: FC<SearchResultsProps> = ({ results }) => (
  <div className="">
    {results.length === 0 ? (
      <p>No results found</p>
    ) : (
      <ul className="list-none">
        {results.map((result, index) => (
          <li key={index} className="mb-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  <a href={result.link} className="text-primary">
                    {result.title}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{result.description}</CardDescription>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SearchResults;
