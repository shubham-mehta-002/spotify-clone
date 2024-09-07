import axios from "axios";
import { useAppContext } from "../Context/appContext";
import { useNavigate } from "react-router-dom";
import { playMusic, nextMusic, prevMusic } from "../utils/playMusic";
import { useLoginContext } from "../Context/loginContext";
import { IoHeartSharp } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { IoMdAddCircleOutline } from "react-icons/io";
import {BASE_URL} from "../constant"

export function SongTiles({
  _id,
  thumbnail,
  name,
  track,
  artist,
  duration,
  addButton,
  playlistId,
  alreadyInPlaylist,
  allSongs,
}) {


  const loginState = localStorage.getItem("token") ? true : false;
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();


  const isLiked = state.likedSongs.includes(_id);
  const newAudio = new Audio(track);

  
  const songData = {
    _id,
    thumbnail,
    name,
    track,
    artist,
    isLiked,
    duration,
    audio: newAudio,
  };

  const token = localStorage.getItem("token");
  const songId = _id;
  const songBody = {
    token,
    songId,
    playlistId,
  };

  const durationInMinutes = `${Math.floor(duration / 60)}:${Math.floor(
    duration % 60
  )}`;

  async function addToPlaylistHandler(e) {
    const response = await axios.post(
      `${BASE_URL}/playlist/add/song`,
      songBody
    );
    if (response.data.success === true) {
      e.stopPropagation(); // Stop event propagation to prevent parent div click
      dispatch({
        type: "ADD_SONG_TO_PLAYLIST",
        payload: { playlistId, songId },
      });
    }
  }

  async function removeFromPlaylist(e) {
    const response = await axios.post(
      `${BASE_URL}/playlist/remove/song`,
      {
        playlistId,
        songId,
        token,
      }
    );

    if (response.data.success === true) {
      e.stopPropagation(); // Stop event propagation to prevent parent div click
      dispatch({
        type: "REMOVE_SONG_FROM_PLAYLIST",
        payload: { playlistId, songId },
      });
    }
  }

  async function addToLikedSongsHandler(e) {
    try {
      const response = await axios.post(`${BASE_URL}/song/like`, {
        songId,
        token,
      });

      if (response.data.success === true) {
        e.stopPropagation(); // Stop event propagation to prevent parent div click
        dispatch({ type: "ADD_TO_LIKED_SONGS", payload: { songId: _id } });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function removeFromLikedSongsHandler(e) {
    try {
      const response = await axios.post(`${BASE_URL}/song/unlike`, {
        songId,
        token,
      });

      if (response.data.success === true) {
        e.stopPropagation(); // Stop event propagation to prevent parent div click
        dispatch({ type: "REMOVE_FROM_LIKED_SONGS", payload: { songId: _id } });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function toggleLike(e) {
    if(!loginState){
      navigate("/login") 
    }
    else
      e.stopPropagation(); // Stop event propagation to prevent parent div click
    isLiked ? removeFromLikedSongsHandler(e) : addToLikedSongsHandler(e);
  }

  function toggleAddInPlaylist(e) {
    alreadyInPlaylist ? removeFromPlaylist(e) : addToPlaylistHandler(e);
  }

  async function toggleMusicPlay() {
    if (!loginState) {
      state.currentSong?.audio.pause()
      dispatch({ type: "SET_CURRENT_SONG", payload: { currentSong: null } });
      dispatch({ type: "TOGGLE_PLAYING", payload: { isPlaying: false } });
      dispatch({ type: "SET_ALL_SONGS", payload: { songs: null } });
      navigate("/login");
    } else {
      if (state.allSongs === null) {
        dispatch({ type: "SET_ALL_SONGS", payload: { songs: allSongs } });
      }
      dispatch({
        type: "SET_CURRENT_PLAYLIST_ID",
        payload: { currentPlaylistID: playlistId },
      });
      playMusic(state, dispatch, songData);
    }
  }

  return (
    <div className={`${state && state.currentSong && state.currentSong._id == songId ? "bg-customGray" : "bg-customLightBlack"} hover:bg-customGray bg-customLightBlack text-white  song-tile h-16 w-full  flex flex-row justify-between items-center gap-4 lg:px-4 rounded-lg my-1 px-2 `}>

      <div className=" details h-full w-3/4 lg:w-1/2 flex flex-row gap-6 items-center">
        <div className="thumbnail h-4/5 w-1/9 ml-2 flex ">
          <img src={thumbnail} className=" h-12 w-12 rounded" />
        </div>
        <div className="h-full w-1/2 flex flex-col justify-center items-center ">
          <div className=" h-1/3 w-full whitespace-nowrap overflow-hidden text-ellipsis  text-lg font-semibold">
            <span className="h-full flex items-center ">{name}</span>
          </div>

          <div className="h-1/3 w-full whitespace-nowrap overflow-hidden text-ellipsis ">
            <span
              className="hover:cursor-pointer hover:underline text-base h-full"
              onClick={(e) => navigate(`/artist/${artist._id}`)}
            >
              {artist.username}
            </span>
          </div>
        </div>
      </div>

      <div className=" play h-full w-1/4 lg:w-1/2 flex flex-row items-center justify-end gap-3 ">
        {addButton &&
          (alreadyInPlaylist ? (
            <TiTick
              className="text-customSpotifyGreen hover:cursor-pointer h-7 w-7"
              onClick={(e) => toggleAddInPlaylist(e)}
            />
          ) : (
            <IoMdAddCircleOutline
              className="hover:cursor-pointer h-7 w-7"
              onClick={(e) => toggleAddInPlaylist(e)}
            />
          ))}
        <span className="hidden lg:block">{durationInMinutes}</span>

        <IoHeartSharp
          className={`${
            isLiked ? "text-customSpotifyGreen" : "text-white-700"
          } hover:cursor-pointer h-6 w-6`}
          onClick={(e) => toggleLike(e)}
        />

        {state.currentSong &&
        state.currentSong._id === _id &&
        state.isPlaying ? (
          <FaPause
            onClick={toggleMusicPlay}
            className="hover:cursor-pointer h-6 w-6 lg:mr-5"
          />
        ) : (
          <FaPlay
            onClick={toggleMusicPlay}
            className="hover:cursor-pointer h-6 w-6 lg:mr-5"
          />
        )}
      </div>
    </div>
  );
}
