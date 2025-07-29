export enum PageRoutes {
  /******************************************
   *               PUBLIC ROUTES            *
   ******************************************/
  HOME = "/",
  LOGIN = "/login",
  SIGN_UP = "/signup",
  SETUP = "/setup",
  SCHOLARSHIPS_PUBLIC = "/scholarships",
  SCHOLARSHIP_DETAILS = "/scholarship-details",
  UNAUTHORIZED = "/unauthorized",

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

  SCHOLARSHIPS = "/scholarships",

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

  INTERNSHIPS = "/internships",

  // Admin only
  INTERNSHIPS_COMPANIES = `${INTERNSHIPS}/companies`,
  INTERNSHIPS_DEPARTMENTS = `${INTERNSHIPS}/departments`,
  INTERNSHIP_MANAGE_INTERNSHIPS = `${INTERNSHIPS}/manage-internships`,
  INTERNSHIPS_SUPERVISORS = `${INTERNSHIPS}/supervisors`,
  INTERNSHIPS_REPORTS = `${INTERNSHIPS}/reports`,
  INTERNSHIPS_ACCOUNTS = `${INTERNSHIPS}/accounts`,
  INTERNSHIPS_ACCOUNTS_CREATE = `${INTERNSHIPS_ACCOUNTS}/create`,

  // Students
  INTERNSHIPS_PROGRESS = `${INTERNSHIPS}/progress`,
  INTERNSHIPS_PROGRESS_DETAILS = `${INTERNSHIPS_PROGRESS}/details`,
  INTERNSHIPS_DOCUMENTS = `${INTERNSHIPS}/documents`,

  // Coordinators only
  INTERNSHIPS_INTERNS = ` ${INTERNSHIPS}/interns`,
  INTERNSHIPS_DOCUMENTS_REVIEW = `${INTERNSHIPS}/documents-review`,
  INTERNSHIPS_PROGRESS_MONITOR = `${INTERNSHIPS}/progress-monitor`,
}
