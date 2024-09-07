import { Searching } from "../../Components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../Context/appContext";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../../constant";
export function AddSongsToPlaylist() {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }

  const { playlistId } = useParams();
  const [songsInPlaylist, setSongsInPlaylist] = useState([]);
  const token = localStorage.getItem("token");
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${BASE_URL}/playlist/${playlistId}`,
        {
          params: {
            token,
          },
        }
      );

      if (response.data.success === true) {
        setSongsInPlaylist(response.data.playlist.songs);
      }
    })();
  }, [playlistId, state.playlists]);

  return (
    <div className="h-full w-full overflow-x-hidden overflow-y-auto">
      <Searching
        placeholder={"Search by song name"}
        searchBasis={["songs"]}
        playlistId={playlistId}
        songsInPlaylist={songsInPlaylist}
        checkIfAlreadyInPlaylist={true}
        addButton={true}
      />
    </div>
  );
}
