import { auth } from "@/auth";
import TripDetailsClient from "@/components/TripDetailsClient";
import prisma from "@/lib/prisma";

export default async function TripDetai({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const session = await auth();
  if (!session || !session.user?.id) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-slate-800 text-2xl mt-10 font-semibold">
          Sign In to see your trips
        </h1>
      </div>
    );
  }
  const tripDetails = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: session?.user?.id,
    },
    include: {
      Location: true,
    },
  });
  if (!tripDetails) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-slate-800 text-2xl mt-10 font-semibold">
          Trip not found
        </h1>
      </div>
    );
  }
  return <TripDetailsClient tripDetails={tripDetails} />;
}
