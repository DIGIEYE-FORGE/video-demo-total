"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Play } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type TVideo = {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  description?: string;
};

const videos: TVideo[] = [
  {
    id: "1",
    title: "autorout",
    thumbnail: "/images/autorout.png",
    url: "/videos/autorout.mp4",
  },
  {
    id: "2",
    title: "in station",
    thumbnail: "/images/in-station.png",
    url: "/videos/in-station.mp4",
  },
  {
    id: "3",
    title: "smart retail counting",
    thumbnail: "/images/smart-retail-counting.png",
    url: "/videos/smart-retail-counting.mp4",
  },
  {
    id: "4",
    title: "smart retail",
    thumbnail: "/images/smart-retail.png",
    url: "/videos/smart-retail.mp4",
  },
  {
    id: "5",
    title: "station",
    thumbnail: "/images/station.png",
    url: "/videos/station.mp4",
  },
];

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<TVideo | null>(null);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto p-[clamp(1rem,5vw,5rem)] max-w-screen-2xl overflow-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Total Energy Ai Models
      </h1>
      <div className="mb-8 relative max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rounded-full bg-white/10 backdrop-blur-lg h-12 "
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4 md:gap-6 justify-center">
        {filteredVideos.map((video) => {
          return (
            <div
              role="button"
              key={video.id}
              className="border rounded-xl hover:shadow-lg overflow-hidden relative bg-foreground/5 border-foreground/10 backdrop:blur hover:-rotate-2 hover:scale-105 transition-transform duration-300 active:duration-150 active:scale-100 active:rotate-2"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="w-full aspect-video relative ">
                <Image
                  src={video.thumbnail}
                  width={200}
                  height={120}
                  className="object-cover w-full h-full"
                  priority
                  alt={`Thumbnail for ${video.title}`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Play className="text-white" size={48} />
                </div>
              </div>
              <h3 className="font-semibold p-4 truncate text-card-foreground capitalize">
                {video.title.replace(/-/g, " ")}
              </h3>
            </div>
          );
        })}
      </div>
      <Dialog
        open={selectedVideo !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedVideo(null);
          }
        }}
      >
        <DialogContent className=" backdrop-blur-sm bg-[#000e18]/50 max-w-screen-lg max-h-[90vh] aspect-square md:aspect-video flex flex-col p-4 md:p-6">
          <DialogTitle className="text-xl text-center font-semibold  capitalize">
            {selectedVideo?.title}
          </DialogTitle>
          <DialogDescription className={"hidden"} />
          {selectedVideo && (
            <video
              src={selectedVideo.url}
              className="h-1 flex-1 rounded-xl overflow-hidden"
              controls
              autoPlay
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
