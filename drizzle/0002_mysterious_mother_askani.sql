CREATE TABLE `childMilestones` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`area` enum('communication_language','physical_development','personal_social_emotional','literacy','mathematics','understanding_world','expressive_arts') NOT NULL,
	`milestone` varchar(500) NOT NULL,
	`observedDate` timestamp NOT NULL,
	`notes` text,
	`evidenceUrl` varchar(500),
	`recordedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `childMilestones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documentSignatures` (
	`id` int AUTO_INCREMENT NOT NULL,
	`documentId` int NOT NULL,
	`userId` int NOT NULL,
	`signedAt` timestamp,
	`status` enum('pending','signed','declined') NOT NULL DEFAULT 'pending',
	`signatureData` text,
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `documentSignatures_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(300) NOT NULL,
	`description` text,
	`documentUrl` varchar(500),
	`documentType` enum('consent_form','contract','policy','medical_form','photo_permission','trip_permission','employment','other') NOT NULL,
	`createdBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fireDrills` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` timestamp NOT NULL,
	`time` varchar(10),
	`evacuationTime` varchar(50),
	`childrenPresent` int,
	`staffPresent` int,
	`visitorsPresent` int,
	`issues` text,
	`actionRequired` text,
	`conductedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `fireDrills_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `incidents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`type` enum('accident','incident','near_miss','concern') NOT NULL,
	`date` timestamp NOT NULL,
	`time` varchar(10),
	`location` varchar(200),
	`description` text NOT NULL,
	`actionTaken` text,
	`injuries` text,
	`witnessName` varchar(200),
	`reportedBy` int NOT NULL,
	`parentNotified` boolean DEFAULT false,
	`parentNotifiedAt` timestamp,
	`parentSignatureId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `incidents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `medicationLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`medicationName` varchar(200) NOT NULL,
	`dosage` varchar(100) NOT NULL,
	`frequency` varchar(200),
	`reason` text,
	`parentConsentGiven` boolean DEFAULT false,
	`startDate` timestamp NOT NULL,
	`endDate` timestamp,
	`administeredBy` int,
	`administeredAt` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `medicationLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletterSubscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(200),
	`isActive` boolean NOT NULL DEFAULT true,
	`subscribedAt` timestamp NOT NULL DEFAULT (now()),
	`unsubscribedAt` timestamp,
	CONSTRAINT `newsletterSubscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletterSubscribers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `newsletters` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subject` varchar(500) NOT NULL,
	`content` text NOT NULL,
	`sentBy` int,
	`recipientCount` int DEFAULT 0,
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `newsletters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staffTraining` (
	`id` int AUTO_INCREMENT NOT NULL,
	`staffId` int NOT NULL,
	`trainingType` enum('dbs_check','first_aid','paediatric_first_aid','safeguarding','food_hygiene','fire_safety','manual_handling','prevent_duty','health_safety','gdpr','sen_awareness','behaviour_management','other') NOT NULL,
	`title` varchar(300) NOT NULL,
	`provider` varchar(200),
	`completedDate` timestamp NOT NULL,
	`expiryDate` timestamp,
	`certificateUrl` varchar(500),
	`notes` text,
	`status` enum('valid','expiring_soon','expired') NOT NULL DEFAULT 'valid',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `staffTraining_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `visitorLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`visitorName` varchar(200) NOT NULL,
	`organisation` varchar(200),
	`purpose` varchar(300) NOT NULL,
	`personVisiting` varchar(200),
	`signInTime` timestamp NOT NULL DEFAULT (now()),
	`signOutTime` timestamp,
	`dbsChecked` boolean DEFAULT false,
	`badgeIssued` boolean DEFAULT false,
	`signedInBy` int,
	CONSTRAINT `visitorLog_id` PRIMARY KEY(`id`)
);
