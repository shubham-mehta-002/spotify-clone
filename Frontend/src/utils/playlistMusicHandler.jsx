import { playMusic } from "./playMusic";

export const playlistMusicHandler = (data, state, dispatch) => {
  dispatch({
    type: "CALL_NEXT_SONG",
    payload: { callNextOnEndOfCurrentSong: true },
  });
  const newAudio = new Audio(data[0].track);

  const songData = { ...data[0], audio: newAudio };

  playMusic(state, dispatch, songData);
};
