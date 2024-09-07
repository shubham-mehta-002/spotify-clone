import { SongTiles } from "../../Pages";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../Context/appContext";
import { playlistMusicHandler } from "../../utils/playlistMusicHandler";
import { FaPauseCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { useLoginContext } from "../../Context/loginContext";
import { BASE_URL } from "../../constant";
export function PlaylistPage() {
  const { loginState } = useLoginContext();

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }
  const [playlistData, setPlaylistData] = useState(null);
  const { state, dispatch } = useAppContext();
  const { playlistId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/playlist/${playlistId}`,
          {
            params: {
              token: token,
              playlistId,
            },
          }
        );

        setPlaylistData(response.data.playlist);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [playlistId]);

  return (
    <div className="h-full w-full bg-customLightBlack text-white overflow-x-hidden overflow-y-auto">
      <div className="h-1/3 w-full flex flex-row justify-between">
      { playlistData ?
        <div className="header flex flex-row items-center w-full">
          <div className="playlist-thumbnail h-full w-1/2 m-3 flex items-center justify-center ">
            <img
              src={playlistData.thumbnail}
              className="h-1/2 sm:h-9/10 w-9/10 rounded object-cover"
            />
          </div>

          <div className="playlist-data h-4/3 w-full  flex flex-col gap-3 ">
            <div className="text-5xl sm:text-7xl font-semibold">{playlistData.name}</div>
            <div className=" text-base">
              {playlistData.songs ? playlistData.songs.length : 0} items{" "}
            </div>
            <div className=" text-lg overflow-hidden whitespace-nowrap overflow-ellipsis">
              {playlistData.collaborators &&
                playlistData.collaborators.join(" | ")}
            </div>
          </div>
        </div>
        :
        <div className="w-full flex items-center justify-center text-white text-2xl ">Loading...</div>
      }
      </div>

      {playlistData &&
        playlistData.songs &&
        playlistData.songs.length !== 0 && (
          <div
            className="py-3 w-1/4 flex justify-start items-center"
            onClick={(e) => {
              if (!loginState) {
                navigate("/login");
              } else {
                dispatch({
                  type: "SET_ALL_SONGS",
                  payload: { songs: playlistData.songs },
                });
                dispatch({
                  type: "SET_CURRENT_PLAYLIST_ID",
                  payload: { currentPlaylistID: playlistId },
                });
                playlistMusicHandler(playlistData.songs, state, dispatch);
              }
            }}
          >
            {state.currentPlaylistID === playlistId ? (
              state.isPlaying ? (
                <FaPauseCircle className="bg-customLightBlack text-customSpotifyGreen hover:scale-105 hover:cursor-pointer ml-3 h-16 w-20" />
              ) : (
                <FaPlayCircle className="bg-customLightBlack text-customSpotifyGreen hover:scale-105 hover:cursor-pointer ml-3 h-16 w-20" />
              )
            ) : (
              <FaPlayCircle className="bg-customLightBlack text-customSpotifyGreen hover:scale-105 hover:cursor-pointer ml-3 h-16 w-20" />
            )}
          </div>
        )
        
        }

      <hr className="customGray m-4" />

      <div className=" h-1/3 w-full">
        {playlistData ?  playlistData.songs && playlistData.songs.length !== 0 ? (
          playlistData.songs.map((song) => (
            <SongTiles
              key={song._id}
              {...song}
              allSongs={playlistData.songs}
              playlistId={playlistData._id}
            />
          ))
        ) : (
          <div className="text-white flex flex-col gap-4 items-center justify-center">
            <div className="text-4xl">No songs added</div>
            <div className="text-sm">
              Click on the plus button on playlist tile to add songs
            </div>
          </div>
        )
        :
        <div className="flex justify-center text-white text-2xl">Loading ...</div>
        }
      </div>
    </div>
  );
}
