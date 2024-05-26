import React, { useState, useRef, useEffect } from "react";

const Player = ({
  currentSong,
  audioRef,
  playPauseHandler,
  nextSongHandler,
  prevSongHandler,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTime, setSongTime] = useState({ currentTime: 0, duration: 0 });
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    const onTimeUpdate = () => {
      setSongTime((prevSongTime) => ({
        ...prevSongTime,
        currentTime: audioRef.current.currentTime,
      }));
    };

    const onLoadedMetadata = () => {
      setSongTime((prevSongTime) => ({
        ...prevSongTime,
        duration: audioRef.current.duration,
      }));
    };

    audioRef.current.addEventListener("timeupdate", onTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audioRef.current.removeEventListener("timeupdate", onTimeUpdate);
      audioRef.current.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [audioRef]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    setSongTime((prevSongTime) => ({ ...prevSongTime, currentTime: seekTime }));
    audioRef.current.currentTime = seekTime;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Add a null check for currentSong to prevent accessing properties when it's undefined
  if (!currentSong) {
    return null;
  }

  return (
    <div className="player bg-gray-100 p-4 rounded-lg shadow-lg">
      <audio ref={audioRef} src={currentSong.src} className="hidden" />
      <div className="flex flex-col justify-center items-center">
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="song-image mr-4 w-40 rounded-md cursor-pointer"
        />
      </div>
      <div className="flex justify-center items-center py-3">
        <button
          onClick={prevSongHandler}
          className="btn mr-2 bg-zinc-600 rounded-full px-4 py-1 text-zinc-100  hover:bg-zinc-500"
        >
          Previous
        </button>
        <button
          onClick={togglePlayPause}
          className="btn bg-zinc-600 rounded-full px-4 py-1 text-zinc-100  hover:bg-zinc-500"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={nextSongHandler}
          className="btn ml-2 bg-zinc-600 rounded-full px-4 py-1 text-zinc-100 hover:bg-zinc-500"
        >
          Next
        </button>
      </div>
      <div className="seek mt-4">
        <input
          type="range"
          value={songTime.currentTime}
          max={songTime.duration || 0}
          onChange={handleSeek}
          onMouseDown={() => setIsSeeking(true)}
          onMouseUp={() => setIsSeeking(false)}
          className="w-full"
        />
        <div className="time flex justify-between">
          <span>{formatTime(songTime.currentTime)}</span>
          <span>{formatTime(songTime.duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default Player;
