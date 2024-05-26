import React from "react";

const Playlist = ({ songs, currentSongIndex, selectSongHandler }) => {
  return (
    <div className="playlist mt-4 border-2 border-violet-200 rounded-md px-4 py-2">
      {songs.map((song, index) => (
        <div
          key={song.id}
          className={`cursor-pointer song-item ${
            index === currentSongIndex ? "active" : ""
          }`}
          onClick={() => selectSongHandler(index)}
        >
          {song.title} - {song.artist}
        </div>
      ))}
    </div>
  );
};

export default Playlist;
