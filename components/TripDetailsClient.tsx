"use client";

import { Location, Trip } from "@/app/generated/prisma";
import {
  ArrowBigRightIcon,
  Calendar,
  MapPin,
  Mountain,
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Map from "./Map";
import SortableItinerary from "./SortableItinerary";

export type TripWithLocation = Trip & {
  Location: Location[];
};
interface tripDetailClientProps {
  tripDetails: TripWithLocation;
}

export default function TripDetailsClient({
  tripDetails,
}: tripDetailClientProps) {
  const today = new Date();
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [navSelected, setNavSelected] = useState<
    "overview" | "itinerary" | "map"
  >("overview");
  useEffect(() => {
    setIsUpcoming(tripDetails?.startDate > today);
  }, []);
  const tabs = ["overview", "itinerary", "map"] as const;
  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <div className="flex flex-col mt-10 w-[90%] items-center justify-center  ">
        {tripDetails?.imageUrl && (
          <div className=" w-full my-5  h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative hover:scale-101 hover:shadow-md transition duration-300">
            <Image
              src={tripDetails?.imageUrl}
              alt={tripDetails?.title}
              fill
              className=" object-cover"
            />
          </div>
        )}
        <div className="w-full flex flex-col items-center justify-center my-10 border shadow-md border-gray-200 rounded-lg p-4 gap-2">
          <div className="flex flex-col md:flex-row items-start md:items-center  gap-2 justify-between w-full md:w-[85%] ">
            <h4 className="text-slate-800 text-2xl font-bold text-start">
              {tripDetails?.title}
            </h4>
            <p className="text-slate-600 text-sm flex items-center">
              <Calendar className="inline mr-2" />
              {isUpcoming
                ? "Upcoming" +
                  " - " +
                  new Date(tripDetails?.startDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  }) +
                  " - " +
                  new Date(tripDetails?.endDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })
                : new Date(tripDetails?.startDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  }) +
                  " - " +
                  new Date(tripDetails?.endDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-center gap-2 justify-center w-full md:w-[85%] ">
            {/* <p className="text-slate-600 text-sm">{tripDetails?.description}</p> */}
            <div className=" flex items-center gap-4">
              <p className="text-slate-600 text-sm">
                Add the locations that you
              </p>
              <Link href={`/trips/${tripDetails?.id}/itinerary/new`}>
                <button className="bg-slate-900 flex items-center gap-2 text-white text-sm font-semibold py-2 px-4 rounded-2xl hover:bg-slate-800 hover:scale-105 transition duration-300">
                  <PlusIcon className="w-5 h-5" />
                  {isUpcoming ? "Planned" : "Explored"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* google maps & itinerary*/}
      <div className="w-[90%] flex flex-col items-center justify-center my-5 p-4 gap-2 border border-gray-200 shadow-md rounded-lg">
        <h1 className="text-slate-800 text-2xl font-semibold">Trip Summary</h1>

        <ul className="flex items-center justify-center gap-5 md:gap-10 w-full md:w-[30%] p-4 ">
          {tabs.map((tab) => (
            <li
              key={tab}
              onClick={() => setNavSelected(tab)}
              className={`relative font-semibold text-sm cursor-pointer transition duration-200 
      ${navSelected === tab ? "text-slate-900" : "text-slate-500"}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}

              {navSelected === tab && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-slate-900 rounded-full" />
              )}
            </li>
          ))}
        </ul>
        {/* divider */}
        <div className="w-[90%] h-0.5 bg-gray-200" />
        {navSelected === "overview" && (
          <div className="w-full flex flex-col items-center justify-center my-10  p-4 gap-2">
            <div className="flex items-start gap-2 justify-between w-full md:w-[90%] ">
              <div className="flex flex-col space-y-4">
                <p className="text-slate-600 text-sm flex items-center">
                  <Calendar className="inline mr-2" />
                  {new Date(tripDetails?.startDate).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    }
                  ) +
                    " - " +
                    new Date(tripDetails?.endDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                </p>
                <p className="text-slate-600 text-sm flex items-center">
                  <Mountain className="inline mr-2" />
                  {(new Date(tripDetails?.endDate).getTime() -
                    new Date(tripDetails?.startDate).getTime()) /
                    (1000 * 60 * 60 * 24)}{" "}
                  days
                </p>
                <p>
                  <MapPin className="inline mr-2" />
                  {tripDetails?.Location.length}
                  {tripDetails?.Location.length === 1
                    ? " location"
                    : " locations"}
                </p>
              </div>

              <div className="w-[70%] h-[400px] rounded-2xl overflow-hidden flex items-center justify-center">
                <Map
                  itineraries={tripDetails?.Location}
                  tripId={tripDetails?.id}
                />
              </div>
            </div>
          </div>
        )}
        {navSelected === "itinerary" && (
          <div className="w-[90%] flex flex-col my-10  p-4 gap-2">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl text-slate-800 font-semibold">
                Add the routes
              </h1>
              <Link href={`/trips/${tripDetails?.id}/itinerary/new`}>
                <button className="bg-slate-900 flex items-center gap-2 text-white text-sm font-semibold py-2 px-4 rounded-2xl hover:bg-slate-800 hover:scale-105 transition duration-300">
                  <PlusIcon />
                  <span className="hidden md:block">Add locations</span>
                </button>
              </Link>
            </div>
            {tripDetails?.Location.length === 0 ? (
              <p className="text-xl font-semibold text-center">
                No locations added
              </p>
            ) : (
              <SortableItinerary
                locations={tripDetails?.Location}
                tripId={tripDetails?.id}
              />
            )}
          </div>
        )}
        {navSelected === "map" && (
          <div className="w-full flex flex-col items-center justify-center my-10  p-4 gap-2">
            <div className="w-full h-[400px] mt-3 rounded-2xl overflow-hidden flex items-center justify-center">
              <Map
                itineraries={tripDetails?.Location}
                tripId={tripDetails?.id}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center mb-5">
        <Link href={`/trips`}>
          <button className="bg-slate-900 flex items-center gap-2 text-white text-sm font-semibold py-2 px-4 rounded-2xl hover:bg-slate-800 hover:scale-105 transition duration-300">
            <span>Back to Trips</span>
            <ArrowBigRightIcon />
          </button>
        </Link>
      </div>
    </div>
  );
}
