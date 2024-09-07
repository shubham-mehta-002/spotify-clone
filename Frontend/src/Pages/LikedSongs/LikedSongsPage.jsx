import { useAppContext } from "../../Context/appContext";
import { SongTiles } from "..";
import { useState, useEffect } from "react";
import axios from "axios";
import heart from "../../images/green-heart.png";
import { playlistMusicHandler } from "../../utils/playlistMusicHandler";
import { useLoginContext } from "../../Context/loginContext";
import { useNavigate } from "react-router-dom";
import { FaPauseCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../../constant";


export function LikedSongsPage() {
 
  const { loginState } = useLoginContext();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [likedSongs, setLikedSongs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(()=>{
    
    if (!token) {
      navigate('/login') 
    }
  },[token])

  
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${BASE_URL}/song/liked`, {
          params: {
            token,
          },
        });

        if (response.data.success) {
          setLikedSongs(response.data.likedSongs);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="h-full w-full bg-customLightBlack text-white overflow-x-hidden overflow-y-auto">
      <div className="h-1/3 w-full flex flex-row justify-between">
        <div className="header flex flex-row items-center w-full">
          <div className="playlist-thumbnail h-full w-1/3 m-3 flex items-center justify-center">
            <img src={heart} className="h-1/2 sm:h-9/10 sm:w-9/10 rounded object-cover" />
          </div>

          <div className="playlist-data h-4/3 w-2/3  flex flex-col gap-3">
            <div className="text-5xl md:text-7xl xl:text-8xl font-semibold word">Liked Songs</div>
            <div className=" text-base">
              {likedSongs ? likedSongs.length : 0} items{" "}
            </div>
          </div>
        </div>
      </div>

      {likedSongs && likedSongs.length !== 0 && (
        <div
          className="py-3 w-1/4 flex justify-start items-center"
          onClick={(e) => {
            if (!loginState) {
              navigate("/login");
            } else {
              dispatch({
                type: "SET_ALL_SONGS",
                payload: { songs: likedSongs },
              });
              dispatch({
                type: "SET_CURRENT_PLAYLIST_ID",
                payload: { currentPlaylistID: "likedSongs" },
              });
              playlistMusicHandler(likedSongs, state, dispatch);
            }
          }}
        >
          {state.isPlaying  && state.currentPlaylistID === 'likedSongs' ? (
            <FaPauseCircle className="bg-customLightBlack text-customSpotifyGreen hover:scale-105 hover:cursor-pointer ml-5 size-14 sm:size-16" />
          ) : (
            <FaPlayCircle className="bg-customLightBlack text-customSpotifyGreen hover:scale-105 hover:cursor-pointer ml-5 size-14 sm:size-16" />
          )}
        </div>
      )}

      <hr className="customGray m-4" />

      <div>
        {likedSongs.map((song) => (
          <SongTiles
            key={song._id}
            {...song}
            playlistId={"likedSongs"}
            allSongs={likedSongs}
          />
        ))}
      </div>
    </div>
  );
}
