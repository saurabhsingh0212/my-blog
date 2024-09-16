import {
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const convertBlocksIntoSingleString = (
  blocks: { [key: string]: any }[]
) => {
  const textArray: string[] = [];
  const types = [
    "paragraph",
    // "bulleted_list",
    // "numbered_list",
    "heading_1",
    "heading_2",
    "heading_3",
  ];
  blocks.forEach((item) => {
    if (types.includes(item.type)) {
      const itemTextArray = (
        item[item.type].rich_text as RichTextItemResponse[]
      ).map((block) => {
        return block.plain_text;
      });
      textArray.push(itemTextArray.join(" "));
    } else if (item.type === "bulleted_list") {
      const itemTextArray = item.children.map(
        (item: BulletedListItemBlockObjectResponse) => {
          const arrayString = item.bulleted_list_item.rich_text.map((block) => {
            return block.plain_text;
          });
          return arrayString.join(" ");
        }
      );

      textArray.push(itemTextArray.join(" "));
      //   const itemTextArray = items;
    } else if (item.type === "numbered_list") {
      const itemTextArray = item.children.map(
        (item: NumberedListItemBlockObjectResponse) => {
          const arrayString = item.numbered_list_item.rich_text.map((block) => {
            return block.plain_text;
          });
          return arrayString.join(" ");
        }
      );

      textArray.push(itemTextArray.join(" "));
    }
  });

  return textArray.join();
};
