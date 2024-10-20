"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ROUTES from "@/config/routes";
import { cn } from "@/utils/cn";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();

  const [value, setValue] = useState("");

  const [isInitialized, setIsInitialized] = useState(false);

  const iconStyle =
    "-translate-y-1/2 absolute top-1/2 size-4 text-foreground peer-focus:text-foreground";

  useEffect(() => {
    if (isInitialized) {
      router.replace(`${ROUTES.tracks}?search=${encodeURIComponent(value)}`);
    } else {
      setIsInitialized(true);
    }
  }, [router, value]);

  return (
    <div className={cn("relative")}>
      <SearchIcon className={cn(iconStyle, "left-3.5")} />
      <Input
        data-search-input
        type="search"
        placeholder="Search"
        className={cn("px-10")}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(iconStyle, "right-3 size-7 cursor-pointer")}
          onClick={() => setValue("")}
        >
          <X className="size-4" />
          <span className="sr-only">Clear Search</span>
        </Button>
      ) : (
        <kbd
          className={cn(iconStyle, "right-4 flex items-center justify-center")}
        >
          <span className="rounded-sm border px-2 py-1 font-mono text-foreground text-xs tracking-widest">
            ^2
          </span>
        </kbd>
      )}
    </div>
  );
}
