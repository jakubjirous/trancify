"use client";

import EditableInput from "@/components/now-playing/editable-input";
import TrackCover from "@/components/now-playing/track-cover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePlayer } from "@/hooks/use-player";
import { Disc3 } from "lucide-react";

export default function NowPlaying() {
  const { currentTrack, isPlaying } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  const { id, name, coverUrl, artist, album, featuring, genre, bpm } =
    currentTrack;

  return (
    <aside className="flex h-full w-full max-w-96 flex-col justify-between border-l border-l-muted">
      <div className="pt-4">
        <div className="px-3 py-4">
          <h2 className="mb-2 px-4 font-semibold text-xl tracking-tight">
            Now Playing
          </h2>
        </div>
        <div className="flex px-6 py-3">
          <TrackCover trackId={id} coverUrl={coverUrl} />
        </div>
        <div className="flex flex-col gap-4 px-6 py-4">
          <EditableInput
            trackId={id}
            initialValue={name}
            label="Title"
            field="name"
          />
          <EditableInput
            trackId={id}
            initialValue={artist}
            label="Artist"
            field="artist"
          />
          <EditableInput
            trackId={id}
            initialValue={featuring ?? "–"}
            label="Featuring"
            field="featuring"
          />
          <EditableInput
            trackId={id}
            initialValue={album ?? "–"}
            label="Album"
            field="album"
          />
          <EditableInput
            trackId={id}
            initialValue={genre ?? "–"}
            label="Genre"
            field="genre"
          />
          <EditableInput
            trackId={id}
            initialValue={bpm?.toString() ?? "–"}
            label="BPM"
            field="bpm"
          />
        </div>
      </div>
      {isPlaying && (
        <div className="flex w-full items-end gap-0.5">
          {Array.from({ length: 96 }, (_, index) => (
            <div
              key={index}
              className="w-0.5 animate-wave-bar rounded-md rounded-tr-md bg-muted-foreground"
              style={{
                animationDelay: `${index * Math.random() * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
    </aside>
  );
}