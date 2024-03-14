const converSeconds = (value: number): string => {
  if (!value) return "";

  const seconds = value.toFixed(0);
  const d = Number(seconds);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  let hDisplay;
  if (h > 0) hDisplay = h < 10 ? "0" + h + ":" : String(h) + ":";
  else {
    hDisplay = "";
  }
  let mDisplay;
  if (m > 0) mDisplay = m < 10 ? "0" + m + ":" : m + ":";
  else {
    mDisplay = "00:";
  }
  let sDisplay;
  if (s > 0) sDisplay = s < 10 ? "0" + s : s;
  else {
    sDisplay = "00";
  }
  return hDisplay + mDisplay + sDisplay;
};

export default converSeconds;
