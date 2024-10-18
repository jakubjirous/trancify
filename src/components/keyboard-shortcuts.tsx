"use client";

import { Button } from "@/components/ui/button";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";

export default function KeyboardShortcuts() {
  const { setOpenCommands } = useKeyboardNavigation();

  return (
    <Button
      variant="secondary"
      size="icon"
      className="rounded-full"
      onClick={() => setOpenCommands(true)}
    >
      <kbd className="flex items-center gap-1 text-muted-foreground">
        <span className="text-lg">⌘</span> <span className="text-xs">K</span>
      </kbd>
      <span className="sr-only">Open keyboard shortcuts</span>
    </Button>
  );
}
