import { MediaItem } from "@/types/media";
import chinaGalamsey from "/public/gallery/china-galamsey.webp";
import galamseyGhana from "/public/gallery/galamsey-ghana-illegal-mining.webp";
import galamseysite from "/public/gallery/galamsey-site.jpg";
import stop_galamsey from "/public/gallery/stop_galamsey_24.jpeg";
import mercury_chilled from "/public/gallery/mercury_chilled.jpeg";
import galamseyOperations from "/public/gallery/galamsey.jpeg";
import illegalMining from "/public/gallery/illegal-mining.jpg";
import pollutedWater from "/public/gallery/polluted-water.jpg";

import patriotMessage01 from "/public/gallery/patriot-msg-01.jpeg";
import patriotMessage02 from "/public/gallery/patriot-msg-02.jpeg";
import patriotMessage03 from "/public/gallery/patriot-msg-03.jpeg";
import patriotMessage04 from "/public/gallery/patriot-msg-04.jpeg";
import patriotMessage05 from "/public/gallery/patriot-msg-05.jpeg";
import patriotMessage06 from "/public/gallery/patriot-msg-06.jpeg";

export const PATRIOTS: MediaItem[] = [
  {
    id: 1,
    type: "image",
    src: patriotMessage01,
  },
  {
    title: "patriotMessage02",
    id: 2,
    type: "image",
    src: patriotMessage02,
  },
  {
    id: 3,
    type: "image",
    src: patriotMessage03,
  },
  {
    id: 4,
    type: "image",
    src: patriotMessage04,
  },
  {
    id: 5,
    type: "image",
    src: patriotMessage05,
  },
  {
    id: 6,
    type: "image",
    src: patriotMessage06,
  },
];

export const mediaItems: MediaItem[] = [
  {
    id: 1,
    title: "China Galamsey",
    src: chinaGalamsey,
    type: "image",
    description: "Image depicting Chinese involvement in galamsey activities",
  },

  {
    id: 8,
    title: "Galamsey Impact",
    src: "https://www.youtube.com/embed/plwjOijh89U?si=VsvHn2QnAEfFNO50",
    type: "video",
    description: "The impact of galamsey on local communities",
  },
  {
    id: 2,
    title: "Galamsey Ghana Illegal Mining",
    src: galamseyGhana,
    type: "image",
    description: "Illustration of illegal mining activities in Ghana",
  },
  {
    id: 3,
    title: "Galamsey Site",
    src: galamseysite,
    type: "image",
    description: "A typical galamsey mining site in Ghana",
  },
  {
    id: 4,
    title: "Galamsey Operations",
    src: galamseyOperations,
    type: "image",
    description: "Overview of galamsey operations and their impact",
  },
  {
    id: 5,
    title: "Illegal Mining",
    src: illegalMining,
    type: "image",
    description: "Consequences of illegal mining activities",
  },
  {
    id: 6,
    title: "Polluted Water",
    src: pollutedWater,
    type: "image",
    description: "Water pollution caused by galamsey activities",
  },
  {
    id: 7,
    title: "Illegal Mining Video",
    src: "https://www.youtube.com/embed/s6Xv0MoRxPM?si=FqygfONypJzNjqus",
    type: "video",
    description: "Video showcasing illegal mining activities",
  },
  {
    id: 8,
    title: "Contaminated water",
    src: mercury_chilled,
    type: "image",
    description: "Water pollution caused by galamsey activities",
  },
  {
    id: 9,
    title: "Infographic on the upcoming protest",
    src: stop_galamsey,
    type: "image",
    description: "The youth protests against galamsey",
  },
];
