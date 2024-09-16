import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface Blog {
  id: string;
  title: string;
  tags: string[];
  description: string;
  date: string;
  slug: string;
}

// interface BlogList {
//   id: string;
//   type: string;
//   children: any[];
// }

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const getBlogDetails = (post: any): Blog => {
  const getTags = () => {
    return post.properties.Tags.multi_select.map((item: any) => item.name);
  };

  return {
    id: post.id,
    title: post.properties.Title.title[0].plain_text,
    tags: getTags(),
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
  };
};

export const getAllPublished = async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "Status",
        status: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    return response.results.map((item) => getBlogDetails(item));
  } catch (error: any) {
    console.error(error);
    const errText = error.toString();
    console.log("error message: ", errText);
    return [];
  }
};

export const getPageBlocks = async (pageId: string) => {
  const response = await notion.blocks.children.list({ block_id: pageId });

  // const createList = (type: string): BlogList => ({
  //   id: Math.floor(Math.random() * 100000).toString(),
  //   type: type,
  //   children: [],
  // });

  if (response.results.length > 0) {
    const results = response.results.reduce(
      (initialResult: any, currentResult) => {
        const item = currentResult as BlockObjectResponse;
        if (item.type === "bulleted_list_item") {
          if (
            initialResult[initialResult.length - 1].type === "bulleted_list"
          ) {
            initialResult[initialResult.length - 1].children.push(item);
          } else {
            initialResult.push({
              id: Math.floor(Math.random() * 100000).toString(),
              type: "bulleted_list",
              children: [item],
            });
          }
        } else if (item.type === "numbered_list_item") {
          if (
            initialResult[initialResult.length - 1].type === "numbered_list"
          ) {
            initialResult[initialResult.length - 1].children.push(item);
          } else {
            initialResult.push({
              id: Math.floor(Math.random() * 100000).toString(),
              type: "numbered_list",
              children: [item],
            });
          }
        } else initialResult.push(item);

        return initialResult;
      },
      []
    );

    return results;
    // const bulletedListItemIndex: number[] = [];
    // const bulletedList = createList("bulleted_list");
    // const numberedListItemIndex: number[] = [];
    // const numberedList = createList("numbered_list");

    // results.forEach((block, index) => {
    //   if (block.type === "bulleted_list_item") {
    //     bulletedListItemIndex.push(index);
    //     bulletedList.children.push(block);
    //   }
    //   if (block.type === "numbered_list_item") {
    //     numberedListItemIndex.push(index);
    //     numberedList.children.push(block);
    //   }
    // });

    // bulletedListItemIndex.forEach((itemIndex, index) => {
    //   results[itemIndex] = index === 0 ? bulletedList : {};
    // });

    // numberedListItemIndex.forEach((itemIndex, index) => {
    //   results[itemIndex] = index === 0 ? numberedList : {};
    // });

    // // https://stackoverflow.com/questions/33884033/how-can-i-remove-empty-object-in-from-an-array-in-js
    // return results.filter((value) => Object.keys(value).length !== 0);
  }
  return [];
};

export const getBlogPageBySlug = async (slug: string): Promise<Blog | {}> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  if (response.results.length) {
    return getBlogDetails(response.results[0]);
  }

  return {};
};

export const getBlogsByTag = async (tag?: string) => {
  try {
    if (!tag) {
      return [];
    }

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "Tags",
        multi_select: {
          contains: tag,
        },
        and: [
          {
            property: "Status",
            status: {
              equals: "Published",
            },
          },
        ],
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    return response.results.map((item) => getBlogDetails(item));
  } catch (error: any) {
    console.error(error);
    const errText = error.toString();
    console.log("error message: ", errText);
    return [];
  }
};
