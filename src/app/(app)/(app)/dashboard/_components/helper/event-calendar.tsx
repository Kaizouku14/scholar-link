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
          className={`border-border flex h-20 cursor-pointer flex-col items-center justify-start rounded border ${
            dayEvent ? "border-red-600 bg-red-400" : "bg-background"
          }`}
        >
          <span className="self-end pr-1 text-sm font-medium">{day}</span>
          {dayEvent && (
            <span className="mx-2 mt-1 truncate text-center text-xs leading-tight text-wrap">
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
    <div className="border-border mx-auto w-full rounded-xl border p-4">
      <div className="mb-4 flex items-center justify-between px-2 pt-2">
        <h2 className="text-2xl font-medium">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7">
        {dayNames.map((day) => (
          <div key={day} className="flex h-8 items-center justify-center">
            <span className="text-xs font-medium text-gray-500">{day}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 px-2">{renderDays()}</div>
    </div>
  );
};

export default EventCalendar;
