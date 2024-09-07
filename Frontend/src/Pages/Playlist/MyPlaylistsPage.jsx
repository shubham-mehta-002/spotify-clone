import { SongTiles } from "../../Pages";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import heart from "../../images/green-heart.png";
import { playlistMusicHandler } from "../../utils/playlistMusicHandler";
import { FaPauseCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { Navigate } from "react-router-dom"
import { useAppContext } from "../../Context/appContext";
import { PlaylistView } from "../../Pages";
import { Card } from "../../Components";

export function MyPlaylistsPage() {
  const loginState = localStorage.getItem('token') ? true : false

  if (!loginState) {
    return <Navigate to="/login" replace={true} />;
  }
  const [playlistData, setPlaylistData] = useState(null);
  const { state, dispatch } = useAppContext();
  const { playlistId } = useParams();
  const navigate = useNavigate();


  return (
    <div className="all-songs m-4 flex flex-col h-full ">
      <div className=" font-bold text-5xl mb-4 text-white flex">
        <div> My Playlists</div>
        <div 
          onClick={()=>navigate('/create/playlist')}
          className="hover:cursor-pointer text-white absolute right-10">+</div>
      </div>
      {state?.playlists ? (
        state.playlists.length === 0 ? (
          <div className="all-songs m-4 flex flex-col ">
            <div className="text-white flex flex-col gap-4 items-center justify-center">
              <div className="text-4xl">No playlist available</div>
              <div className="text-sm hidden lg:block">
                To create your own playlist, click on Create Playlist in the
                Sidebar
              </div>
              <div className="text-sm lg:hidden">
                To create your own playlist, click on the Plus Icon
              </div>
            </div>
            
          </div>
        ) : (
          <>
          <div className="cards h-9/10 w-full flex flex-col gap-4">
            <PlaylistView cardsData={state.playlists} />
          </div>
          </>
        )
      ) : (
        <div className="flex items-center justify-center text-white">
          Loading ...
        </div>
      )}
    </div>
  );
}
