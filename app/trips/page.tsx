import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Button } from "@/ui/Button";
import Link from "next/link";

export default async function Trips() {
  const session = await auth();

  const trips = await prisma.trip.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  const sortedTrips = trips.sort(
    (a, b) => b.startDate.getTime() - a.startDate.getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrips = sortedTrips.filter((trip) => trip.startDate >= today);

  if (!session || !session.user?.id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-slate-800 text-2xl">Sign In to see your trips</h1>
      </div>
    );
  }
  return (
    <div className=" space-y-6 conatiner mx-auto lg:mx-20 px-4 py-8">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-slate-800 text-2xl font-semibold">Dashboard</h1>
        <Link href="/trips/new">
          <Button Children={"New Trip"} />
        </Link>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <h2 className="text-slate-800 text-2xl">
          {`Welcome back `}
          <span className="font-bold text-slate-800">{session.user.name}</span>
        </h2>
        <h5 className="text-slate-600 text-sm">
          {trips.length === 0
            ? "Start Planning your first trip"
            : `You have explored ${trips.length - upcomingTrips.length} ${
                trips.length - upcomingTrips.length > 1
                  ? "destinations"
                  : "destination"
              }. And ${
                upcomingTrips.length === 0
                  ? "no upcoming trips"
                  : `you have ${upcomingTrips.length} upcoming ${
                      upcomingTrips.length > 1 ? "trips" : "trip"
                    }.`
              }`}
        </h5>
      </div>
      <div className="flex flex-col space-y-4 border-t border-gray-300 mt-5">
        <h3 className="text-slate-800 text-xl font-semibold mt-5">
          Your Trips
        </h3>
        {trips.length === 0 ? (
          <h5 className="text-slate-600 text-sm text-center">
            You have not created any trips yet.
          </h5>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTrips.slice(0, 6).map((trip) => (
              <Link href={`/trips/${trip.id}`} key={trip.id}>
                <div className="flex flex-col border border-gray-300 p-4 rounded-lg gap-2 shadow-sm hover:scale-105 hover:shadow-md transition duration-300">
                  <h4 className="text-slate-800 text-lg font-semibold">
                    {trip.title}
                  </h4>
                  <p className="text-slate-600 text-sm">
                    {upcomingTrips.includes(trip)
                      ? "Upcoming"
                      : new Date(trip.startDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        }) +
                        " - " +
                        new Date(trip.endDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                  </p>
                  <p className="text-slate-600 text-sm">{trip.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
