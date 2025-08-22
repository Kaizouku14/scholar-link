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

  // Students + Coordinators/Admin (different views)
  SCHOLARSHIPS_APPLICATIONS = `${SCHOLARSHIPS}/applications`,

  // Coordinators + Admin
  SCHOLARSHIPS_PROGRAMS = `${SCHOLARSHIPS}/programs`,
  SCHOLARSHIPS_PROGRAMS_CREATE = `${SCHOLARSHIPS_PROGRAMS}/create`,
  SCHOLARSHIPS_SCHOLARS = `${SCHOLARSHIPS}/scholars`,

  //Admin Only
  SCHOLARSHIPS_ACCOUNTS = `${SCHOLARSHIPS}/accounts`,
  SCHOLARSHIPS_ACCOUNTS_CREATE = `${SCHOLARSHIPS_ACCOUNTS}/create`,

  /******************************************
   *            INTERNSHIP ROUTES           *
   ******************************************/

  INTERNSHIPS = "/internship",

  // Admin only
  INTERNSHIPS_COMPANIES = `${INTERNSHIPS}/host-training-establishment`,
  INTERNSHIPS_COMPANIES_CREATE = `${INTERNSHIPS_COMPANIES}/create`,
  INTERNSHIPS_DEPARTMENTS = `${INTERNSHIPS}/departments`,
  INTERNSHIPS_REPORTS = `${INTERNSHIPS}/reports`,
  INTERNSHIPS_ACCOUNTS = `${INTERNSHIPS}/accounts`,
  INTERNSHIPS_ACCOUNTS_CREATE = `${INTERNSHIPS_ACCOUNTS}/create`,

  // Students
  INTERNSHIPS_PROGRESS = `${INTERNSHIPS}/progress`,
  INTERNSHIPS_DOCUMENTS = `${INTERNSHIPS}/documents`,

  // Coordinators only
  INTERNSHIPS_DOCUMENTS_REVIEW = `${INTERNSHIPS}/documents-review`,
  INTERNSHIPS_PROGRESS_MONITOR = `${INTERNSHIPS}/progress-monitor`,
  INTERNSHIP_INTERNS_DOCUMENTS = `${INTERNSHIPS}/documents-list`,

  //Admin & Coordinator
  INTERNSHIP_MANAGE_INTERNSHIPS = `${INTERNSHIPS}/higher-education-institution`,
  INTERNSHIP_INTERNS_CREATE = `${INTERNSHIP_MANAGE_INTERNSHIPS}/create`,
}
