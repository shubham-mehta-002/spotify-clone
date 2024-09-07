import { useEffect, useMemo, useState } from "react";
import { SongTiles } from "../Pages";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppContext } from "../Context/appContext";
import  {BASE_URL} from "../constant"
export function Searching({
  placeholder,
  searchBasis,
  addButton,
  songsInPlaylist,
  checkIfAlreadyInPlaylist,
}) {
  const [songs, setSongs] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${BASE_URL}/song`);
      if (response.data.success === true) {
        setSongs(response.data.songs);
        dispatch({
          type: "SET_ALL_SONGS",
          payload: { songs: response.data.songs },
        });
      }
    })();
  }, []);


  const { playlistId } = useParams();
  const [query, setQuery] = useState("");
  const { state, dispatch } = useAppContext();



  const filteredItems = useMemo(() => {
    if(songs)
    return songs.filter((dataItem) =>
      dataItem.name.toLowerCase().trim().includes(query.toLowerCase().trim()) 
    );
    else
      return songs
  }, [songs, query]);

  songsInPlaylist = songsInPlaylist.map((song) => song._id);

  return (
    <div className="main h-4/5 w-full flex flex-col jsutify-center items-center mt-4 gap-4">
      <div className="search-input-box mb-2 w-[100vw] flex justify-center items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=" outline-none border-2 w-1/2 min-w-[300px] border-solid border-gray-400 p-3 rounded placeholder-gray-500 "
          placeholder={placeholder}
        />
      </div>

      <div className="songs h-full w-full  ">
        {songs ? songs.length === 0 ? (
          <div className="text-white flex flex-col gap-4 items-center justify-center">
            <div className="text-4xl">No songs available</div>
            <div className="text-sm">
              To create your own song, click on Upload Song in Navbar
            </div>
          </div>
        ) : (
          filteredItems.map((dataItem) => (
            <SongTiles
              key={dataItem._id}
              {...dataItem}
              addButton={addButton}
              playlistId={playlistId}
              {...(checkIfAlreadyInPlaylist && {
                alreadyInPlaylist: songsInPlaylist.includes(dataItem._id),
              })}
            />
          ))
        )
        :
        <div className="flex justify-center text-white text-3xl">Loading ...</div>
      
      }
      </div>
    </div>
  );
}
