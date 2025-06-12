import type { JSX } from "react";

export const highlightText = (text: string, search: string): JSX.Element => {
  if (!search) return <span>{text}</span>;
  const regex = new RegExp(`(${search})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={{ backgroundColor: "#FFFF00" }}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};
