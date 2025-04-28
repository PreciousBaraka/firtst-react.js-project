import moment from "moment";

export const formatDate = (createdAt) => {
  const today = moment().startOf("day");
  const visitDate = moment(createdAt);

  // Check if the visit was created today
  if (visitDate.isSame(today, "day")) {
    return visitDate.calendar();
  } else {
    return visitDate.format("ll");
  }
};

export const toCapitalize = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};


export const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
