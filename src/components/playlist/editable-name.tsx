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

    const trimmedName = name.trim();

    if (trimmedName !== "" && trimmedName !== initialName) {
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
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setName(initialName);
              setIsEditing(false);
            }
          }}
          className={cn(
            "mb-4 h-12 w-full border-b-2 border-b-primary bg-transparent font-bold text-5xl focus:outline-none",
          )}
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
        "mb-4 h-12 cursor-pointer rounded-md font-bold text-5xl",
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      )}
    >
      {name}
    </h1>
  );
}
