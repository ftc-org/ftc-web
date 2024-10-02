"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { X, ChevronLeft, ChevronRight, Play, Expand } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MediaItem } from "@/types/media";

interface FullScreenImageProps {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  direction: "left" | "right";
}

const FullScreenImage = ({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  direction,
}: FullScreenImageProps) => {
  const item = items[currentIndex];

  const handlers = useSwipeable({
    onSwipedLeft: () => onNext(),
    onSwipedRight: () => onPrev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [item]);

  return (
    <motion.div
      {...handlers}
      className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onClose}
        className='absolute top-4 right-4 text-white hover:text-gray-300 z-50'
      >
        <X size={24} />
      </button>
      <button
        onClick={onPrev}
        className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-50'
      >
        <ChevronLeft size={48} />
      </button>
      <button
        onClick={onNext}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300'
      >
        <ChevronRight size={48} />
      </button>
      <motion.div
        className='max-w-4xl max-h-full p-4'
        key={item.id}
        initial={{ x: direction === "right" ? 300 : -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction === "right" ? -300 : 300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {item.type === "image" ? (
          typeof item.src === "object" ? (
            <Image
              src={item.src.src}
              alt={item.title ?? "free the citizens"}
              width={item.src.width}
              height={item.src.height}
              layout='responsive'
              className='object-contain'
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.src}
              alt={item.title ?? "free the citizens"}
              className='w-full h-auto'
            />
          )
        ) : null}
        <motion.div
          className='mt-4 text-white'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className='text-xl font-semibold'>{item.title}</h2>
          <p className='text-sm mt-2'>{item.description}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const ImageMasonryLayout = ({
  mediaItems,
  showVideos = false,
  videoFrameClassName,
  title,
  subtitle,
}: {
  mediaItems: MediaItem[];
  showVideos?: boolean;
  videoFrameClassName?: string;
  title?: string;
  subtitle?: string;
}) => {
  const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const displayedItems = showVideos
    ? mediaItems
    : mediaItems.filter((item) => item.type === "image");

  const openFullScreen = (index: number) => {
    if (displayedItems[index].type === "image") {
      setFullScreenIndex(index);
      setDirection("right");
    }
  };

  const closeFullScreen = () => {
    setFullScreenIndex(null);
  };

  const goToPrevImage = () => {
    setDirection("left");
    setFullScreenIndex((prevIndex) =>
      prevIndex !== null
        ? prevIndex > 0
          ? prevIndex - 1
          : displayedItems.length - 1
        : null
    );
  };

  const goToNextImage = () => {
    setDirection("right");
    setFullScreenIndex((prevIndex) =>
      prevIndex !== null
        ? prevIndex < displayedItems.length - 1
          ? prevIndex + 1
          : 0
        : null
    );
  };

  return (
    <div className='bg-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-4'>
          <h1 className='my-3 text-center text-3xl'>{title}</h1>
          <p className='my-3 text-center'>{subtitle}</p>
        </div>
        <motion.div
          className='columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.id}
              className='relative overflow-hidden rounded-xl transition-shadow duration-300 group break-inside-avoid mb-4'
              onClick={() => openFullScreen(index)}
            >
              <div className='relative w-full'>
                {item.type === "image" ? (
                  typeof item.src === "object" ? (
                    <Image
                      src={item.src.src}
                      alt={item.title ?? "free the citizens"}
                      width={item.src.width}
                      height={item.src.height}
                      layout='responsive'
                      objectFit='cover'
                      className='cursor-pointer'
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className='w-full h-auto cursor-pointer'
                    />
                  )
                ) : item.type === "video" ? (
                  <div
                    className={`aspect-w-16 aspect-h-9 ${videoFrameClassName}`}
                  >
                    <iframe
                      src={item.src as string}
                      title={item.title}
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                      className='w-full h-full'
                    ></iframe>
                  </div>
                ) : null}
                {item.type === "video" && (
                  <div className='absolute top-2 left-2 bg-black bg-opacity-50 text-white p-1 rounded-full'>
                    <Play size={16} />
                  </div>
                )}
              </div>
              {item.type === "image" && (
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center'>
                  <button className='text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4'>
                    <Expand color='#fff' />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <AnimatePresence initial={false} custom={direction}>
        {fullScreenIndex !== null && (
          <FullScreenImage
            items={displayedItems}
            currentIndex={fullScreenIndex}
            onClose={closeFullScreen}
            onPrev={goToPrevImage}
            onNext={goToNextImage}
            direction={direction}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
