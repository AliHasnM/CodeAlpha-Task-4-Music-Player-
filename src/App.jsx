import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import VolumeControl from "./components/VolumeControl";
import "./App.css";

const songsData = [
  {
    id: 1,
    title: "295",
    artist: "Sidhu Moose Wala",
    src: "/music/295.mp3",
    image: "/music/image.png",
  },
  {
    id: 2,
    title: "Badfella",
    artist: "Sidhu Moose Wala",
    src: "/music/Badfella.mp3",
    image: "/music/image.png",
  },
  {
    id: 3,
    title: "So High",
    artist: "Sidhu Moose Wala",
    src: "/music/So High.mp3",
    image: "/music/image.png",
  },
  {
    id: 4,
    title: "The Last Ride",
    artist: "Sidhu Moose Wala",
    src: "/music/THE LAST RIDE.mp3",
    image: "/music/image.png",
  },
  {
    id: 5,
    title: "Goat",
    artist: "Sidhu Moose Wala",
    src: "/music/GOAT.mp3",
    image: "/music/image.png",
  },
  {
    id: 5,
    title: "Devil",
    artist: "Sidhu Moose Wala",
    src: "/music/DEVIL.mp3",
    image: "/music/image.png",
  },
  // Add more songs here
];

const App = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [volume, setVolume] = useState(1);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const audioRef = useRef(null);

  // Filtered songs based on search term
  const filteredSongs = songsData.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const playPauseHandler = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const nextSongHandler = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songsData.length);
  };

  const prevSongHandler = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songsData.length) % songsData.length
    );
  };

  const togglePlaylist = () => {
    setIsPlaylistOpen((prevState) => !prevState);
  };

  const selectSongHandler = (songIndex) => {
    setCurrentSongIndex(songIndex);
    setIsPlaylistOpen(false);
  };

  return (
    <div className="app bg-gradient-to-r from-blue-400 to-purple-500 h-screen flex flex-col justify-center items-center">
      <div className="container mx-auto p-4 bg-white bg-opacity-20 rounded-lg backdrop-blur-lg border border-gray-300 shadow-lg">
        <h1 className="text-center font-bold text-xl text-violet-950">
          Music Player
        </h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Player
          currentSong={filteredSongs[currentSongIndex]}
          audioRef={audioRef}
          playPauseHandler={playPauseHandler}
          nextSongHandler={nextSongHandler}
          prevSongHandler={prevSongHandler}
        />
        <div className="flex justify-center items-center">
          <div className="w-1/2">
            <button
              onClick={togglePlaylist}
              className="bg-white bg-opacity-30 hover:bg-opacity-40 text-white text-opacity-80 rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300 mt-4"
            >
              {isPlaylistOpen ? "Close Playlist" : "Open Playlist"}
            </button>
            {isPlaylistOpen && (
              <Playlist
                songs={filteredSongs}
                currentSongIndex={currentSongIndex}
                selectSongHandler={selectSongHandler}
              />
            )}
          </div>
          <div className="w-1/2 flex justify-center flex-col px-5 py-4 items-end">
            <div>
              <VolumeControl
                volume={volume}
                setVolume={(v) => {
                  setVolume(v);
                  audioRef.current.volume = v;
                }}
              />
              <span className="rounded-full border w-32 text-center border-zinc-400 bg-zinc-200 px-2">
                Vloume
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
