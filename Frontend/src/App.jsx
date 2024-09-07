import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  Signup,
  Home,
  UploadSong,
  AllPlaylists,
  LikedSongsPage,
  CreatePlaylist,
  SearchPage,
  AddSongsToPlaylist,
  PlaylistPage,
  MySongsPage,
  ArtistPage,
  AllSongsPage,
  ErrorPage,
  Account,
  MyPlaylistsPage
} from "./Pages";
import { useLoginContext } from "./Context/loginContext";

function App() {
  const { loginState, setLoginState } = useLoginContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <AllSongsPage />,
        },
        {
          path: "create/songs",
          element: <UploadSong />,
        },
        {
          path: "my/playlists",
          element: <MyPlaylistsPage/>,
        },
        {
          path: "playlist",
          element: <AllPlaylists />,
        },
        {
          path: "my/songs", 
          element: <MySongsPage />,
        },
        {
          path: "create/playlist",
          element: <CreatePlaylist />,
        },
        {
          path: "playlist/:playlistId/add/songs",
          element: <AddSongsToPlaylist />,
        },
        {
          path: "playlist/:playlistId",
          element: <PlaylistPage />,
        },
        {
          path: "search",
          element: <SearchPage />,
        },
        {
          path: "liked/songs",
          element: <LikedSongsPage />,
        },
        {
          path: "artist/:artistId",
          element: <ArtistPage />,
        },
        {
          path: "account",
          element: <Account />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <div className="h-screen w-screen font-poppins">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
