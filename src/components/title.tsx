"use client";

import React from "react";

export default function Title({ title }: { title: string }) {
  return (
    <div className="flex h-[6rem] w-full bg-transparent pt-8 backdrop-blur">
      <h2 className="relative px-7 font-semibold text-xl tracking-tight">
        {title}
      </h2>
    </div>
  );
}
