"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCUMENT_LABELS, type documentsType } from "@/constants/documents";

interface SimpleCalendarProps {
  events?: { deadline: Date; name: string | documentsType }[];
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
      const eventDate = new Date(event.deadline);
      const eventDateString = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, "0")}-${String(eventDate.getDate()).padStart(2, "0")}`;
      return eventDateString === dateString;
    });
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

      days.push(
        <div
          key={day}
          className={`border-border flex h-20 cursor-pointer flex-col items-center justify-start overflow-hidden rounded border p-1 sm:h-20 ${
            dayEvent ? "border-red-600 bg-red-400" : "bg-background"
          }`}
        >
          <span className="self-end pr-0.5 text-xs font-medium sm:pr-1 sm:text-sm">
            {day}
          </span>
          {dayEvent && (
            <span className="mx-1 mt-0.5 line-clamp-2 text-center text-[10px] leading-tight sm:text-xs">
              {dayEvent.name in DOCUMENT_LABELS
                ? DOCUMENT_LABELS[dayEvent.name as documentsType]
                : dayEvent.name}
            </span>
          )}
        </div>,
      );
    }

    const totalCells = 42; // 6 rows × 7 days
    const remainingCells = totalCells - days.length;

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

    return days;
  };

  return (
    <div className="border-border mx-auto w-full rounded-xl border p-2 sm:p-4">
      <div className="mb-4 flex flex-col gap-2 px-1 pt-2 sm:flex-row sm:items-center sm:justify-between sm:px-2">
        <h2 className="text-lg font-medium sm:text-2xl">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth("prev")}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth("next")}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7">
        {dayNames.map((day) => (
          <div
            key={day}
            className="flex h-6 items-center justify-center sm:h-8"
          >
            <span className="text-[10px] font-medium text-gray-500 sm:text-xs">
              {day}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
};

export default EventCalendar;
