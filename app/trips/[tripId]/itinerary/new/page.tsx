"use server";

import NewLocationClient from "@/components/NewLocationClient";

export default async function NewItinerary({
  params,
}: {
  params: { tripId: string };
}) {
  const { tripId } = params;
  return <NewLocationClient tripId={tripId} />;
}
