import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true }, // store hash, not plain password
  phone: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const vehicleSchema = new mongoose.Schema({
  name: String,
  category: String,
  model: String,
  year: Number,
  pricePerDay: Number,
  transmission: String,
  fuelType: String,
  seats: Number,
  description: String,
  city: String,
  imageUrl: String,
  available: { type: Boolean, default: true }
});

const driverSchema = new mongoose.Schema({
  name: String,
  phone: String,
  experienceYears: Number,
  rating: Number,
  languages: [String],
  specialty: String,
  licenseNumber: String,
  pricePerDay: Number,
  city: String,
  available: { type: Boolean, default: true }
});

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", default: null },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const Vehicle = mongoose.model("Vehicle", vehicleSchema);
const Driver = mongoose.model("Driver", driverSchema);
const Booking = mongoose.model("Booking", bookingSchema);

export { User, Vehicle, Driver, Booking };
