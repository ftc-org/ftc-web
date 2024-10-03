"use client";
import { Post } from "@/types";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

type Props = {
  post: Post;
};
export function PostDetailsPage({ post }: Props) {
  return (
    <div className="max-w-screen-xl mx-auto px-3">
      <div>
        <Image
          className="w-full h-[500px] object-cover rounded-xl"
          src={(post.image as string) ?? "/images/default.jpg"}
          alt={(post.title as string) ?? "free the citizens"}
          width={800}
          height={400}
        />
        <br />
        <h1 className="text-lg font-bold tracking-tight lg:text-3xl text-aljazeera-red">
          {post.title}
        </h1>
        <p className="my-2">{formatDate(post.created_at as Date)}</p>
      </div>
      <hr className="my-5" />
      <div>
        <div className="Html__Wrapper">{ReactHtmlParser(post.content)}</div>
      </div>
    </div>
  );
}
