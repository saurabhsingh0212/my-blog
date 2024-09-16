import Link from "next/link";
// components
import RightArrow from "./icons/RightArrow";
// lib
import { Blog } from "@/lib/notion";
// utils
import { formatDate } from "@/utils/dateFormatter";

export default function Post({
  posts,
  showTags = true,
}: {
  posts: Blog[];
  showTags?: Boolean;
}) {
  const Post = ({ post }: { post: Blog }) => {
    return (
      <li key={post.id}>
        <p className="blog-title">{post.title}</p>
        <p className="description">{post.description}</p>
        {showTags ? (
          <div className="tags">
            {post.tags.map((tag) => (
              <Link
                key={`${post.id}_${tag}`}
                href={`/tags/${tag}`}
                className="tag"
              >
                <span key={tag}>#{tag}</span>
              </Link>
            ))}
          </div>
        ) : null}
        <div className="date-link-container">
          <p>{formatDate(post.date)}</p>
          <Link href={`/blog/${post.slug}`} className="read-more-button">
            Read Post <RightArrow width="20" height="20" />
          </Link>
        </div>
      </li>
    );
  };

  return (
    <ul className="blog-post-list">
      {posts.map((item) => {
        return <Post key={item.id} post={item} />;
      })}
    </ul>
  );
}
