import { PlaylistView } from "../../Pages";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoginContext } from "../../Context/loginContext";
import { BASE_URL } from "../../constant";
export function AllPlaylists() {
  const { loginState } = useLoginContext();
  const [playlistData, setPlaylistData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${BASE_URL}/playlist`);
        const filteredData = response.data.playlists.filter(
          (playlist) => playlist.visibilityMode === "public"
        );
        setPlaylistData(filteredData);
      } catch (err) {
        console.log("Error occurred : ", err);
      }
    })();
  }, []);

  return (
    <div className="all-songs m-4 flex flex-col h-full ">
      <div className=" font-bold text-5xl mb-4 text-white flex justify-center">
        All Playlists
      </div>
      {playlistData ? (
        playlistData.length === 0 ? (
          <div className="all-songs m-4 flex flex-col ">
            <div className="text-white flex flex-col gap-4 items-center justify-center">
              <div className="text-4xl">No playlist available</div>
              <div className="text-sm">
                To create your own playlist, click on Create Playlist in the
                Sidebar
              </div>
            </div>
          </div>
        ) : (
          <div className="cards h-9/10 w-full flex flex-col gap-4">
            <PlaylistView cardsData={playlistData} />
          </div>
        )
      ) : (
        <div className="flex items-center justify-center text-white">
          Loading ...
        </div>
      )}
    </div>
  );
}
