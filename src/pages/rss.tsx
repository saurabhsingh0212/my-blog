import { Feed } from "feed";
import { Blog, getAllPublished } from "@/lib/notion";
import { Http2ServerResponse } from "http2";

const generateRssFeed = async (posts: Blog[]) => {
  const feed = new Feed({
    title: "My Journey As A Software Developer | Eazypau's RSS Feed",
    description:
      "Personal Blog Website. I'm a Software Developer based in Kuala Lumpur, Malaysia. Checkout my blog posts for some cool stories!",
    id: "https://blog.eazypau.com/",
    link: "https://blog.eazypau.com/",
    // id: "http://localhost:3000",
    // link: "http://localhost:3000",
    language: "en",
    image: "https://blog.eazypau.com/favicon-bw.png",
    favicon: "https://blog.eazypau.com/favicon-bw.png",
    copyright: "All rights reserved 2024, Po Yi Zhi",
    author: {
      name: "Po Yi Zhi",
      email: "poyizhi@gmail.com",
      link: "https://www.eazypau.com/",
    },
  });

  posts.forEach((post: Blog) => {
    feed.addItem({
      title: post.title,
      id: "https://blog.eazypau.com/" + post.slug,
      link: "https://blog.eazypau.com/" + post.slug,
      description: post.description,
      date: new Date(post.date),
    });
  });

  return feed.rss2();
};

const Rss = () => {};

export async function getServerSideProps({
  res,
}: {
  res: Http2ServerResponse;
}) {
  const posts = await getAllPublished();

  const rss = await generateRssFeed(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(rss);
  res.end();

  return { props: {} };
}

export default Rss;
