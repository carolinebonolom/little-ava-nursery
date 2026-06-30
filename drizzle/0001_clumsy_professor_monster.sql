CREATE TABLE `absences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`parentId` int NOT NULL,
	`absenceDate` timestamp NOT NULL,
	`reason` enum('illness','holiday','appointment','family','other') NOT NULL,
	`details` text,
	`acknowledged` boolean NOT NULL DEFAULT false,
	`acknowledgedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `absences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `activityLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`staffId` int NOT NULL,
	`type` enum('meal','drink','nappy','nap','activity','milestone','note') NOT NULL,
	`description` text,
	`details` json,
	`loggedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activityLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `attendance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`date` timestamp NOT NULL,
	`checkInTime` timestamp,
	`checkOutTime` timestamp,
	`checkedInBy` int,
	`checkedOutBy` int,
	`status` enum('present','absent','late') NOT NULL DEFAULT 'present',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `attendance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `children` (
	`id` int AUTO_INCREMENT NOT NULL,
	`parentId` int NOT NULL,
	`roomId` int,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`dateOfBirth` timestamp NOT NULL,
	`gender` enum('male','female','other'),
	`allergies` text,
	`medicalInfo` text,
	`dietaryRequirements` text,
	`emergencyContact` varchar(200),
	`emergencyPhone` varchar(20),
	`photoUrl` text,
	`status` enum('active','waitlisted','inactive') NOT NULL DEFAULT 'active',
	`startDate` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `children_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contactMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`subject` varchar(300),
	`message` text NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contactMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `galleryPhotos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int,
	`uploadedBy` int NOT NULL,
	`imageUrl` text NOT NULL,
	`imageKey` varchar(500) NOT NULL,
	`caption` text,
	`isPublic` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `galleryPhotos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(300) NOT NULL,
	`content` text NOT NULL,
	`type` enum('news','event','announcement') NOT NULL DEFAULT 'news',
	`imageUrl` text,
	`eventDate` timestamp,
	`isPublished` boolean NOT NULL DEFAULT true,
	`authorId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `newsEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(300) NOT NULL,
	`message` text NOT NULL,
	`type` enum('activity','session','absence','news','announcement','general') NOT NULL DEFAULT 'general',
	`isRead` boolean NOT NULL DEFAULT false,
	`link` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`ageRangeMin` int NOT NULL,
	`ageRangeMax` int NOT NULL,
	`capacity` int NOT NULL,
	`staffRatio` varchar(10) NOT NULL,
	`description` text,
	`color` varchar(7),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `rooms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`parentId` int NOT NULL,
	`roomId` int,
	`sessionDate` timestamp NOT NULL,
	`sessionType` enum('full_day','morning','afternoon','ad_hoc') NOT NULL,
	`status` enum('pending','confirmed','cancelled','completed') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staffProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(100),
	`bio` text,
	`qualifications` text,
	`photoUrl` text,
	`roomId` int,
	`startDate` timestamp,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `staffProfiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `visitBookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`parentName` varchar(200) NOT NULL,
	`parentEmail` varchar(320) NOT NULL,
	`parentPhone` varchar(20),
	`childAge` varchar(50),
	`preferredDate` timestamp,
	`preferredTime` varchar(50),
	`message` text,
	`status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `visitBookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `waitingList` (
	`id` int AUTO_INCREMENT NOT NULL,
	`parentName` varchar(200) NOT NULL,
	`parentEmail` varchar(320) NOT NULL,
	`parentPhone` varchar(20),
	`childName` varchar(200) NOT NULL,
	`childDob` timestamp NOT NULL,
	`preferredStartDate` timestamp,
	`preferredSessions` varchar(200),
	`notes` text,
	`status` enum('waiting','offered','accepted','declined') NOT NULL DEFAULT 'waiting',
	`position` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `waitingList_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','staff','parent') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);