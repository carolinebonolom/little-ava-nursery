ALTER TABLE `users` MODIFY COLUMN `updatedAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` ADD `password` varchar(255);