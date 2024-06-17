import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

interface NoResultsProps {
  link?: string;
  linkText?: string;
  currentId?: string;
  text?: string;
}

const NoResults: FC<NoResultsProps> = async ({
  link = "/",
  linkText = "No results found",
  text = "No results found",
  currentId,
}) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  return (
    <div className="my-20 flex flex-col items-center justify-center space-y-6 drop-shadow-lg">
      <Image
        src="/assets/images/no-result.webp"
        alt="empty"
        width={200}
        height={200}
        className="size-fit rounded-lg"
      />
      {currentId === userId ? (
        <Link
          href={link}
          className="rounded-md bg-foreground px-4 py-2 text-background transition-all hover:bg-primary hover:text-foreground"
        >
          {linkText}
        </Link>
      ) : (
        <strong>{text}</strong>
      )}
    </div>
  );
};

export default NoResults;
