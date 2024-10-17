"use client";

import { usePlayer } from "@/hooks/use-player";
import { updateTrackAction } from "@/lib/actions";
import { UpdateTrack } from "@/lib/db/types";
import { cn } from "@/utils/cn";
import { CheckIcon, Loader2, PencilIcon } from "lucide-react";
import {
  KeyboardEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

export default function EditableInput({
  trackId,
  initialValue,
  field,
  label,
}: {
  trackId: string;
  initialValue: string;
  field: keyof UpdateTrack;
  label: string;
}) {
  const { updateTrack } = usePlayer();

  const [isEditing, setIsEditing] = useState(false);

  const [value, setValue] = useState(initialValue);

  const [showCheck, setShowCheck] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const formRef = useRef<HTMLFormElement>(null);

  // @ts-ignore
  const [state, formAction, pending] = useActionState(updateTrackAction, {
    success: false,
    error: "",
    result: {},
  });

  const handleSubmit = () => {
    setIsEditing(false);

    const trimmedValue = value.trim();

    if (trimmedValue !== "" && trimmedValue !== initialValue) {
      formRef.current?.requestSubmit();
    } else {
      setValue(initialValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(initialValue);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setValue(initialValue);
    setIsEditing(false);
    setShowCheck(false);
  }, [initialValue, trackId]);

  useEffect(() => {
    if (state.success) {
      setShowCheck(true);
    }

    const timer = setTimeout(() => {
      setShowCheck(false);
      updateTrack(state.result);
    }, 2000);

    return () => clearTimeout(timer);
  }, [state.success, updateTrack]);

  return (
    <div className="group flex flex-col gap-1">
      <div className="flex justify-between gap-2">
        <label
          htmlFor={`${field}-input`}
          className="text-muted-foreground text-xs"
        >
          {label}
        </label>
        <div className="flex items-center">
          {pending ? (
            <Loader2 className="size-3 animate-spin" />
          ) : showCheck ? (
            <CheckIcon className="size-3 text-primary" />
          ) : (
            !isEditing && (
              <PencilIcon className="size-3 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100" />
            )
          )}
        </div>
      </div>

      {isEditing ? (
        <form ref={formRef} action={formAction} className="flex w-full">
          <input type="hidden" name="trackId" value={trackId} />
          <input type="hidden" name="field" value={field} />
          <input
            ref={inputRef}
            id={`${field}-input`}
            type="text"
            name={field}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSubmit}
            className={cn(
              "h-6 w-full max-w-42 border-b-2 border-b-primary bg-transparent focus:outline-none",
              state.error && "text-red-500",
            )}
            aria-invalid={state.error ? "true" : "false"}
            aria-describedby={state.error ? `${field}-error` : undefined}
          />
        </form>
      ) : (
        <div
          tabIndex={0}
          onClick={() => setIsEditing(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsEditing(true);
            }
          }}
          className={cn(
            "flex h-6 w-full items-center rounded-md border-b-2 border-b-transparent",
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
        >
          <span
            className={cn("truncate", value ? "" : "text-muted-foreground")}
          >
            {value || "–"}
          </span>
        </div>
      )}
    </div>
  );
}
