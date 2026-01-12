import React, { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
const API_BASE_URL = "http://localhost:5000/api";

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
};

export default function VehicleCategory() {
  const [, params] = useRoute("/vehicles/:category");
  const category = params?.category;

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const query = category
          ? `?category=${encodeURIComponent(category)}`
          : "";
        const res = await fetch(`${API_BASE_URL}/vehicles${query}`);

        if (!res.ok) throw new Error("Failed to fetch vehicles");
        const data = await res.json();
        setVehicles(data);
      } catch (err) {
        console.error("Error loading vehicles:", err);
      }
    }
    load();
  }, [category]);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {category ? category.toUpperCase() : "All Vehicles"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div
            key={v._id}
            className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{v.name}</h3>
              <div className="text-lg font-bold text-green-700">
                {formatINR(v.pricePerDay)}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Model: {v.model} • Year: {v.year}
            </p>
            <p className="text-sm">Seats: {v.seats}</p>
            <p className="text-sm">City: {v.city}</p>
            <p className="mt-2 text-sm">{v.description}</p>

            <div className="mt-3 flex gap-2">
              <Link
                href={`/vehicle/${v._id}`}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>

      {vehicles.length === 0 && (
        <div className="mt-6 text-gray-600">
          No vehicles found for rent in this category.
        </div>
      )}
    </div>
  );
}
