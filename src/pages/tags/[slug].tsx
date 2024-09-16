import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// components
// import Post from "@/components/Post";
import { HomeIcon } from "@/components/icons/Home";
// lib
import { Blog, getBlogsByTag } from "@/lib/notion";
// utils
import { TAGS_DESCRIPTION, TAG_LIST } from "@/utils/const";
import Head from "next/head";

export const getStaticPaths = async () => {
  const paths = TAG_LIST.map((item) => {
    return {
      params: {
        slug: item,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;
  const posts = await getBlogsByTag(slug);

  return {
    props: {
      posts: posts ? posts : [],
    },
  };
};

const Post = dynamic(() => import("@/components/Post"));

export default function Tag({ posts }: { posts: Blog[] }) {
  const router = useRouter();
  const slug = router.query.slug as string;
  const fullTitle = TAGS_DESCRIPTION[slug]?.fullName || "Tag name";
  const description =
    TAGS_DESCRIPTION[slug]?.description ||
    "There is no short description for the above tag.";

  return (
    <main className="blog-page-container">
      <Head>
        <title>#{fullTitle} | Eazypau</title>
        <meta name="description" content={description} />
        <meta
          name="og:site"
          content={`https://my-blog-eazypau.vercel.app/tags/${slug}`}
        />
        <meta name="og:site_name" content={`#${fullTitle} | Eazypau`} />
        <meta name="og:title" content={`#${fullTitle} | Eazypau`} />
        <meta name="og:description" content={description} />
      </Head>
      <nav>
        <Link
          href="/"
          className="p-2 bg-gradient-to-br from-white to-slate-100 rounded-md shadow"
        >
          <HomeIcon width="28" height="28" />
        </Link>
      </nav>
      <h1 className="home-title">{fullTitle}</h1>
      <p className="font-raleway mb-7">{description}</p>
      {posts && posts.length > 0 ? (
        <Post posts={posts} showTags={false} />
      ) : (
        "There is no blog post related to the selected tag."
      )}
    </main>
  );
}
