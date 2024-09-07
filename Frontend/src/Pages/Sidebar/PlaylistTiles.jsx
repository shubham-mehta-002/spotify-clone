import { useNavigate } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import { useAppContext } from "../../Context/appContext";

export function PlaylistTiles({ playlist }) {
  const navigate = useNavigate();
 const { state, dispatch } = useAppContext();

  function addSongsToPlaylistClickHandler(e) {
    e.stopPropagation(); // Stop event propagation to prevent parent div click
    navigate(`playlist/${playlist._id}/add/songs`);
  }



  return (
    <div
      key={playlist._id}
      onClick={() => navigate(`playlist/${playlist._id}`)}
      className={`h-1/5 will-change-auto p-1 text-white  m-1 flex flex-row gap-4 hover:bg-customGray hover:cursor-pointer rounded-md`}
    >
      <div className="h-9/10 w-1/5 ">
        <img src={playlist.thumbnail} className="h-full w-full rounded" />
      </div>

      <div className="h-full w-3/5 flex flex-col justify-around ">
        <div className="text-lg">{playlist.name}</div>
        <div className="text-sm flex flex-row gap-2">
          
          <span className="text-xs">{playlist.songs.length} songs</span>
          <span>
           
            <button className="hover:cursor-default  border-2 px-1 text-xs  border-black border-solid bg-customGray rounded-full">
              {playlist.visibilityMode}
            </button>
          </span>
        </div>
      </div>

      <div className="h-full w-1/5 flex items-center justify-center ">
        

        <IoAddSharp onClick={addSongsToPlaylistClickHandler} className="h-7 w-7 hover:scale-125 hover:cursor-pointer " />

      </div>
    </div>
  );
}
