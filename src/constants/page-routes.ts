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

  // Students only
  SCHOLARSHIPS_BROWSE = "/browse",

  // Students + Coordinators/Admins (different views)
  SCHOLARSHIPS_APPLICATIONS = "/applications",

  // Coordinators + Admins
  SCHOLARSHIPS_PROGRAMS = "/programs",
  SCHOLARSHIPS_PROGRAMS_CREATE = `${SCHOLARSHIPS_PROGRAMS}/create`,
  SCHOLARSHIPS_SCHOLARS = "/scholars",

  /******************************************
   *            INTERNSHIP ROUTES           *
   ******************************************/

  // Admins only
  INTERNSHIPS_COMPANIES = "/companies",
  INTERNSHIPS_DEPARTMENTS = "/departments",
  INTERNSHIPS_SUPERVISORS = "/supervisors",
  INTERNSHIPS_REPORTS = "/reports",

  // Coordinators + Admins
  INTERNSHIPS_MANAGE = "/manage-internships",

  // Students + Coordinators (different views)
  INTERNSHIPS_PROGRESS = "/progress",
  INTERNSHIPS_DOCUMENTS = "/documents",

  // Coordinators only
  INTERNSHIPS_DOCUMENTS_REVIEW = `/documents-review`,
  INTERNSHIPS_PROGRESS_MONITOR = `/progress-monitor`,
}
