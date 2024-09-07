import { Sidebar, PlaylistView, Navbar, SongPlayer } from "../../Pages";
import { useLoginContext } from "../../Context/loginContext";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../Context/appContext";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constant";

export function Home() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        var response = await axios.get(
          `${BASE_URL}/playlist/my/playlists`,
          {
            params: {
              token: token,
            },
          },
          []
        );
      } catch (err) {
        console.log(err);
      }

      dispatch({
        type: "SET_PLAYLIST_INITIAL_VALUE",
        payload: { playlists: response.data.playlists },
      });
    })();
  }, []);

  // get liked songs of the user
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        var response = await axios.get(
          `${BASE_URL}/song/liked`,
          {
            params: {
              token: token,
            },
          },
          []
        );


      } catch (err) {
        console.log(err);
      }
      dispatch({
        type: "SET_LIKED_SONGS_INITIAL_VALUE",
        payload: {
          likedSongs: response.data.likedSongs.map((song) => song._id),
        },
      });
    })();
  }, []);

  return (
    <div className="h-screen w-screen bg-black ">
      <div
        className={`overflow-x-hidden flex flex-row w-full ${
          state.currentSong ? "h-9/10" : "h-full"} `}
      >
        <Sidebar />

        <div className="h-full w-full lg:w-3/4 p-2">
          <div className="h-full w-full bg-customLightBlack rounded-lg ">
            <Navbar />
            <div className="h-9/10 w-1/10 overflow-y-auto overflow-x-hidden my-2 ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {state.currentSong && (
        <div className="h-1/10 w-full">
          <SongPlayer />
        </div>
      )}
    </div>
  );
}
