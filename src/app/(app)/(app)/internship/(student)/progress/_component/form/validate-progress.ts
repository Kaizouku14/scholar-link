import { differenceInMinutes } from "date-fns";

export const validateAndCalculateHours = (
  timeIn: Date,
  timeOut: Date,
): number => {
  if (timeOut <= timeIn)
    throw new Error("Time Out must be later than Time In.");
  if (timeIn.toDateString() !== timeOut.toDateString())
    throw new Error("Time In and Time Out must be on the same day.");

  const diffMinutes = differenceInMinutes(timeOut, timeIn);
  const hours = diffMinutes / 60;

  if (hours < 1) throw new Error("Minimum log duration is 1 hour.");
  if (hours > 12) throw new Error("You cannot log more than 12 hours per day.");

  const totalHours = Number(hours.toFixed(2)) - 1;
  return totalHours;
};
