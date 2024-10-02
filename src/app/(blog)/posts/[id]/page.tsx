import { getPosts } from "@/api";
import { PostDetailsPage } from "@/app/components/post-details";

type Props = {
  params: {
    id: string;
  };
};

function PostPage(props: Props) {
  return <PostDetailsPage postId={props.params.id.toString()} />;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const allPosts = await getPosts();

  if (!allPosts || allPosts.length === 0) {
    return [{ id: "1" }, { id: "2" }];
  }

  return allPosts.map((event) => ({
    id: event.id.toString(),
  }));
}

export default PostPage;
