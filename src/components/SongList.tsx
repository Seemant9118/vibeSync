import { Card } from "@/components/ui/card";
import { useState } from "react";

interface SongListProps {
  songs: { title: string; url: string }[];
}

const SongList = ({ songs }: SongListProps) => {
  return (
    <Card className="h-80 w-full p-4 overflow-y-scroll">
      <h3 className="text-xl font-semibold mb-4 text-center">Recommended Songs</h3>
      <div className="space-y-3">
        {songs.map((song, index) => (
          <SongItem key={index} song={song} />
        ))}
      </div>
    </Card>
  );
};

const SongItem = ({ song }: { song: { title: string; url: string } }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    if (song.url) {
      window.open(song.url, "_blank");
    }
  };

  const isSpotify = song.url.includes("spotify");

  return (
    <div
      className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 transition-all w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Fixed size thumbnail (Ensures all are equal) */}
        <div className="w-12 h-12 min-w-12 min-h-12 bg-[#FF6A00] rounded flex items-center justify-center text-white font-bold">
          🎵
        </div>
        <div className="truncate w-full">
          <h4 className="font-medium truncate">{song.title}</h4>
        </div>
      </div>

      <button onClick={handlePlay} disabled={!song.url} className="w-24">
        <div className="px-2 py-1.5 border rounded-lg flex items-center justify-center bg-[#FFFFFF17] hover:bg-[#99f68d17] hover:underline text-xs w-full">
          <img
            src={isSpotify ? "/spotify-icon.png" : "/youtube-icon.png"}
            alt={isSpotify ? "Spotify Icon" : "YouTube Icon"}
            className="w-4 h-4"
          />
          {isSpotify ? "Spotify" : "YouTube"}
        </div>
      </button>
    </div>
  );
};

export default SongList;
