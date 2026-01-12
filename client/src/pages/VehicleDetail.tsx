import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useAuth } from "@/contexts/AuthContext"; 
type Vehicle = {
  _id: string;
  name: string;
  category: string;
  model: string;
  year: number;
  pricePerDay: number;
  seats: number;
  city: string;
  description: string;
  imageUrl?: string;
};

type Driver = {
  _id: string;
  name: string;
  phone: string;
  experienceYears: number;
  rating: number;
  pricePerDay: number;
};

export default function VehicleDetail() {
  const [, params] = useRoute("/vehicle/:id");
  const id = params?.id;

  const { user, isAuthenticated } = useAuth(); // ✅ logged-in user
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [needDriver, setNeedDriver] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await fetch(`/api/vehicle/${id}`);
        if (!res.ok) throw new Error("Vehicle not found");

        const data = await res.json();
        setVehicle(data);

        if (data?.city) {
          const dr = await fetch(`/api/drivers?city=${encodeURIComponent(data.city)}`);
          if (dr.ok) {
            const dlist = await dr.json();
            setDrivers(dlist);
          }
        }
      } catch (err) {
        console.error("Error loading vehicle:", err);
      }
    }

    load();
  }, [id]);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const calcDays = () => {
    if (!startDate || !endDate) return 0;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const days = calcDays();
  const vehicleCost = vehicle ? vehicle.pricePerDay * Math.max(1, days || 1) : 0;
  const driverObj = drivers.find((d) => d._id === selectedDriverId);
  const driverCost =
    needDriver && driverObj ? driverObj.pricePerDay * Math.max(1, days || 1) : 0;
  const total = vehicleCost + driverCost;
  async function handleBooking() {
    if (!vehicle) return;

    const userId = user?._id;

    console.log("🔍 Auth user from context:", user);
console.log("🔍 Stored user from localStorage:", JSON.parse(localStorage.getItem("user")));

    if (!userId || !isAuthenticated) {
      alert("Please log in before booking a vehicle.");
      return;
    }

    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const payload = {
      userId,
      vehicleId: vehicle._id,
      driverId: needDriver ? selectedDriverId : null, // optional
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      totalPrice: total,
    };

    console.log("📦 Booking payload:", payload);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("📬 Booking response:", res.status, data);

      if (res.ok && data.ok) {
        alert("✅ Booking created successfully!");
      } else {
        alert("❌ Booking failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      alert("Something went wrong while booking.");
    }
  }

  if (!id) return <div>Invalid vehicle ID.</div>;
  if (!vehicle) return <div>Loading vehicle details...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{vehicle.name}</h2>
      <p className="text-sm text-gray-700">{vehicle.description}</p>

      {vehicle.imageUrl && (
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          style={{
            width: "400px",
            height: "250px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        />
      )}

      <p className="mt-2">
        Model: {vehicle.model} • Year: {vehicle.year} • Seats: {vehicle.seats}
      </p>
      <p className="text-xl font-bold mt-2">{formatINR(vehicle.pricePerDay)} / day</p>

      <div className="mt-4">
        <label>
          Start date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label className="ml-4">
          End date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {vehicle.category !== "bicycle" && (
        <div className="mt-4">
          <label>
            <input
              type="checkbox"
              checked={needDriver}
              onChange={(e) => setNeedDriver(e.target.checked)}
            />{" "}
            Need a professional driver
          </label>

          {needDriver && (
            <div className="mt-2">
              <p>Select a driver:</p>
              <select
                value={selectedDriverId || ""}
                onChange={(e) => setSelectedDriverId(e.target.value)}
              >
                <option value="">-- Choose a driver --</option>
                {drivers.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name} — {d.experienceYears} yrs — {formatINR(d.pricePerDay)} / day
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 border p-3 rounded-md">
        <p>Days: {days || 1}</p>
        <p>Vehicle cost: {formatINR(vehicleCost)}</p>
        {needDriver && <p>Driver cost: {formatINR(driverCost)}</p>}
        <p className="font-bold">Total: {formatINR(total)}</p>
        <button
          onClick={handleBooking}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
