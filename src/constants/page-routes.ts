export enum PageRoutes {
  /******************************************
   *               PUBLIC ROUTES            *
   ******************************************/
  HOME = "/",
  LOGIN = "/login",
  SIGN_UP = "/signup",
  SCHOLARSHIPS_PUBLIC = "/scholarships",
  SCHOLARSHIP_DETAILS = "/scholarship-details",

  /******************************************
   *                ROUTES                  *
   ******************************************/

  //Global Roles
  DASHBOARD = "/dashboard",
  MAILS = "/mails",
  SETTINGS = "/settings",

  //Admins only
  ACCOUNTS = "/accounts",
  ACCOUNTS_CREATE = `${ACCOUNTS}/create`,

  /******************************************
   *           SCHOLARSHIP ROUTES           *
   ******************************************/

  SCHOLARSHIPS = "/scholarships",

  // Students only
  SCHOLARSHIPS_BROWSE = `${SCHOLARSHIPS}/browse`,

  // Students + Coordinators/Admins (different views)
  SCHOLARSHIPS_APPLICATIONS = `${SCHOLARSHIPS}/applications`,

  // Coordinators + Admins
  SCHOLARSHIPS_PROGRAMS = `${SCHOLARSHIPS}/programs`,
  SCHOLARSHIPS_PROGRAMS_CREATE = `${SCHOLARSHIPS_PROGRAMS}/create`,
  SCHOLARSHIPS_SCHOLARS = `${SCHOLARSHIPS}/scholars`,

  /******************************************
   *            INTERNSHIP ROUTES           *
   ******************************************/

  INTERNSHIPS = "/internships",

  // Admins only
  INTERNSHIPS_COMPANIES = `${INTERNSHIPS}/companies`,
  INTERNSHIPS_DEPARTMENTS = `${INTERNSHIPS}/departments`,
  INTERNSHIPS_SUPERVISORS = `${INTERNSHIPS}/supervisors`,
  INTERNSHIPS_REPORTS = `${INTERNSHIPS}/reports`,

  // Coordinators + Admins
  INTERNSHIPS_MANAGE = `${INTERNSHIPS}/manage-internships`,

  // Students + Coordinators (different views)
  INTERNSHIPS_PROGRESS = `${INTERNSHIPS}/progress`,
  INTERNSHIPS_DOCUMENTS = `${INTERNSHIPS}/documents`,

  // Coordinators only
  INTERNSHIPS_DOCUMENTS_REVIEW = `${INTERNSHIPS}/documents-review`,
  INTERNSHIPS_PROGRESS_MONITOR = `${INTERNSHIPS}/progress-monitor`,
}
