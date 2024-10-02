import { useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { MediaItem } from "@/types/media";

interface FullScreenImageProps {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  direction: "left" | "right";
}

export const FullScreenImage = ({
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
        className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-50'
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
