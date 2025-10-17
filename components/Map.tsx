"use client";

import { Location } from "@/app/generated/prisma";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
interface MapProps {
  itineraries: Location[];
  tripId: string;
}

export default function Map({ itineraries, tripId }: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  if (!isLoaded) return <div>Loading Maps...</div>;
  if (loadError) return <div>Error loading maps</div>;
  if (itineraries.length === 0)
    return (
      <div className="font-semibold text-xl w-full h-full border border-gray-200 shadow-lg bg-slate-200 flex flex-col items-center justify-center gap-2">
        Add locations to see them
        <Link href={`/trips/${tripId}/itinerary/new`}>
          <button className="bg-slate-900 flex items-center gap-2 text-white text-sm font-semibold py-2 px-4 rounded-2xl hover:bg-slate-800 hover:scale-105 transition duration-300">
            <PlusIcon />
            <span className="hidden md:block">Add locations</span>
          </button>
        </Link>
      </div>
    );
  const center =
    itineraries.length > 0
      ? { lat: itineraries[0].lat, lng: itineraries[0].lng }
      : { lat: 0, lng: 0 };

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={8}
      center={center}
    >
      {itineraries.map((location) => (
        <Marker
          key={location.id}
          position={{ lat: location.lat, lng: location.lng }}
          title={location.locationTitle}
        />
      ))}
    </GoogleMap>
  );
}
