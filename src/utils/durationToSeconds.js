export const durationToSeconds = (str) => {
  if (!str) return;
  const dates = str.split(":");
  return dates.reduce((acc, item, index) => {
    if (index === 0) {
      acc = item * 60;
      return acc;
    } else return (acc += +item);
  }, 0);
};

export const formatDuration = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
