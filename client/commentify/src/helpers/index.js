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
