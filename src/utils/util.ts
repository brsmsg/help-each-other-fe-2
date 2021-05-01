export const formatTime = (time: Date) => {
  const now = new Date().getTime();
  const targetTime = time.getTime();

  const delta = now - targetTime;
  let result;
  if (delta < 1000 * 60) {
    result = `${Math.floor(delta / 1000)}秒前`;
  } else if (delta < 1000 * 60 * 60) {
    result = `${Math.floor(delta / (1000 * 60))}分钟前`;
  } else if (delta < 1000 * 60 * 60 * 24) {
    result = `${Math.floor(delta / (1000 * 60 * 60))}小时前`;
  } else {
    result = `${Math.floor(delta / (1000 * 60 * 60 * 24))}天前`;
  }
  return result;
};
