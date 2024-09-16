import dynamic from "next/dynamic";
import Head from "next/head";
// component
// import Post from "@/components/Post";
// lib
import { Blog, getAllPublished } from "@/lib/notion";

export const getStaticProps = async () => {
  const data = await getAllPublished();

  return {
    props: {
      posts: data ? data : [],
    },
  };
};

const Post = dynamic(() => import("@/components/Post"));

export default function Home({ posts }: { posts: Blog[] }) {
  return (
    <main className="blog-page-container">
      <Head>
        <title>My Journey As A Software Developer | Eazypau</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Personal Blog Website. I'm a Software Developer based in Kuala Lumpur, Malaysia. Currently focused on developing website using Vue and React. Checkout my blog posts for some cool stories!"
        />
        <meta name="author" content="Po Yi Zhi" />
        <link rel="shortcut icon" href="favicon-bw.png" type="image/x-icon" />
        <meta name="og:site" content="https://my-blog-eazypau.vercel.app/" />
        <meta
          name="og:site_name"
          content="My Journey As A Software Developer | Eazypau"
        />
        <meta
          name="og:title"
          content="My Journey As A Software Developer | Eazypau"
        />
        <meta
          name="og:description"
          content="Personal Blog Website. I'm a Software Developer based in Kuala Lumpur, Malaysia. Currently focused on developing website using Vue and React. Checkout my blog posts for some cool stories!"
        />
      </Head>
      <h1 className="home-title">My Journey As A Software Developer</h1>
      <p className="font-raleway mb-7">
        Hello there! My name is Po. Here I share bits and pieces I picked up as
        I journey through in my career as a software developer, including my
        life outside of work.
      </p>
      {posts && posts.length > 0 ? (
        <Post posts={posts} />
      ) : (
        "There is no blog post."
      )}
    </main>
  );
}
