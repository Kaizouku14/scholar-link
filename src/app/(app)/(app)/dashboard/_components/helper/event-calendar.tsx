"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatText } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SimpleCalendarProps {
  events?: { dateLogs: Date; description?: string | null }[];
}

const EventCalendar = ({ events = [] }: SimpleCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  const getEventForDay = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return events?.find((event) => {
      const eventDate = new Date(event.dateLogs);
      const eventDateString = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, "0")}-${String(eventDate.getDate()).padStart(2, "0")}`;
      return eventDateString === dateString;
    });
  };

  // Get the first event chronologically
  const getFirstEvent = () => {
    if (!events || events.length === 0) return null;

    const sortedEvents = [...events].sort(
      (a, b) => new Date(a.dateLogs).getTime() - new Date(b.dateLogs).getTime(),
    );

    return sortedEvents[0];
  };

  const isFirstEventDay = (day: number) => {
    const firstEvent = getFirstEvent();
    if (!firstEvent) return false;

    const currentDayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );

    const firstEventDate = new Date(firstEvent.dateLogs);

    return (
      currentDayDate.getFullYear() === firstEventDate.getFullYear() &&
      currentDayDate.getMonth() === firstEventDate.getMonth() &&
      currentDayDate.getDate() === firstEventDate.getDate()
    );
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Get previous month info
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      0,
    );
    const daysInPrevMonth = prevMonth.getDate();

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <div
          key={`prev-${day}`}
          className="border-border flex h-20 cursor-pointer flex-col items-center justify-start rounded border p-1"
        >
          <span className="text-muted-foreground text-sm font-medium">
            {day}
          </span>
        </div>,
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvent = getEventForDay(day);
      const isFirst = isFirstEventDay(day);

      let dayClasses =
        "border-border flex h-20 cursor-pointer flex-col items-center justify-start overflow-hidden rounded border p-1 sm:h-20 transition-all duration-200 relative";

      if (isFirst) {
        dayClasses += " border-blue-800 bg-blue-400";
      } else if (dayEvent) {
        dayClasses += " border-green-500 bg-green-400";
      } else {
        dayClasses += " bg-background hover:bg-gray-100 dark:hover:bg-gray-800";
      }

      days.push(
        <TooltipProvider key={day}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={dayClasses}>
                <span className="self-end pr-0.5 text-xs font-medium sm:pr-1 sm:text-sm">
                  {day}
                </span>

                {isFirst ? (
                  <span className="mx-1 mt-2 text-center text-sm leading-tight font-bold text-white sm:text-xs">
                    Start of Internship
                  </span>
                ) : dayEvent ? (
                  <span className="mx-1 line-clamp-2 w-20 truncate text-center text-[10px] leading-tight text-wrap text-white sm:text-xs">
                    {dayEvent.description && formatText(dayEvent.description)}
                  </span>
                ) : null}
              </div>
            </TooltipTrigger>

            {dayEvent && (
              <TooltipContent side="top" align="center" className="max-w-xs">
                {isFirst ? (
                  <>
                    <span className="font-bold">Start of Internship</span> –{" "}
                    {formatText(dayEvent.description ?? "First log entry")}
                  </>
                ) : (
                  <>
                    {" "}
                    {dayEvent.description && formatText(dayEvent.description)}
                  </>
                )}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>,
      );
    }

    // Next month preview days to fill the grid (5 rows only)
    const totalCells = 35; // 5 rows × 7 days
    const remainingCells = totalCells - days.length;

    if (remainingCells > 0) {
      for (let day = 1; day <= remainingCells; day++) {
        days.push(
          <div
            key={`next-${day}`}
            className="border-border flex h-20 cursor-pointer flex-col items-center justify-start rounded border p-1"
          >
            <span className="text-muted-foreground text-sm font-medium">
              {day}
            </span>
          </div>,
        );
      }
    }

    return days;
  };

  return (
    <div className="border-border mx-auto w-full rounded-xl border p-4">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant={"outline"}
          onClick={() => navigateMonth("prev")}
          className="px-3 py-2"
        >
          <ChevronLeft />
        </Button>

        <h2 className="text-2xl font-bold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <Button
          variant={"outline"}
          onClick={() => navigateMonth("next")}
          className="px-3 py-2"
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Day names header */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {dayNames.map((day) => (
          <div
            key={day}
            className="flex h-10 items-center justify-center font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
};

export default EventCalendar;
