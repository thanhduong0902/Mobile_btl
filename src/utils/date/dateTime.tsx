import moment from "moment";

const getTimeUpNews = (createdTime: string): string => {
  const currentDate = new Date();
  const timeDiff = Number(
    moment(currentDate).diff(moment(createdTime), "minutes")
  );

  if (timeDiff > 60) {
    let time = 0;
    if (timeDiff < 1440) {
      time = Math.floor(timeDiff / 60);
      return time + "h";
    }
    time = Math.floor(timeDiff / 1440);
    return time + "d";
  }

  if (Number.isNaN(timeDiff)) {
    return "";
  }
  return timeDiff + "m";
};

export default getTimeUpNews;
