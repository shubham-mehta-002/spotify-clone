import { createContext, useContext, useEffect, useState } from "react";
import { useReducer } from "react";
export const appContext = createContext();
export const useAppContext = () => useContext(appContext);

// REMOVE SET_ALL_SONGS

function reducer(state, action) {
  switch (action.type) {
    case "SET_PLAYLIST_INITIAL_VALUE": {
      return { ...state, playlists: action.payload.playlists };
    }

    case "SET_LIKED_SONGS_INITIAL_VALUE": {
      return { ...state, likedSongs: action.payload.likedSongs };
    }

    case "ADD_PLAYLIST": {
      return {
        ...state,
        playlists: [...state.playlists, ...action.payload.playlist],
      };
    }

    case "ADD_SONG_TO_PLAYLIST": {
      const newPlaylist = state.playlists.map((playlist) => {
        if (playlist._id !== action.payload.playlistId) return playlist;
        else
          return {
            ...playlist,
            songs: [...playlist.songs, action.payload.songId],
          };
      });

      return { ...state, playlists: newPlaylist };
    }

    case "REMOVE_SONG_FROM_PLAYLIST": {
      const newPlaylist = state.playlists.map((playlist) => {
        if (playlist._id !== action.payload.playlistId) return playlist;
        else {
          const updatedSongsInPlaylist = playlist.songs.filter(
            (songId) => songId !== action.payload.songId
          );
          return { ...playlist, songs: updatedSongsInPlaylist };
        }
      });

      return { ...state, playlists: newPlaylist };
    }

    case "ADD_TO_LIKED_SONGS": {
      return {
        ...state,
        likedSongs: [...state.likedSongs, action.payload.songId],
      };
    }
    case "REMOVE_FROM_LIKED_SONGS": {
      const newLikedSongsData = state.likedSongs.filter(
        (likedSongId) => likedSongId !== action.payload.songId
      );
      return { ...state, likedSongs: newLikedSongsData };
    }

    case "SET_DURATION": {
      return {
        ...state,
        currentDuration: action.payload.duration,
      };
    }

    case "SET_CURRENT_SONG": {
      return {
        ...state,
        currentSong: action.payload.currentSong,
        isPlaying: true,
      };
    }

    case "SET_ALL_SONGS": {
      return {
        ...state,
        allSongs: action.payload.songs,
        currentPlaylistId: action.payload.id,
      };
    }

    case "TOGGLE_RANDOM": {
      return {
        ...state,
        random: action.payload.random,
      };
    }

    case "TOGGLE_LOOP": {
      return {
        ...state,
        loop: action.payload.loop,
      };
    }

    case "TOGGLE_PLAYING": {
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
      };
    }

    case "TOGGLE_NEXT_SONG_CALL": {
      return {
        ...state,
        nextSong: action.payload.nextSong,
      };
    }

    case "TOGGLE_PREV_SONG_CALL": {
      return {
        ...state,
        prevSong: action.payload.prevSong,
      };
    }
    case "CALL_NEXT_SONG": {
      return {
        ...state,
        callNextOnEndOfCurrentSong: action.payload.callNextOnEndOfCurrentSong,
      };
    }
    case "SET_CURRENT_PLAYLIST_ID": {
      return {
        ...state,
        currentPlaylistID: action.payload.currentPlaylistID,
      };
    }
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    playlists: [],
    likedSongs: [],
    currentSong: null,
    isPlaying: false,
    currentDuration: 0,
    loop: false,
    callNextOnEndOfCurrentSong: false,
    allSongs: [],
    currentPlaylistId: null,
    currentPlaylistID: null,
  });

  return (
    <appContext.Provider value={{ state, dispatch }}>
      {children}
    </appContext.Provider>
  );
};
