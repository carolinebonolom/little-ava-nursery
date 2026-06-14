import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

// ==================== USERS ====================
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "staff", "parent"]).default("user").notNull(),
  phone: varchar("phone", { length: 20 }),
  password: varchar("password", { length: 255 }),
  roomId: int("roomId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ==================== ROOMS ====================
export const rooms = mysqlTable("rooms", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  ageRangeMin: int("ageRangeMin").notNull(), // in months
  ageRangeMax: int("ageRangeMax").notNull(), // in months
  capacity: int("capacity").notNull(),
  staffRatio: varchar("staffRatio", { length: 10 }).notNull(), // e.g. "1:3"
  description: text("description"),
  color: varchar("color", { length: 7 }), // hex color for UI
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Room = typeof rooms.$inferSelect;
export type InsertRoom = typeof rooms.$inferInsert;

// ==================== CHILDREN ====================
export const children = mysqlTable("children", {
  id: int("id").autoincrement().primaryKey(),
  parentId: int("parentId").notNull(),
  roomId: int("roomId"),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  dateOfBirth: timestamp("dateOfBirth").notNull(),
  gender: mysqlEnum("gender", ["male", "female", "other"]),
  allergies: text("allergies"),
  medicalInfo: text("medicalInfo"),
  dietaryRequirements: text("dietaryRequirements"),
  emergencyContact: varchar("emergencyContact", { length: 200 }),
  emergencyPhone: varchar("emergencyPhone", { length: 20 }),
  parentEmail: varchar("parentEmail", { length: 320 }),
  photoUrl: text("photoUrl"),
  status: mysqlEnum("status", ["active", "waitlisted", "inactive"]).default("active").notNull(),
  startDate: timestamp("startDate"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Child = typeof children.$inferSelect;
export type InsertChild = typeof children.$inferInsert;

// ==================== STAFF PROFILES ====================
export const staffProfiles = mysqlTable("staffProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 100 }),
  bio: text("bio"),
  qualifications: text("qualifications"),
  photoUrl: text("photoUrl"),
  roomId: int("roomId"),
  startDate: timestamp("startDate"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StaffProfile = typeof staffProfiles.$inferSelect;
export type InsertStaffProfile = typeof staffProfiles.$inferInsert;

// ==================== ACTIVITY LOG ====================
export const activityLog = mysqlTable("activityLog", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  staffId: int("staffId").notNull(),
  type: mysqlEnum("type", ["meal", "drink", "nappy", "nap", "activity", "milestone", "note"]).notNull(),
  description: text("description"),
  details: json("details"), // flexible JSON for type-specific data
  loggedAt: timestamp("loggedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ActivityLogEntry = typeof activityLog.$inferSelect;
export type InsertActivityLogEntry = typeof activityLog.$inferInsert;

// ==================== SESSIONS / BOOKINGS ====================
export const sessions = mysqlTable("sessions", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  parentId: int("parentId").notNull(),
  roomId: int("roomId"),
  sessionDate: timestamp("sessionDate").notNull(),
  sessionType: mysqlEnum("sessionType", ["full_day", "morning", "afternoon", "ad_hoc"]).notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled", "completed"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;

// ==================== WAITING LIST ====================
export const waitingList = mysqlTable("waitingList", {
  id: int("id").autoincrement().primaryKey(),
  parentName: varchar("parentName", { length: 200 }).notNull(),
  parentEmail: varchar("parentEmail", { length: 320 }).notNull(),
  parentPhone: varchar("parentPhone", { length: 20 }),
  childName: varchar("childName", { length: 200 }).notNull(),
  childDob: timestamp("childDob").notNull(),
  preferredStartDate: timestamp("preferredStartDate"),
  preferredSessions: varchar("preferredSessions", { length: 200 }),
  notes: text("notes"),
  status: mysqlEnum("status", ["waiting", "offered", "accepted", "declined"]).default("waiting").notNull(),
  position: int("position"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WaitingListEntry = typeof waitingList.$inferSelect;
export type InsertWaitingListEntry = typeof waitingList.$inferInsert;

// ==================== ABSENCES ====================
export const absences = mysqlTable("absences", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  parentId: int("parentId").notNull(),
  absenceDate: timestamp("absenceDate").notNull(),
  reason: mysqlEnum("reason", ["illness", "holiday", "appointment", "family", "other"]).notNull(),
  details: text("details"),
  acknowledged: boolean("acknowledged").default(false).notNull(),
  acknowledgedBy: int("acknowledgedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Absence = typeof absences.$inferSelect;
export type InsertAbsence = typeof absences.$inferInsert;

// ==================== VISIT BOOKINGS ====================
export const visitBookings = mysqlTable("visitBookings", {
  id: int("id").autoincrement().primaryKey(),
  parentName: varchar("parentName", { length: 200 }).notNull(),
  parentEmail: varchar("parentEmail", { length: 320 }).notNull(),
  parentPhone: varchar("parentPhone", { length: 20 }),
  childAge: varchar("childAge", { length: 50 }),
  preferredDate: timestamp("preferredDate"),
  preferredTime: varchar("preferredTime", { length: 50 }),
  message: text("message"),
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VisitBooking = typeof visitBookings.$inferSelect;
export type InsertVisitBooking = typeof visitBookings.$inferInsert;

// ==================== NEWS & EVENTS ====================
export const newsEvents = mysqlTable("newsEvents", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  content: text("content").notNull(),
  type: mysqlEnum("type", ["news", "event", "announcement"]).default("news").notNull(),
  imageUrl: text("imageUrl"),
  eventDate: timestamp("eventDate"),
  isPublished: boolean("isPublished").default(true).notNull(),
  authorId: int("authorId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NewsEvent = typeof newsEvents.$inferSelect;
export type InsertNewsEvent = typeof newsEvents.$inferInsert;

// ==================== GALLERY ====================
export const galleryPhotos = mysqlTable("galleryPhotos", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId"), // null = public gallery
  uploadedBy: int("uploadedBy").notNull(),
  imageUrl: text("imageUrl").notNull(),
  imageKey: varchar("imageKey", { length: 500 }).notNull(),
  caption: text("caption"),
  isPublic: boolean("isPublic").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GalleryPhoto = typeof galleryPhotos.$inferSelect;
export type InsertGalleryPhoto = typeof galleryPhotos.$inferInsert;

// ==================== NOTIFICATIONS ====================
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  message: text("message").notNull(),
  type: mysqlEnum("type", ["activity", "session", "absence", "news", "announcement", "general"]).default("general").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  link: varchar("link", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

// ==================== ATTENDANCE ====================
export const attendance = mysqlTable("attendance", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  date: timestamp("date").notNull(),
  checkInTime: timestamp("checkInTime"),
  checkOutTime: timestamp("checkOutTime"),
  checkedInBy: int("checkedInBy"),
  checkedOutBy: int("checkedOutBy"),
  status: mysqlEnum("status", ["present", "absent", "late"]).default("present").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = typeof attendance.$inferInsert;

// ==================== CONTACT MESSAGES ====================
export const contactMessages = mysqlTable("contactMessages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 300 }),
  message: text("message").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

// ==================== NEWSLETTER SUBSCRIBERS ====================
export const newsletterSubscribers = mysqlTable("newsletterSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 200 }),
  isActive: boolean("isActive").default(true).notNull(),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
});
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

// ==================== NEWSLETTERS (SENT) ====================
export const newsletters = mysqlTable("newsletters", {
  id: int("id").autoincrement().primaryKey(),
  subject: varchar("subject", { length: 500 }).notNull(),
  content: text("content").notNull(),
  sentBy: int("sentBy"),
  recipientCount: int("recipientCount").default(0),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
});
export type Newsletter = typeof newsletters.$inferSelect;

// ==================== STAFF TRAINING & COMPLIANCE ====================
export const staffTraining = mysqlTable("staffTraining", {
  id: int("id").autoincrement().primaryKey(),
  staffId: int("staffId").notNull(),
  trainingType: mysqlEnum("trainingType", [
    "dbs_check", "first_aid", "paediatric_first_aid", "safeguarding",
    "food_hygiene", "fire_safety", "manual_handling", "prevent_duty",
    "health_safety", "gdpr", "sen_awareness", "behaviour_management", "other"
  ]).notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  provider: varchar("provider", { length: 200 }),
  completedDate: timestamp("completedDate").notNull(),
  expiryDate: timestamp("expiryDate"),
  certificateUrl: varchar("certificateUrl", { length: 500 }),
  notes: text("notes"),
  status: mysqlEnum("status", ["valid", "expiring_soon", "expired"]).default("valid").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type StaffTraining = typeof staffTraining.$inferSelect;

// ==================== DOCUMENTS (for signing) ====================
export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  description: text("description"),
  documentUrl: varchar("documentUrl", { length: 500 }),
  documentType: mysqlEnum("documentType", [
    "consent_form", "contract", "policy", "medical_form",
    "photo_permission", "trip_permission", "employment", "other"
  ]).notNull(),
  createdBy: int("createdBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Document = typeof documents.$inferSelect;

// ==================== DOCUMENT SIGNATURES ====================
export const documentSignatures = mysqlTable("documentSignatures", {
  id: int("id").autoincrement().primaryKey(),
  documentId: int("documentId").notNull(),
  userId: int("userId").notNull(),
  signedAt: timestamp("signedAt"),
  status: mysqlEnum("status", ["pending", "signed", "declined"]).default("pending").notNull(),
  signatureData: text("signatureData"), // base64 signature image
  sentAt: timestamp("sentAt").defaultNow().notNull(),
});
export type DocumentSignature = typeof documentSignatures.$inferSelect;

// ==================== INCIDENTS & ACCIDENTS ====================
export const incidents = mysqlTable("incidents", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  type: mysqlEnum("type", ["accident", "incident", "near_miss", "concern"]).notNull(),
  date: timestamp("date").notNull(),
  time: varchar("time", { length: 10 }),
  location: varchar("location", { length: 200 }),
  description: text("description").notNull(),
  actionTaken: text("actionTaken"),
  injuries: text("injuries"),
  witnessName: varchar("witnessName", { length: 200 }),
  reportedBy: int("reportedBy").notNull(),
  parentNotified: boolean("parentNotified").default(false),
  parentNotifiedAt: timestamp("parentNotifiedAt"),
  parentSignatureId: int("parentSignatureId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Incident = typeof incidents.$inferSelect;

// ==================== MEDICATION LOG ====================
export const medicationLog = mysqlTable("medicationLog", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  medicationName: varchar("medicationName", { length: 200 }).notNull(),
  dosage: varchar("dosage", { length: 100 }).notNull(),
  frequency: varchar("frequency", { length: 200 }),
  reason: text("reason"),
  parentConsentGiven: boolean("parentConsentGiven").default(false),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  administeredBy: int("administeredBy"),
  administeredAt: timestamp("administeredAt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type MedicationLog = typeof medicationLog.$inferSelect;

// ==================== VISITOR SIGN-IN ====================
export const visitorLog = mysqlTable("visitorLog", {
  id: int("id").autoincrement().primaryKey(),
  visitorName: varchar("visitorName", { length: 200 }).notNull(),
  organisation: varchar("organisation", { length: 200 }),
  purpose: varchar("purpose", { length: 300 }).notNull(),
  personVisiting: varchar("personVisiting", { length: 200 }),
  signInTime: timestamp("signInTime").defaultNow().notNull(),
  signOutTime: timestamp("signOutTime"),
  dbsChecked: boolean("dbsChecked").default(false),
  badgeIssued: boolean("badgeIssued").default(false),
  signedInBy: int("signedInBy"),
});
export type VisitorLog = typeof visitorLog.$inferSelect;

// ==================== FIRE DRILLS ====================
export const fireDrills = mysqlTable("fireDrills", {
  id: int("id").autoincrement().primaryKey(),
  date: timestamp("date").notNull(),
  time: varchar("time", { length: 10 }),
  evacuationTime: varchar("evacuationTime", { length: 50 }),
  childrenPresent: int("childrenPresent"),
  staffPresent: int("staffPresent"),
  visitorsPresent: int("visitorsPresent"),
  issues: text("issues"),
  actionRequired: text("actionRequired"),
  conductedBy: int("conductedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type FireDrill = typeof fireDrills.$inferSelect;

// ==================== CHILD MILESTONES ====================
export const childMilestones = mysqlTable("childMilestones", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  area: mysqlEnum("area", [
    "communication_language", "physical_development", "personal_social_emotional",
    "literacy", "mathematics", "understanding_world", "expressive_arts"
  ]).notNull(),
  milestone: varchar("milestone", { length: 500 }).notNull(),
  observedDate: timestamp("observedDate").notNull(),
  notes: text("notes"),
  evidenceUrl: varchar("evidenceUrl", { length: 500 }),
  recordedBy: int("recordedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type ChildMilestone = typeof childMilestones.$inferSelect;


// ==================== STAFF SHIFTS ====================
export const staffShifts = mysqlTable("staffShifts", {
  id: int("id").autoincrement().primaryKey(),
  staffId: int("staffId").notNull(),
  date: timestamp("date").notNull(),
  startTime: varchar("startTime", { length: 10 }).notNull(), // HH:MM
  endTime: varchar("endTime", { length: 10 }).notNull(), // HH:MM
  roomId: int("roomId"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type StaffShift = typeof staffShifts.$inferSelect;

// ==================== PARENT SURVEYS ====================
export const surveys = mysqlTable("surveys", {
  id: int("id").autoincrement().primaryKey(),
  parentId: int("parentId").notNull(),
  childId: int("childId"),
  rating: int("rating").notNull(), // 1-5
  category: mysqlEnum("category", ["communication", "activities", "meals", "cleanliness", "staff", "overall"]).notNull(),
  comments: text("comments"),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
});
export type Survey = typeof surveys.$inferSelect;

// ==================== ENQUIRIES ====================
export const enquiries = mysqlTable("enquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  childAge: varchar("childAge", { length: 50 }),
  message: text("message"),
  status: mysqlEnum("status", ["new", "contacted", "interested", "registered", "not_interested", "closed"]).default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Enquiry = typeof enquiries.$inferSelect;

// ==================== EMERGENCY CONTACTS ====================
export const emergencyContacts = mysqlTable("emergencyContacts", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  relationship: varchar("relationship", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }),
  address: text("address"),
  priority: int("priority").default(1).notNull(), // 1 = primary, 2 = secondary, etc
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type EmergencyContact = typeof emergencyContacts.$inferSelect;

// ==================== OCCUPANCY LOG ====================
export const occupancyLog = mysqlTable("occupancyLog", {
  id: int("id").autoincrement().primaryKey(),
  roomId: int("roomId").notNull(),
  date: timestamp("date").notNull(),
  childrenPresent: int("childrenPresent").notNull(),
  capacity: int("capacity").notNull(),
  occupancyPercentage: int("occupancyPercentage").notNull(),
  recordedAt: timestamp("recordedAt").defaultNow().notNull(),
});
export type OccupancyLog = typeof occupancyLog.$inferSelect;
