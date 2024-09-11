import { PlaylistTiles } from "../../Pages";

import { v4 as uuid } from "uuid";
import { useAppContext } from "../../Context/appContext";

import { useNavigate } from "react-router-dom";
import heart from "../../images/green-heart.png";

export function PlaylistSidebar() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="playlists-container h-full w-full  flex flex-col justify-start">
      {/* liked Song tile */}
      <div
        key={uuid()}
        onClick={() => navigate("liked/songs")}
        className={` 
        ${
          state.currentPlaylistID === "likedSongs"
            ? "bg-customGray "
            : "bg-inherit"
        }
        h-16 will-change-auto p-1 text-white  m-1 flex flex-row gap-4 hover:bg-customGray hover:cursor-pointer rounded-md`}
      >
        <div className="h-9/10 w-1/5 ">
          <img src={heart} className="h-full w-full rounded" />
        </div>

        <div className="h-full w-3/5 flex flex-col justify-around ">
          <div className="text-lg">Liked Songs</div>
          <div className="text-sm">
            {state.likedSongs ? state.likedSongs.length : 0}
            <span> songs</span>
          </div>
        </div>
      </div>

      {/* playlist tiles */}
      {state.playlists &&
        state.playlists.map((playlist) => (
          <PlaylistTiles key={playlist._id} playlist={playlist} />
        ))}
    </div>
  );
}
