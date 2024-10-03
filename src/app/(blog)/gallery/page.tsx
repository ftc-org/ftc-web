"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { mediaItems, PATRIOTS } from "@/mocks/gallery";
import { ImageMasonryLayout } from "@/components/masonry-layout";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <ImageMasonryLayout
        mediaItems={[...mediaItems, ...PATRIOTS]}
        showVideos={true}
        videoFrameClassName="lg:h-60 h-50"
        title="Galamsey in Ghana: A Visual Journey"
        subtitle="Exploring the impact of illegal small-scale gold mining"
      />
    </div>
  );
};

export default GalleryPage;
