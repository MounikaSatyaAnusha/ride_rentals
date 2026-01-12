import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Vehicle categories
export type VehicleCategory = "car" | "bike" | "truck" | "bus" | "bicycle";

// Vehicles table
export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(), // car, bike, truck, bus, bicycle
  model: text("model").notNull(),
  year: integer("year").notNull(),
  pricePerDay: integer("price_per_day").notNull(), // in dollars
  transmission: text("transmission"), // automatic, manual
  fuelType: text("fuel_type"), // petrol, diesel, electric, hybrid
  seats: integer("seats"),
  description: text("description"),
  features: text("features").array(), // array of feature strings
  imageUrl: text("image_url").notNull(),
  available: boolean("available").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
  createdAt: true,
});

export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;

// Drivers table
export const drivers = pgTable("drivers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  experienceYears: integer("experience_years").notNull(),
  rating: integer("rating").notNull().default(5), // 1-5 stars
  languages: text("languages").array().notNull(),
  specialty: text("specialty").notNull(), // city, highway, long-distance
  licenseNumber: text("license_number").notNull(),
  pricePerDay: integer("price_per_day").notNull(), // in dollars
  imageUrl: text("image_url"),
  available: boolean("available").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDriverSchema = createInsertSchema(drivers).omit({
  id: true,
  createdAt: true,
});

export type InsertDriver = z.infer<typeof insertDriverSchema>;
export type Driver = typeof drivers.$inferSelect;

// Bookings table
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  vehicleId: varchar("vehicle_id").notNull().references(() => vehicles.id),
  driverId: varchar("driver_id").references(() => drivers.id), // optional
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  totalDays: integer("total_days").notNull(),
  vehicleCost: integer("vehicle_cost").notNull(),
  driverCost: integer("driver_cost").default(0).notNull(),
  totalCost: integer("total_cost").notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled, completed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Contact submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
