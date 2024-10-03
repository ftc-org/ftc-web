import { getPostById } from "@/api";
import { notFound } from "next/navigation";
import { PostDetailsPage } from "./components/post-details";

type Props = {
  params: {
    id: string;
  };
};

async function PostPage(props: Props) {
  const post = await getPostById(props.params.id);

  if (!post) {
    return notFound();
  }

  return <PostDetailsPage post={post} />;
}

export default PostPage;