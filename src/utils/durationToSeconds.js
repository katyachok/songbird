export const durationToSeconds = (str) => {
  const dates = str.split(":");
  return dates.reduce((acc, item, index) => {
    if (index === 0) {
      acc = item * 60;
      return acc;
    } else return (acc += +item);
  }, 0);
};
