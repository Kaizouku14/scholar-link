import EventCalendar from "./scholarship/event-calendar";
import StudentScholarshipStatus from "./scholarship/student-status";

const StudentDashboard = () => {
  const events = [
    { date: "2025-04-23", title: "Team Meeting" },
    { date: "2025-07-15", title: "Project Review" },
    { date: "2025-07-10", title: "Client Call" },
  ];
  return (
    <div className="flex w-full flex-col gap-2">
      <StudentScholarshipStatus />
      <EventCalendar events={events} />
    </div>
  );
};

export default StudentDashboard;
