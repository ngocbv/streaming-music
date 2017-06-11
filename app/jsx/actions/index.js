export const togglePlay = () => ({
  type: "TOGGLE_PLAY",
});

export const play = () => ({
  type: "PLAY",
});

export const pause = () => ({
  type: "PAUSE",
});

export const progress = (value) => ({
  type: "PROGRESS",
  value,
});

export const setSongList = (songs) => ({
	type: "SET_SONG_LIST",
	songs: songs,
});

export const changeSong = (media) => ({
	type: "CHANGE_SONG",
	media: media,
});
