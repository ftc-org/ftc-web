import Image from "next/image";

import { LiveIndicator } from "@/components/live-indicator";

import { useGetEvents } from "@/api/get-events";
import { ProgressBarLink } from "@/components/progress-bar";
import { type TEvent } from "@/types";
import { getFormattedDate } from "@/utils/date";
import { Radio } from "lucide-react";
import ReactHtmlParser from "react-html-parser";
import { useState } from "react";
import clsx from "clsx";

export function LiveUpdateCard() {
  const [isImageLoading, setImageLoading] = useState(true);
  const { events, isSuccess } = useGetEvents({ isLive: true });

  const showLiveEvents =
    events && events.filter((event) => event.is_live === true);

  if (isSuccess && showLiveEvents?.length === 0) {
    return (
      <div className='bg-aljazeera-red/10 h-full p-8 flex flex-col items-center justify-center rounded-xl'>
        <Radio height={50} className='animate-ping text-aljazeera-red' />
        <h2 className='text-2xl font-bold mb-4'>No live events found</h2>
      </div>
    );
  }

  const event = events?.[0];

  const UpdatesComponent = ({ updates }: { updates: TEvent["updates"] }) => {
    return (
      <div className='bg-white p-4 w-full rounded-b-xl overflow-hidden'>
        <div className='mt-4 relative'>
          <div className='absolute left-[5px] top-[9px] bottom-[9px] w-px bg-orange-300'></div>

          {updates.slice(0, 5).map((item, index) => (
            <div key={index} className='flex items-start mb-5 relative '>
              <div className='absolute left-0 mt-2'>
                <div className='size-[10px] bg-orange-500 rounded-full ring-4 ring-orange-200'></div>
              </div>
              <div className='ml-8'>
                <span className='text-sm text-gray-600 font-medium'>
                  {getFormattedDate(item.created_at)}
                </span>
                <ProgressBarLink
                  href={`/events/${event?.id}#${item.id}`}
                  className='text-base font-semibold mt-1 hover:underline block'
                >
                  <div className='Html__Wrapper line-clamp-1'>
                    {ReactHtmlParser(item.summary)}
                  </div>
                </ProgressBarLink>
              </div>
            </div>
          ))}
          <div className='absolute left-0 bottom-0'>
            <div className='size-[10px] bg-orange-500 rounded-full ring-4 ring-orange-200'></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className='lg:w-full relative lg:aspect-[2/3] aspect-auto lg:h-96 h-60 sm:aspect-auto'>
        <ProgressBarLink href={`/events/${event?.id}`}>
          <Image
            className={clsx(
              "h-auto w-full object-cover rounded-t-xl",
              { blur: isImageLoading },
              { "remove-blur": !isImageLoading }
            )}
            src={(event?.image?.image as string) ?? "/images/default.jpg"}
            alt={(event?.image?.caption as string) ?? "free the citizens"}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 100vw'
            onLoad={() => setImageLoading(false)}
          />
        </ProgressBarLink>
        <div className='absolute top-4 left-4 bg-white px-3 py-0.5 rounded-full'>
          <LiveIndicator label='Live Updates' />
        </div>
      </div>
      {event?.updates ? <UpdatesComponent updates={event?.updates} /> : null}
    </div>
  );
}
