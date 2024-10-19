"use client";

import { Button } from "@/components/ui/button";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { Keyboard } from "lucide-react";

export default function KeyboardShortcuts() {
  const { setOpenCommands } = useKeyboardNavigation();

  return (
    <Button
      variant="secondary"
      size="icon"
      className="rounded-full"
      onClick={() => setOpenCommands(true)}
    >
      <Keyboard className="size-4 text-muted-foreground" />
      <span className="sr-only">Open keyboard shortcuts</span>
    </Button>
  );
}
