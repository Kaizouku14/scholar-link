import EventCalendar from "../scholarship/event-calendar";
import FeaturedScholarship from "../scholarship/featured-scholarship";
import StudentScholarshipStatus from "../scholarship/student-status";
import UpcomingDeadline from "../scholarship/upcoming-deadline";

const StudentDashboard = () => {
  const events = [
    { date: "2025-04-23", title: "Team Meeting" },
    { date: "2025-07-15", title: "Project Review" },
    { date: "2025-07-10", title: "Client Call" },
  ];
  return (
    <div className="flex w-full flex-col gap-2">
      <StudentScholarshipStatus />
      <div className="flex gap-2">
        <FeaturedScholarship />
        <UpcomingDeadline />
      </div>
      <EventCalendar events={events} />
    </div>
  );
};

export default StudentDashboard;
