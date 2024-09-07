import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { SongTiles } from "../../Pages";
import { playlistMusicHandler } from "../../utils/playlistMusicHandler";
import { useAppContext } from "../../Context/appContext";
import { useLoginContext } from "../../Context/loginContext";
import { useNavigate } from "react-router-dom";
import { FaPauseCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { BASE_URL } from "../../constant";


export function ArtistPage() {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login", { replace: true });
  }

  const { artistId } = useParams();
  const [artistDetails, setArtistDetails] = useState();
  const { state, dispatch } = useAppContext();
  const { loginState } = useLoginContext();

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${BASE_URL}/artist/${artistId}`,
        {
          params: {
            artistId,
          },
        }
      );
      if (response.data.success) {
        setArtistDetails(response.data.artist);
      }
    })();
  }, [artistId]);

  return (
    <div className="main h-100 w-full text-white ">
      {artistDetails ? (
        <div className="h-full w-full">
          <div className="h-full w-full  flex flex-row items-center gap-5 mb-5">
            <div className="artist-details ml-2 rounded-full flex justify-center items-center">                 
                { artistDetails.profileImage ? 
                 <img src={artistDetails.profileImage } className="w-full md:h-2/3 md:w-2/3 lg:h-full lg:w-full aspect-square rounded-full"/>
                 : 
                  <span>{artistDetails.firstName[0]}
                  {artistDetails.lastName[0]}</span>
                }
            </div>

            <div className="h-full w-3/4 flex flex-col justify-center ">
              <div className="text-[5vw]">{artistDetails.username}</div>
              <div className="text-xl">
                {artistDetails.songsOwned.length} songs
              </div>
            </div>
          </div>

          {artistDetails && artistDetails.songsOwned.length !== 0 && (
            <div
              className="py-3 w-1/4 flex justify-start items-center "
              onClick={(e) => {
                if (!loginState) {
                  navigate("/login");
                } else {
                  dispatch({
                    type: "SET_ALL_SONGS",
                    payload: { songs: artistDetails.songsOwned },
                  });
                  dispatch({
                    type: "SET_CURRENT_PLAYLIST_ID",
                    payload: { currentPlaylistID: artistId },
                  });
                  playlistMusicHandler(
                    artistDetails.songsOwned,
                    state,
                    dispatch
                  );
                }
              }}
            >
              {state.isPlaying && state.currentPlaylistID === artistId ? (
                <FaPauseCircle className="bg-customLightBlack text-customSpotifyGreen hover:scale-105 hover:cursor-pointer ml-3 h-16 w-20" />
              ) : (
                <FaPlayCircle className="bg-customLightBlack text-customSpotifyGreen hover:scale-105 hover:cursor-pointer ml-3 h-16 w-20" />
              )}
            </div>
          )}

          <hr className="customGray m-4" />

          <div className=" h-1/3 w-full">
            {artistDetails.songsOwned.length === 0 ? (
              <div className="text-white flex flex-col gap-4 items-center justify-center">
                <div className="text-4xl">No songs available</div>
                <div className="text-sm">
                  To create your own song, click on Upload Song in Navbar
                </div>
              </div>
            ) : (
              artistDetails.songsOwned.map((song) => (
                <SongTiles
                  key={song._id}
                  {...song}
                  playlistId={artistDetails._id}
                  allSongs={artistDetails.songsOwned}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <div>Loading data....</div>
      )}
    </div>
  );
}
