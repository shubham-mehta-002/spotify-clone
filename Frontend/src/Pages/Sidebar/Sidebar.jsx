import spotify_logo_white from "../../images/spotify_logo_white.png";
import home from "../../images/home.jpg";
import search from "../../images/search.png";
import playlist from "../../images/playlist.png";
import plus from "../../images/plus.png";
import { NavLink, useNavigate } from "react-router-dom";
// import { useLoginContext } from "../../Context/loginContext";
import { CreatePlaylist } from "../Create Playlist/CreatePlaylist";
import { PlaylistSidebar } from "../../Pages";
import { useAppContext } from "../../Context/appContext";

export function Sidebar() {
  // const { loginState, setLoginState } = useLoginContext();
  const loginState = localStorage.getItem('token') ? true : false

  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="hidden lg:block h-full w-1/4 p-2 ">
      <div className="h-1/4 bg-customLightBlack  border-solid border-black border-2  box-border p-2 rounded-xl">
        <div className="hover:cursor-pointer h-1/3 flex items-center box-border justify-start  gap-2 p-2">
          <img src={spotify_logo_white} className="h-6" />
          <span className="font-semibold text-l text-white">Spotify</span>
        </div>

        <div className="h-1/3 flex items-center box-border justify-start  gap-4 p-2">
          <img src={home} className="h-6" />
          <span className="hover:text-white font-bold text-l text-customGray">
            <NavLink to="/">Home</NavLink>
          </span>
        </div>

        <div className="h-1/3 flex items-center box-border justify-start  gap-4 p-2">
          <img src={search} className="h-6" />
          <span className=" hover:text-white font-bold text-l text-customGray">
            <NavLink to="/search">Search</NavLink>
          </span>
        </div>
      </div>

      <div className="h-3/4 bg-customLightBlack  border-solid border-black border-2  box-border p-2 rounded-lg ">
        <div className=" h-1/5 flex items-baseline box-border justify-between gap-4 py-4 px-2">
          <div className="flex items-center box-border justify-between gap-4 ">
            <img src={playlist} className="h-6" />
            <span className="font-semibold text-l text-white">
              Your library
            </span>
          </div>
          <button
            onClick={() => {
              loginState ? navigate("/create/playlist") : navigate("/login");
            }}
          >
            <img
              src={plus}
              className="h-6 hover:scale-125 hover:cursor-pointer"
            />
          </button>
        </div>

        {/* login based */}

        <div className="playlist h-4/5 w-full flex flex-col rounded-lg gap-4 bg-customLightBlack overflow-x-hidden overflow-y-auto">
          {(!loginState || !(state.playlists && state.playlists.length)) && (
            <div className="h-2/5 w-full bg-customGray flex flex-col items-baseline p-3 rounded-lg">
              <div className="my-3 text-white font-semibold">
                Create your first playlist
              </div>
              <button
                onClick={() => {
                  loginState
                    ? navigate("/create/playlist")
                    : navigate("/login");
                }}
                className="my-4 bg-white px-2 py-2 text-l font-medium rounded-full w-36 hover:scale-105"
              >
                {" "}
                Create playlist
              </button>
            </div>
          )}
          {!loginState && (
            <div className="h-2/5 w-full bg-customGray flex flex-col items-baseline  p-3 rounded-lg">
              <div className="my-3  text-white font-semibold ">
                Add your favorite songs{" "}
              </div>
              <button
                onClick={() => {
                  loginState ? navigate("/") : navigate("/login");
                }}
                className="my-4 bg-white px-2 py-3 text-l font-medium rounded-full w-36 hover:scale-105"
              >
                Liked songs
              </button>
            </div>
          )}

          {loginState && (
            <div className="playlist h-4/5 w-full flex  flex-col  rounded-lg b">
              <PlaylistSidebar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
