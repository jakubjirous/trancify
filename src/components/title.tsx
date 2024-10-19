"use client";

import React, { ReactNode } from "react";

export default function Title({
  title,
  action,
}: { title: string; action: ReactNode }) {
  return (
    <div className="flex h-[6rem] w-full items-start justify-between bg-transparent px-8 pt-8 backdrop-blur">
      <h2 className="relative font-semibold text-xl tracking-tight">{title}</h2>
      {action}
    </div>
  );
}
