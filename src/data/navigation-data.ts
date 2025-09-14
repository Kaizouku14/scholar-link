import {
  LayoutDashboard,
  Building,
  Building2,
  BarChartIcon as ChartColumn,
  ShieldIcon as ShieldUser,
  Handshake,
  NotepadText,
  FileCheck,
  LineChartIcon as ChartLine,
  Mail,
  Search,
  Award,
  Users,
  FileText,
  FileUser,
} from "lucide-react";
import { PageRoutes } from "../constants/page-routes";
import type { NavigationData } from "@/interfaces/navigation";

export const NAVIGATION_DATA: NavigationData = {
  internshipAdmin: {
    main: [
      {
        title: "Overview",
        items: [
          {
            title: "Dashboard",
            url: PageRoutes.DASHBOARD,
            icon: LayoutDashboard,
            description: "Main dashboard overview",
          },
        ],
      },
      {
        title: "Internship Management",
        items: [
          {
            title: "HEI",
            url: PageRoutes.INTERNSHIP_ADMIN_MANAGE_INTERNSHIPS,
            icon: Handshake,
            description: "Manage all internships",
          },
          {
            title: "HTE",
            url: PageRoutes.INTERNSHIPS_COMPANIES,
            icon: Building2,
            description: "Partner companies",
          },
          {
            title: "Departments",
            url: PageRoutes.INTERNSHIPS_DEPARTMENTS,
            icon: Building,
            description: "Academic departments",
          },
          {
            title: "MOA",
            url: PageRoutes.INTERNSHIPS_MOAS,
            icon: FileText,
            description: "Department agreements and collaborations",
          },
        ],
      },
      {
        title: "Analytics",
        items: [
          {
            title: "Reports",
            url: PageRoutes.INTERNSHIPS_REPORTS,
            icon: ChartColumn,
            description: "Performance reports",
          },
        ],
      },
    ],
    secondary: [
      {
        title: "Communication",
        items: [
          {
            title: "Mails",
            url: PageRoutes.MAILS,
            icon: Mail,
            badgeType: "messages",
            description: "Internal messaging",
          },
        ],
      },
    ],
    management: [
      {
        title: "System Administration",
        items: [
          {
            title: "User Accounts",
            url: PageRoutes.INTERNSHIPS_ACCOUNTS,
            icon: ShieldUser,
            description: "Manage User accounts",
          },
        ],
      },
    ],
  },

  internshipCoordinator: {
    main: [
      {
        title: "Overview",
        items: [
          {
            title: "Dashboard",
            url: PageRoutes.DASHBOARD,
            icon: LayoutDashboard,
          },
        ],
      },
      {
        title: "Coordination",
        items: [
          {
            title: "HEI",
            url: PageRoutes.INTERNSHIP_COORDINATION_MANAGE_INTERNSHIPS,
            icon: NotepadText,
            description: "Internships under supervision",
          },
          {
            title: "Documents",
            url: PageRoutes.INTERNSHIP_INTERNS_DOCUMENTS,
            icon: FileUser,
            description: "View interns documents",
          },
          {
            title: "Review Docs",
            url: PageRoutes.INTERNSHIPS_DOCUMENTS_REVIEW,
            icon: FileCheck,
            badgeType: "documents",
            description: "Pending document reviews",
          },
          {
            title: "Monitoring",
            url: PageRoutes.INTERNSHIPS_PROGRESS_MONITOR,
            icon: ChartLine,
            description: "Student progress tracking",
          },
        ],
      },
    ],
    secondary: [
      {
        title: "Communication",
        items: [
          {
            title: "Mails",
            url: PageRoutes.MAILS,
            icon: Mail,
            badgeType: "messages",
            description: "Student communications",
          },
        ],
      },
    ],
    management: [
      {
        title: "System Administration",
        items: [
          {
            title: "User Accounts",
            url: PageRoutes.INTERNSHIPS_ACCOUNTS,
            icon: ShieldUser,
            description: "Manage user accounts",
          },
        ],
      },
    ],
  },

  internshipStudent: {
    main: [
      {
        title: "My Internship",
        items: [
          {
            title: "Dashboard",
            url: PageRoutes.DASHBOARD,
            icon: LayoutDashboard,
          },
          {
            title: "Progress",
            url: PageRoutes.INTERNSHIPS_PROGRESS,
            icon: ChartLine,
            description: "Track your progress",
          },
          {
            title: "Documents",
            url: PageRoutes.INTERNSHIPS_DOCUMENTS,
            icon: NotepadText,
            description: "Submit and view documents",
          },
        ],
      },
    ],
    secondary: [
      {
        title: "Communication",
        items: [
          {
            title: "Mails",
            url: PageRoutes.MAILS,
            icon: Mail,
            badgeType: "messages",
            description: "Contact supervisors",
          },
        ],
      },
    ],
  },

  scholarshipStudent: {
    main: [
      {
        title: "Scholarships",
        items: [
          {
            title: "Dashboard",
            url: PageRoutes.DASHBOARD,
            icon: LayoutDashboard,
          },
          {
            title: "Browse Scholarships",
            url: PageRoutes.SCHOLARSHIPS_BROWSE,
            icon: Search,
            description: "Find available scholarships",
          },
          {
            title: "My Applications",
            url: PageRoutes.SCHOLARSHIP_MY_APPLICATIONS,
            icon: FileText,
            description: "Track your applications",
          },
        ],
      },
    ],
    secondary: [
      {
        title: "Communication",
        items: [
          {
            title: "Mails",
            url: PageRoutes.MAILS,
            icon: Mail,
            badgeType: "messages",
            description: "Contact advisors",
          },
        ],
      },
    ],
  },

  scholarshipAdmin: {
    main: [
      {
        title: "Overview",
        items: [
          {
            title: "Dashboard",
            url: PageRoutes.DASHBOARD,
            icon: LayoutDashboard,
          },
        ],
      },
      {
        title: "Scholarship Management",
        items: [
          {
            title: "Programs",
            url: PageRoutes.SCHOLARSHIPS_PROGRAMS,
            icon: Award,
            description: "Manage scholarship programs",
          },
          {
            title: "Applications",
            url: PageRoutes.SCHOLARSHIPS_APPLICATIONS,
            icon: FileText,
            badgeType: "applications",
            description: "Review applications",
          },
          {
            title: "Scholars",
            url: PageRoutes.SCHOLARSHIPS_SCHOLARS,
            icon: Users,
            description: "Manage scholars",
          },
        ],
      },
    ],
    secondary: [
      {
        title: "Communication",
        items: [
          {
            title: "Mails",
            url: PageRoutes.MAILS,
            icon: Mail,
            badgeType: "messages",
            description: "Student communications",
          },
        ],
      },
    ],
    management: [
      {
        title: "System Administration",
        items: [
          {
            title: "User Accounts",
            url: PageRoutes.SCHOLARSHIPS_ACCOUNTS,
            icon: ShieldUser,
            description: "Manage user accounts",
          },
        ],
      },
    ],
  },

  scholarshipCoordinator: {
    main: [
      {
        title: "Overview",
        items: [
          {
            title: "Dashboard",
            url: PageRoutes.DASHBOARD,
            icon: LayoutDashboard,
          },
        ],
      },
      {
        title: "Coordination",
        items: [
          {
            title: "Programs",
            url: PageRoutes.SCHOLARSHIPS_PROGRAMS,
            icon: Award,
            description: "Assigned scholarship programs",
          },
          {
            title: "Applications",
            url: PageRoutes.SCHOLARSHIPS_APPLICATIONS,
            icon: FileText,
            badgeType: "applications",
            description: "Review applications",
          },
          {
            title: "Scholars",
            url: PageRoutes.SCHOLARSHIPS_SCHOLARS,
            icon: Users,
            description: "Mentored scholars",
          },
        ],
      },
    ],
    secondary: [
      {
        title: "Communication",
        items: [
          {
            title: "Mails",
            url: PageRoutes.MAILS,
            icon: Mail,
            badgeType: "messages",
            description: "Student communications",
          },
        ],
      },
    ],
  },
};
