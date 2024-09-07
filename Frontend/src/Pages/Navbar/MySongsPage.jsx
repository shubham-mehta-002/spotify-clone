import { useState, useEffect } from "react";
import axios from "axios";
import { SongTiles } from "../../Components";
import {Navigate} from "react-router-dom"
import { BASE_URL } from "../../constant";
export function MySongsPage() {
  const token = localStorage.getItem("token");
  const [songs, setSongs] = useState(null);
  const loginState = localStorage.getItem("token") ? true : false;


  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
         `${BASE_URL}/song/my/songs`,
          {
            params: {
              token: token,
            },
          }
        );

        if (response.data.success === true) {
          setSongs(response.data.songs);
        }
      } catch (err) {
        console.log("Error occured : ", err);
      }
    })();
  }, []);


  if(!loginState){
    return <Navigate to='/login'></Navigate>
  }

  return (
    <div className="all-songs mx-2 flex flex-col ">
      <div className=" font-bold text-5xl mb-4 text-white flex justify-center">
        My Songs
      </div>

      {loginState ? (
        songs ? (
          songs.length === 0 ? (
            <div className="text-white flex flex-col gap-4 items-center justify-center">
              <div className="text-4xl">No songs available</div>

              <div className="text-sm">
                To create your own song, click on Upload Song in Navbar
              </div>
            </div>
          ) : (
            <div>
              {songs.map((song) => (
                <SongTiles
                  key={song._id}
                  {...song}
                  allSongs={songs}
                  playlistId={"mySongs"}
                />
              ))}
            </div>
          )
        ) : (
          <div className="flex justify-center items-center text-white">
            Loading ...
          </div>
        )
      ) : (
        <div className="flex justify-center items-center text-white">
          Login to see songs you Uploaded
        </div>
      )}
    </div>
  );
}
