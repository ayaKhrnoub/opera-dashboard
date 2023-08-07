import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

export function convertTime(timeString: string) {
  const timeArray = timeString.split(" ");
  let hours = parseInt(timeArray[0].split(":")[0]);
  const minutes = parseInt(timeArray[0].split(":")[1]);
  const amPm = timeArray[1];

  if (amPm === "PM" && hours < 12) {
    hours = hours + 12;
  } else if (amPm === "AM" && hours === 12) {
    hours = hours - 12;
  }

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return formattedTime;
}
