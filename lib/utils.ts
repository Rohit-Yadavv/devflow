import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getTimeStamp = (createdAt: Date): string => {
  // Ensure that createdAt is a Date object
  if (!(createdAt instanceof Date)) {
    throw new Error("Invalid date object");
  }

  // Calculate the time difference in milliseconds
  const now = new Date();
  const timeDifference = now.valueOf() - createdAt.valueOf();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  // Determine the appropriate time unit
  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};

export const formatNumber = (num: number): string => {
  const absNum = Math.abs(num);

  if (absNum < 1000) {
    return num.toString();
  } else if (absNum < 1e6) {
    return (num / 1e3).toFixed(1) + 'k';
  } else if (absNum < 1e9) {
    return (num / 1e6).toFixed(1) + 'm';
  } else if (absNum < 1e12) {
    return (num / 1e9).toFixed(1) + 'b';
  } else {
    return (num / 1e12).toFixed(1) + 't';
  }
};
