import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";

export default function Text({ values }: { values: any }) {
  if (!values) {
    return null;
  }
  const textBlocks = values.rich_text as RichTextItemResponse[];

  return textBlocks.map((block, index) => {
    const { bold, code, color, italic, strikethrough, underline } =
      block.annotations;

    if (!block.href) {
      return (
        <span
          key={block.plain_text + index}
          className={[
            bold ? "font-bold" : "",
            code
              ? "text-red-500 bg-gray-200 py-0.5 px-2 rounded"
              : "text-gray-700",
            italic ? "italic" : "",
            strikethrough ? "line-through" : "",
            underline ? "underline" : "",
          ].join(" ")}
          style={color !== "default" ? { color } : {}}
        >
          {block.plain_text}
        </span>
      );
    } else {
      return (
        <a
          key={block.plain_text}
          href={block.href}
          rel="noreferrer noopener"
          className="resource-link"
        >
          {block.plain_text ? block.plain_text : block.href}
        </a>
      );
    }
  });
}
