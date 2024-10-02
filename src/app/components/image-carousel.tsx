"use client";
import React, { ReactNode, useState } from "react";
import { Swiper, SwiperClass } from "swiper/react";
import { Keyboard } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props<T> = {
  children: ReactNode;
  data: T[];
};

export const ImageSlider = <T,>({ children, data }: Props<T>) => {
  const [{ activeIndex, isEnd }, setActiveIndex] = useState({
    isEnd: false,
    activeIndex: 0,
  });

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass>();

  return (
    <div className='relative'>
      {data && data.length <= 1 ? null : (
        <div className='absolute left-1 top-1/2 transform  z-20'>
          <button
            className={`lg:h-10 h-8 lg:w-10 w-8 p-2 rounded-full flex items-center justify-center ${
              activeIndex <= 0 ? "bg-gray-200" : "bg-black/15 text-white"
            }`}
            onClick={() => swiperInstance?.slidePrev(500, false)}
            disabled={activeIndex <= 0}
          >
            <ChevronLeft className='text-sm' />
          </button>
        </div>
      )}

      <Swiper
        className='swiper !h-full !overflow-hidden'
        slidesPerView={1}
        modules={[Keyboard]}
        allowSlideNext
        allowSlidePrev
        spaceBetween={0}
        keyboard={{
          enabled: true,
        }}
        onSlideChange={(slide) =>
          setActiveIndex({
            activeIndex: slide.activeIndex,
            isEnd: slide.isEnd,
          })
        }
        onInit={(swiper) => {
          setSwiperInstance(swiper);
        }}
      >
        {children}
      </Swiper>
      {data && data.length <= 1 ? null : (
        <div className='absolute right-1 top-1/2 transform -translate-y-1/2 z-20'>
          <button
            className={`lg:h-10 h-8 lg:w-10 w-8 p-2 rounded-full flex items-center justify-center ${
              isEnd ? "bg-gray-200" : "bg-black/15 text-white"
            }`}
            onClick={() => swiperInstance?.slideNext(500, false)}
          >
            <ChevronRight className='text-[13px]' />
          </button>
        </div>
      )}
    </div>
  );
};
