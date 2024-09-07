import { Searching } from "../../Components";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constant";
export function SearchPage() {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${BASE_URL}/song`);

      if (response.data.success === true) setSongs(response.data.songs);
    })();
  }, []);

  return (
    <div>
      <Searching
        placeholder={"What do you want to listen to ?"}
        songsInPlaylist={songs}
        checkIfAlreadyInPlaylist={false}
      />
    </div>
  );
}
