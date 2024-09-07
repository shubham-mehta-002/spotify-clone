export const playMusic = async (state, dispatch, songData) => {
  if (state.currentSong && state.currentSong._id === songData._id) {
    if (state.isPlaying) {
      dispatch({ type: "TOGGLE_PLAYING", payload: { isPlaying: false } });
      state.currentSong.audio.pause();
    } else {
      dispatch({ type: "TOGGLE_PLAYING", payload: { isPlaying: true } });
      await state.currentSong.audio.play();
    }
  } else {
    if (state.currentSong) {
      dispatch({ type: "TOGGLE_PLAYING", payload: { isPlaying: false } });
      state.currentSong?.audio.pause();
    }
    dispatch({ type: "SET_CURRENT_SONG", payload: { currentSong: songData } });
    dispatch({ type: "TOGGLE_PLAYING", payload: { isPlaying: true } });
    await songData.audio.play();
  }
};

export const nextMusic = async (state, dispatch) => {
  const { currentSong } = state;
  const songsList = state.allSongs;
  if (currentSong) {
    let song = undefined;
    const index = songsList.findIndex((song) => song._id === currentSong._id);
    if (index === songsList.length - 1) {
      state.currentSong.audio.pause();
      dispatch({ type: "SET_CURRENT_SONG", payload: { currentSong: null } });
      dispatch({ type: "TOGGLE_PLAYING", payload: { isPlaying: false } });
      dispatch({ type: "SET_ALL_SONGS", payload: { songs: null } });
      dispatch({ type: "SET_CURRENT_PLAYLIST_ID", payload: { currentPlaylistID: null }});
    } else {
      song = songsList[index + 1];
      song.audio = new Audio(song.track);
      playMusic(state, dispatch, song);
    }
  }
};

export const prevMusic = (state, dispatch) => {
  const { currentSong } = state;
  const songsList = state.allSongs;
  if (currentSong) {
    const index = songsList.findIndex((song) => song._id === currentSong._id);

    if (index === 0) {
      // const song = songsList[songsList.length - 1];
      // song.audio = new Audio(song.track);
      // playMusic(state, dispatch, song);
      state.currentSong.audio.pause();
      dispatch({ type: "SET_CURRENT_SONG", payload: { currentSong: null } });
      dispatch({ type: "TOGGLE_PLAYING", payload: { isPlaying: false } });
      dispatch({ type: "SET_ALL_SONGS", payload: { songs: null } });
      dispatch({ type: "SET_CURRENT_PLAYLIST_ID", payload: { currentPlaylistID: null }})
    } else {
      const song = songsList[index - 1];
      song.audio = new Audio(song.track);
      playMusic(state, dispatch, song);
    }
  }
};
