CREATE TABLE `ls_account` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`expires_at` integer,
	`password` text,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `ls_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ls_authorized_email` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ls_authorized_email_email_unique` ON `ls_authorized_email` (`email`);--> statement-breakpoint
CREATE TABLE `ls_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`ipAddress` text,
	`user_agent` text,
	FOREIGN KEY (`user_id`) REFERENCES `ls_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ls_session_token_unique` ON `ls_session` (`token`);--> statement-breakpoint
CREATE TABLE `ls_student` (
	`id` text NOT NULL,
	`student_number` text,
	`section` text,
	`year_level` text,
	FOREIGN KEY (`id`) REFERENCES `ls_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ls_student_student_number_unique` ON `ls_student` (`student_number`);--> statement-breakpoint
CREATE TABLE `ls_user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`surname` text,
	`middle_name` text,
	`email` text,
	`profile_picture` text,
	`contact` text,
	`address` text,
	`gender` text,
	`course` text,
	`department` text,
	`role` text,
	`email_verified` integer,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ls_user_email_unique` ON `ls_user` (`email`);--> statement-breakpoint
CREATE TABLE `ls_verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ls_company` (
	`company_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`contact_person` text NOT NULL,
	`contact_no` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ls_department` (
	`department_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`head_of_department` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ls_interns` (
	`interns_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`internship_id` text NOT NULL,
	`application_date` integer NOT NULL,
	`approval_status` text NOT NULL,
	`completed_hours` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `ls_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ls_internship` (
	`internship_id` text PRIMARY KEY NOT NULL,
	`company_id` text NOT NULL,
	`department_id` text NOT NULL,
	`supervisor_id` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`total_of_hours_required` integer NOT NULL,
	`status` text NOT NULL,
	FOREIGN KEY (`company_id`) REFERENCES `ls_company`(`company_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`department_id`) REFERENCES `ls_department`(`department_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`supervisor_id`) REFERENCES `ls_supervisor`(`supervisor_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ls_submissions` (
	`submissions` text PRIMARY KEY NOT NULL,
	`applicant_id` text NOT NULL,
	`submitted_at` integer NOT NULL,
	`submission_data` text,
	`review_notes` text,
	FOREIGN KEY (`applicant_id`) REFERENCES `ls_applicants`(`applicant_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ls_supervisor` (
	`supervisor_id` text PRIMARY KEY NOT NULL,
	`company_id` text NOT NULL,
	`name` text NOT NULL,
	`position` text NOT NULL,
	`email` text NOT NULL,
	`contact_no` text NOT NULL,
	FOREIGN KEY (`company_id`) REFERENCES `ls_company`(`company_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ls_mail` (
	`id` text PRIMARY KEY NOT NULL,
	`sender_id` text NOT NULL,
	`sender_name` text NOT NULL,
	`sender_email` text NOT NULL,
	`sender_profile` text,
	`receiver_id` text NOT NULL,
	`subject` text NOT NULL,
	`content` text NOT NULL,
	`date` integer NOT NULL,
	`is_read` integer DEFAULT false,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`sender_id`) REFERENCES `ls_user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`receiver_id`) REFERENCES `ls_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ls_applicants` (
	`applicant_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`program_id` text NOT NULL,
	`appliedAt` integer NOT NULL,
	`status` text DEFAULT 'pending',
	FOREIGN KEY (`user_id`) REFERENCES `ls_user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`program_id`) REFERENCES `ls_programs`(`program_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ls_programs` (
	`program_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`slots` integer NOT NULL,
	`location` text NOT NULL,
	`type` text NOT NULL,
	`submission_type` text DEFAULT 'online' NOT NULL,
	`image_url` text,
	`image_key` text,
	`is_active` integer DEFAULT false NOT NULL,
	`deadline` integer NOT NULL,
	`requirements` text,
	`additional_info` text
);
