import { Input } from "./input";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./button";

interface KeywordsInputProps {
  initialKeywords?: string[];
  placeholder?: string;
  onKeywordsChange: (keywords: string[]) => void;
}

const TagInput: React.FC<KeywordsInputProps> = ({
  initialKeywords = [],
  placeholder,
  onKeywordsChange,
}) => {
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [inputValue, setInputValue] = useState<string>("");

  // Handles adding new keyword on Enter or comma press, and keyword removal on Backspace
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (event.key === "Enter" || event.key === ",") &&
      inputValue.trim() !== ""
    ) {
      event.preventDefault();
      const newKeywords = [...keywords, inputValue.trim()];
      setKeywords(newKeywords);
      onKeywordsChange(newKeywords);
      setInputValue("");
    } else if (event.key === "Backspace" && inputValue === "") {
      event.preventDefault();
      const newKeywords = keywords.slice(0, -1);
      setKeywords(newKeywords);
      onKeywordsChange(newKeywords);
    }
  };

  // Handles pasting keywords separated by commas, new lines, or tabs
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const paste = event.clipboardData.getData("text");
    const keywordsToAdd = paste
      .split(/[\n\t,]+/)
      .map((keyword) => keyword.trim())
      .filter(Boolean);
    if (keywordsToAdd.length) {
      const newKeywords = [...keywords, ...keywordsToAdd];
      setKeywords(newKeywords);
      onKeywordsChange(newKeywords);
      setInputValue("");
    }
  };

  // Updates the inputValue state as the user types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  // Adds the keyword when the input loses focus, if there's a keyword to add
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (inputValue.trim() !== "" && event.relatedTarget?.tagName !== "BUTTON") {
      const newKeywords = [...keywords, inputValue.trim()];
      setKeywords(newKeywords);
      onKeywordsChange(newKeywords);
      setInputValue("");
    }
  };

  // Removes a keyword from the list
  const removeKeyword = (indexToRemove: number) => {
    const newKeywords = keywords.filter((_, index) => index !== indexToRemove);
    setKeywords(newKeywords);
    onKeywordsChange(newKeywords);
  };

  return (
    <div className="flex w-full flex-wrap items-center rounded-lg border bg-muted p-2">
      <div
        className="flex w-full flex-wrap overflow-y-auto"
        style={{ maxHeight: "300px" }}
      >
        {keywords.map((keyword, index) => (
          <Button
            key={index}
            onClick={() => removeKeyword(index)}
            className="m-1 flex items-center border-2 bg-background px-2 py-1 text-xs text-foreground hover:border-destructive hover:bg-card"
          >
            {keyword}
            <X size={14} className="ml-2 cursor-pointer" />
          </Button>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={(e) => handleBlur(e)}
          className="my-1 flex-1 border-none text-sm outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TagInput;
