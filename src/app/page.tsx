"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Play, ArrowLeft } from "lucide-react";
import Image from "next/image";

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
    thumbnail: "/images/autorout.jpg",
    url: "/videos/autorout.mp4",
  },
  {
    id: "2",
    title: "in-station",
    thumbnail: "/images/in-station.jpg",
    url: "/videos/in-station.mp4",
  },
  {
    id: "3",
    title: "smart-retail-counting",
    thumbnail: "/images/smart-retail-counting.jpg",
    url: "/videos/smart-retail-counting.mp4",
  },
  {
    id: "4",
    title: "smart-retail",
    thumbnail: "/images/smart-retail.jpg",
    url: "/videos/smart-retail.mp4",
  },
  {
    id: "5",
    title: "station",
    thumbnail: "/images/station.jpg",
    url: "/videos/station.mp4",
  },
];

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<TVideo | null>(null);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeselect = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Video Library</h1>

      <div className="mb-8 relative max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rounded-full bg-white bg-opacity-20 backdrop-blur-lg border-none"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {selectedVideo ? (
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={handleDeselect}
            className="mb-4 hover:bg-white hover:bg-opacity-20"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Videos
          </Button>
          <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
            <video
              src={selectedVideo.url}
              controls
              className="absolute top-0 left-0 w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <Card className="bg-white bg-opacity-20 backdrop-blur-lg border-none">
            <CardContent className="p-6">
              <CardTitle className="text-2xl mb-2">
                {selectedVideo.title}
              </CardTitle>
              <p className="text-gray-200">
                This is where you could add a description of the video,
                information about the creator, or any other relevant details.
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg bg-white bg-opacity-20 backdrop-blur-lg border-none"
                onClick={() => setSelectedVideo(video)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      width={200}
                      height={120}
                      src={video.thumbnail}
                      alt={`Thumbnail for ${video.title}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Play className="text-white" size={48} />
                    </div>
                  </div>
                  <h3 className="font-semibold p-4 truncate text-gray-800">
                    {video.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
