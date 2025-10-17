"use client";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface TransformedLocation {
  lat: number;
  lng: number;
  country: string;
}
export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [visitedCountries, setVisitedCountries] = useState<Set<string>>();
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<TransformedLocation[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("/api/trips");
        const data = await res.json();
        const countries = new Set<string>(
          data.map((loc: TransformedLocation) => loc.country)
        );
        console.log(countries);
        setVisitedCountries(countries);
        setLocations(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (globeRef.current) {
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.7;
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gradient-to-b from-gray-100 to-slate-200 space-y-3 w-full">
      <h1 className="text-2xl font-semibold mt-5">Your Travel Journey</h1>
      <h2 className="text-gray-500 text-sm mb-4">See where you've been</h2>
      <div className="flex flex-col lg:flex-row mt-5 w-[80%] gap-5">
        <div className="flex flex-col w-full items-center justify-center bg-white p-4 rounded-xl border border-gray-300 shadow-lg overflow-hidden">
          <div className="h-[500px] w-[60%] flex items-center justify-center relative">
            {isLoading ? (
              <div className="flex items-center w-[60%] justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                // backgroundColor="rgba(0,0,0,0)"
                pointColor={() => "#ff5733"}
                pointLabel="name"
                pointRadius={0.5}
                pointAltitude={0.1}
                pointsMerge={true}
                pointsData={locations}
              />
            )}
          </div>
        </div>
        <div className=" flex flex-col relative gap-3 w-[80%] mb-10">
          <h1 className="text-xl text-start font-semibold ">
            Countries Visited
          </h1>
          <div className=" border shadow-md border-blue-200 rounded-lg p-4 bg-blue-100 max-w-md text-blue-600">
            <p className="text-sm ">
              You've visited{" "}
              <span className="font-bold">
                {visitedCountries?.size} countries
              </span>
            </p>
            <ul className="mt-2 flex flex-col gap-2">
              {Array.from(visitedCountries || []).map((country, idx) => (
                <div
                  key={idx}
                  className=" border rounded-lg p-2 border-gray-300 shadow-blue-400 shadow-xs  hover:bg-blue-50 transition duration-300"
                >
                  <li
                    key={country}
                    className="text-sm font-semibold flex items-center"
                  >
                    <MapPin className="h-4 w-4 mr-1 text-red-400" /> {country}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
