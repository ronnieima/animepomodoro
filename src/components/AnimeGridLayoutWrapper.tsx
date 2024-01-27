import React, { PropsWithChildren } from "react";

export default function AnimeGridLayoutWrapper({
  children,
}: PropsWithChildren) {
  return (
    <div className="flex max-w-7xl flex-wrap justify-center gap-8">
      {children}
    </div>
  );
}
