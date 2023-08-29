import { arrOfAvatars } from "../constants";

export const sort = (arr, dir = "descending", sortBy) => {
  const arrCopy = [...arr];

  if (dir === "ascending") {
    return arrCopy.sort((a, b) => a[sortBy] - b[sortBy]);
  }

  return arrCopy.sort((a, b) => b[sortBy] - a[sortBy]);
};

export const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * arrOfAvatars.length);
  return arrOfAvatars[randomIndex];
};

export function calculateAverages(arr) {
  arr.forEach((element) => {
    if (element.comments.length) {
      element.average = +(
        element.comments.reduce((acc, comment) => {
          return acc + comment.rating;
        }, 0) / element.comments.length
      ).toFixed(2);
    } else {
      element.average = false;
    }
  });
  return arr;
}

export const getDateForm = (date) => {
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "Nowember",
    12: "December",
  };

  const inputDate = new Date(date);
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getDate().toString().padStart(2, "0");

  return `${months[month]}  ${day}, ${year}`;
};
