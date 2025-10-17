"use client";

import { addLocation } from "@/lib/actions/addLocation";
import { useTransition } from "react";

export default function NewLocationClient({ tripId }: { tripId: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl text-center font-semibold mb-5">
            Add New Location
          </h1>
          <form
            action={(formData: FormData) => {
              startTransition(() => {
                addLocation(formData, tripId);
              });
            }}
            className="space-y-3 flex flex-col"
          >
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              required
              id="address"
              placeholder="Enter the address..."
              className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-3"
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-slate-900 text-sm font-semibold text-white px-2 py-3 mt-4 rounded-2xl hover:scale-105 transition duration-300 hover:bg-slate-800 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {isPending ? "Adding..." : "Add Location"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
