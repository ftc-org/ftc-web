import { getPostById, getPosts } from "@/api";
import { PostDetailsPage } from "@/app/components/post-details";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

async function PostPage(props: Props) {
  const post = await getPostById(props.params.id);

  if (!post) return notFound();

  return <PostDetailsPage post={post} />;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const allPosts = await getPosts();

  if (!allPosts || allPosts.length === 0) {
    return [{ id: "1" }, { id: "2" }];
  }

  return allPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default PostPage;
