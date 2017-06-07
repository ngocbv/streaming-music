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
