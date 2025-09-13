export enum PageRoutes {
  /******************************************
   *               PUBLIC ROUTES            *
   ******************************************/
  HOME = "/",
  SCHOLARSHIPS_PUBLIC = "/scholarships",
  SCHOLARSHIP_DETAILS = "/scholarship-details",
  UNAUTHORIZED = "/unauthorized",

  //Auth
  LOGIN = "/login",
  SIGN_UP = "/signup",
  SETUP = "/setup",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",

  /******************************************
   *                ROUTES                  *
   ******************************************/

  //Global Roles
  DASHBOARD = "/dashboard",
  MAILS = "/mails",
  SETTINGS = "/settings",

  /******************************************
   *           SCHOLARSHIP ROUTES           *
   ******************************************/

  SCHOLARSHIPS = "/scholarship",

  // Students only
  SCHOLARSHIPS_BROWSE = `${SCHOLARSHIPS}/browse`,
  SCHOLARSHIP_MY_APPLICATIONS = `${SCHOLARSHIPS}/my-applications`,

  // Coordinators only
  SCHOLARSHIPS_APPLICATIONS = `${SCHOLARSHIPS}/applications`,
  //Program
  SCHOLARSHIPS_PROGRAMS = `${SCHOLARSHIPS}/programs`,
  SCHOLARSHIPS_PROGRAMS_CREATE = `${SCHOLARSHIPS_PROGRAMS}/create`,
  SCHOLARSHIPS_PROGRAMS_DETAILS = `${SCHOLARSHIPS_PROGRAMS}/details`,

  SCHOLARSHIPS_SCHOLARS = `${SCHOLARSHIPS}/scholars`,

  //Admin Only
  SCHOLARSHIPS_ACCOUNTS = `${SCHOLARSHIPS}/accounts`,
  SCHOLARSHIPS_ACCOUNTS_CREATE = `${SCHOLARSHIPS_ACCOUNTS}/create`,

  /******************************************
   *            INTERNSHIP ROUTES           *
   ******************************************/

  INTERNSHIPS = "/internship",

  // Admin only
  INTERNSHIP_ADMIN_MANAGE_INTERNSHIPS = `${INTERNSHIPS}/higher-education-institutions/admin`,
  INTERNSHIPS_COMPANIES = `${INTERNSHIPS}/host-training-establishments`,
  INTERNSHIPS_COMPANIES_CREATE = `${INTERNSHIPS_COMPANIES}/create`,
  INTERNSHIPS_DEPARTMENTS = `${INTERNSHIPS}/departments`,
  INTERNSHIPS_REPORTS = `${INTERNSHIPS}/reports`,
  INTERNSHIPS_MOAS = `${INTERNSHIPS}/moa`,

  // Students
  INTERNSHIPS_PROGRESS = `${INTERNSHIPS}/progress`,
  INTERNSHIPS_DOCUMENTS = `${INTERNSHIPS}/documents`,

  // Coordinators only
  INTERNSHIPS_DOCUMENTS_REVIEW = `${INTERNSHIPS}/documents-review`,
  INTERNSHIPS_PROGRESS_MONITOR = `${INTERNSHIPS}/progress-monitor`,
  INTERNSHIP_INTERNS_DOCUMENTS = `${INTERNSHIPS}/documents-list`,

  //Admin & Coordinator
  INTERNSHIP_COORDINATION_MANAGE_INTERNSHIPS = `${INTERNSHIPS}/higher-education-institutions/coordination`,
  INTERNSHIP_INTERNS_CREATE = `${INTERNSHIP_COORDINATION_MANAGE_INTERNSHIPS}/create`,
  INTERNSHIPS_ACCOUNTS = `${INTERNSHIPS}/accounts`,
  INTERNSHIPS_ACCOUNTS_CREATE = `${INTERNSHIPS_ACCOUNTS}/create`,
}

export const ROUTE_LABELS: Record<string, string> = {
  // Scholarships
  "/scholarship/browse": "Browse",
  "/scholarship/my-applications": "My Applications",
  "/scholarship/applications": "Applications",
  "/scholarship/programs": "Programs",
  "/scholarship/programs/create": "Create Program",
  "/scholarship/scholars": "Scholars",
  "/scholarship/accounts": "Accounts",
  "/scholarship/accounts/create": "Create Account",

  // Internships
  "/internship/host-training-establishments": "Companies",
  "/internship/host-training-establishment/create": "Create Company",
  "/internship/departments": "Departments",
  "/internship/reports": "Reports",
  "/internship/accounts": "Accounts",
  "/internship/accounts/create": "Create Account",
  "/internship/progress": "Progress",
  "/internship/documents": "Documents",
  "/internship/documents-review": "Documents Review",
  "/internship/progress-monitor": "Progress Monitor",
  "/internship/documents-list": "Intern Documents",
  "/internship/higher-education-institutions": "Higher Education Institutions",
  "/internship/admin": "Manage Internships",
  "/internship/coordination": "Manage Internships",
  "/internship/higher-education-institution/create": "Create Internship",
};
