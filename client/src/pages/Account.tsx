import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

type Booking = {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  vehicleId: {
    name: string;
    model: string;
    imageUrl?: string;
  };
  driverId?: {
    name: string;
  } | null;
};

export default function Account() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    async function loadBookings() {
      try {
        const res = await fetch(`/api/bookings/${user._id}`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error loading bookings:", err);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, [user]);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  if (loading) return <div className="p-6">Loading your bookings...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Account</h2>

      <div className="mb-6">
        <p>
          <strong>Username:</strong> {user?.username}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-3">My Bookings</h3>

      {bookings.length === 0 ? (
        <p>No bookings yet. Go to <a href="/vehicles" className="text-blue-600">Vehicles</a> to rent one!</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div
  key={b._id}
  className="border rounded-lg p-4 shadow-sm flex gap-4 transition-colors
             bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
>

              {b.vehicleId?.imageUrl && (
                <img
                  src={b.vehicleId.imageUrl}
                  alt={b.vehicleId.name}
                  className="w-32 h-20 object-cover rounded-md"
                />
              )}

              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{b.vehicleId?.name}</h4>
                <p className="text-gray-700 dark:text-gray-300">Model: {b.vehicleId?.model}</p>
                {b.driverId && (
                    <p className="text-gray-700 dark:text-gray-300">Driver: {b.driverId.name}</p>
                )}
                <p className="text-gray-700 dark:text-gray-300">
                    Duration: {new Date(b.startDate).toLocaleDateString()} –{" "}
                {new Date(b.endDate).toLocaleDateString()}
                </p>
                <p className="font-semibold text-green-700 dark:text-green-400">
                     Total: {formatINR(b.totalPrice)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
