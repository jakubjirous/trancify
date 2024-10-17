"use client";

import { Input } from "@/components/ui/input";
import { usePlaylist } from "@/hooks/use-playlist";
import { updatePlaylistNameAction } from "@/lib/actions";
import { cn } from "@/utils/cn";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function EditableName({
  playlistId,
  initialName,
}: { playlistId: string; initialName: string }) {
  const { updatePlaylist } = usePlaylist();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(initialName);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

    if (name.trim() !== "" && name !== initialName) {
      updatePlaylist(playlistId, { name });
      await updatePlaylistNameAction(playlistId, name);
    } else {
      setName(initialName);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="flex h-16 items-start">
        <Input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setIsEditing(false)}
        />
      </form>
    );
  }

  return (
    <h1
      tabIndex={0}
      onClick={() => setIsEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          setIsEditing(true);
        }
      }}
      className={cn(
        "mb-4 min-h-12 cursor-pointer rounded-md font-bold text-5xl",
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      )}
    >
      {name}
    </h1>
  );
}
