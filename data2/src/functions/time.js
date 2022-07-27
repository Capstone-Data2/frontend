export function FormatTime(totalseconds) {
  const minutes = Math.floor(totalseconds / 60);
  const seconds = totalseconds % 60;
  const result = `${format(minutes)}:${format(seconds)}`;
  return result;

  function format(num) {
    return num.toString().padStart(2, "0");
  }
}

export function TimeDifference(time = null) {
  if (time != null) {
    if (time.includes("day")) {
      return time.split(",")[0] + " ago";
    } else {
      var split = time.split(":");
      if (split[0] === "0") {
        return split[1] + " minutes ago";
      } else {
        if (split[0] === "1") {
          return split[0] + " hour ago";
        } else {
          return split[0] + " hours ago";
        }
      }
    }
  }
}

export function UnixTimeDifference(timestamp) {
  var seconds = Math.floor((new Date() - new Date(timestamp * 1000)) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + (Math.floor(interval) > 1 ? " years ago": " year ago");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + (Math.floor(interval) > 1 ? " months ago": " month ago");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + (Math.floor(interval) > 1 ? " days ago": " day ago");
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + (Math.floor(interval) > 1 ? " hours ago": " hour ago");
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + (Math.floor(interval) > 1 ? " minutes ago": " minute ago");
  }
  return Math.floor(seconds) + " seconds ago";
}


export function getTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var sec = seconds - minutes * 60;
  if (sec < 10) {
    return (String(minutes) + ':0' + String(sec))
  }
  else {
    return (String(minutes) + ':' + String(sec))
  }

}