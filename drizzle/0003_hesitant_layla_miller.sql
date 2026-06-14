CREATE TABLE `emergencyContacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`name` varchar(200) NOT NULL,
	`relationship` varchar(100) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`email` varchar(320),
	`address` text,
	`priority` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `emergencyContacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `enquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`childAge` varchar(50),
	`message` text,
	`status` enum('new','contacted','interested','registered','not_interested','closed') NOT NULL DEFAULT 'new',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `enquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `occupancyLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roomId` int NOT NULL,
	`date` timestamp NOT NULL,
	`childrenPresent` int NOT NULL,
	`capacity` int NOT NULL,
	`occupancyPercentage` int NOT NULL,
	`recordedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `occupancyLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staffShifts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`staffId` int NOT NULL,
	`date` timestamp NOT NULL,
	`startTime` varchar(10) NOT NULL,
	`endTime` varchar(10) NOT NULL,
	`roomId` int,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `staffShifts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `surveys` (
	`id` int AUTO_INCREMENT NOT NULL,
	`parentId` int NOT NULL,
	`childId` int,
	`rating` int NOT NULL,
	`category` enum('communication','activities','meals','cleanliness','staff','overall') NOT NULL,
	`comments` text,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `surveys_id` PRIMARY KEY(`id`)
);
