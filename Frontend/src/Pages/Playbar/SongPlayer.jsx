import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../Context/appContext.jsx";
import { prevMusic, nextMusic } from "../../utils/playMusic.jsx";
import { ImLoop } from "react-icons/im";
import { MdOutlineReplay } from "react-icons/md";
import { GiPreviousButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'

export function SongPlayer() {
  const inputRef = useRef();
  const { state, dispatch } = useAppContext();
  const { thumbnail, artist, name } = state.currentSong;

  const navigate = useNavigate()
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (state.currentSong) {
      const audioElement = state.currentSong.audio;

      const handleTimeUpdate = () => {
        const duration = parseFloat(state.currentSong.duration);
        const currentTime = audioElement.currentTime;
        const newTiming = (currentTime / duration) * 100;
        setValue(newTiming);
        inputRef.current.value = newTiming
      };

      const handleEndOfAudio = () => {
        if (state.loop === true) {
          state.currentSong.audio.currentTime = 0;
          state.currentSong.audio.play();
        } else {
          nextMusic(state, dispatch);
        }
      };

      audioElement?.addEventListener("timeupdate", handleTimeUpdate);
      audioElement?.addEventListener("ended", handleEndOfAudio);

      return () => {
        audioElement?.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement?.removeEventListener("ended", handleEndOfAudio);
      };
    }
  }, [state]);


  
  function handleProgressChange(e) {
    const newPercentage = parseFloat(e.target.value);
    const newTime =
      (newPercentage / 100) * parseFloat(state.currentSong.duration);
    if (newTime >= 0) {
      state.currentSong.audio.currentTime = newTime;
    }
  }

  const togglePlayPause = async () => {
    if (state.isPlaying) {
      dispatch({ type: "TOGGLE_PLAYING", payload: { isPlaying: false } });
      state.currentSong.audio.pause();
    } else {
      dispatch({ type: "TOGGLE_PLAYING", payload: { isPlaying: true } });
      await state.currentSong.audio.play();
    }
  };

  async function toggleRepeat(e) {
    state.currentSong.audio.currentTime = 0;
    await state.currentSong.audio.play();
  }

  function toggleLoop(e) {
    dispatch({ type: "TOGGLE_LOOP", payload: { loop: !state.loop } });
  }

  function nextSongHandler() {
    nextMusic(state, dispatch);
  }

  function prevSongHandler() {
    prevMusic(state, dispatch);
  }


  return (
    <div className="h-full w-full flex flex-row text-black items-center ">

      <div className="song-details h-9/10 w-1/3 sm:w-1/4 flex flex-row items-center gap-2 mx-3">
        <div className="thumbnail h-10 w-10 rounded">
          <img src={thumbnail} className="h-full w-full" alt="thumbnail" />
        </div>
        <div className="artist-details">
          <div className="artist-details text-sm sm:text-base  font-medium text-white">
            {name}
          </div>
          <div className="hover:cursor-pointer hover:underline collaborators-details text-[10px] text-customGray font-bold text-ellipsis overflow-hidden whitespace-nowrap "
          onClick={(e) => navigate(`/artist/${state.currentSong.artist._id}`)}
          >
            {artist.username}
          </div>
        </div>
      </div>

      <div className="h-full w-2/3 sm:w-1/2 pt-1">
        <div className="h-1/2 w-full flex flex-row justify-center items-center gap-5">
          <ImLoop
            onClick={toggleLoop}
            className={`hover:cursor-pointer ${
              state.loop
                ? "text-customSpotifyGreen"
                : "hover:text-white text-customGray"
            } h-4 w-4`}
          />

          <GiPreviousButton
            onClick={prevSongHandler}
            className="hover:cursor-pointer hover:text-white text-customGray size-6 "
          />

          {state.isPlaying ? (
            <FaPause
              className="hover:cursor-pointer  size-7 text-white"
              onClick={togglePlayPause}
            />
          ) : (
            <FaPlay
              className="hover:cursor-pointer  size-7 text-white"
              onClick={togglePlayPause}
            />
          )}
          <GiNextButton
            onClick={nextSongHandler}
            className="hover:cursor-pointer hover:text-white text-customGray  size-6"
          />
          <MdOutlineReplay
            onClick={toggleRepeat}
            className="hover:cursor-pointer  hover:text-white text-customGray size-6"
          />
          
        </div>
        <div className="h-1/2 w-full flex flex-row justify-center text-white gap-2 items-center">
          {/* <div>{formatTime(value)}</div> */}
          <input
            type="range"
            ref={inputRef}
            onChange={handleProgressChange}
            value={value}
            min={0}
            max={100}
            step={0.1}
            style={{
              background: `linear-gradient(to right, rgb(30,220,100) 0%, rgb(30,220,100) ${value}%, white ${value}%, white 100%)`
            }}
            className="h-1/2 w-4/5"
          />
        </div>
      </div>
      

    </div>
  );
}


