"use client";
import { Post } from "@/types";
import { formatDate } from "@/utils/date";
import Image from "next/image";

type Props = {
  post: Post;
};
export function PostDetailsPage({ post }: Props) {

  const renderContent = (content:string) => {
    // Split the content by each numbered step
    const sections = content.split(/\d\.\s/).filter(Boolean);

    return sections.map((section, index) => {
      // Treat the first part as the introduction before the numbered list
      if (index === 0) {
        return <p key={index}>{section.trim()}</p>;
      }
      return (
        <div key={index}>
          <h3>Step {index}</h3>
          <p>{section.trim()}</p>
        </div>
      );
    });
  };

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
        <div>
          {renderContent(post.content as string)}
        </div>
      </div>
    </div>
  );
}