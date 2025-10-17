import { auth } from "@/auth";
import { getCountryFromCoordinates } from "@/lib/actions/getCountryFromCoordinates";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session =  await auth();
        if(!session || !session.user?.id) {
            return new NextResponse('Unauthorized', {status: 401})
        }
        const locations =  await prisma.location.findMany({
            where: {
                trip:{
                    userId: session.user?.id
                }
            },
            select:{
                locationTitle: true,
                lat: true,
                lng: true,
                trip:{
                    select: {
                        title: true
                    }
                }
            }
        });
        const transformedLocations = await Promise.all(locations.map(async (loc)=>{
            const geocodeResult = await getCountryFromCoordinates(loc.lat, loc.lng);
            return {
                name: `${loc.locationTitle} -${geocodeResult.formattedAddress}`,
                lat: loc.lat,
                lng: loc.lng,
                country: geocodeResult.country,
            }
        }))
        return NextResponse.json(transformedLocations)
    } catch (error) {
        return new NextResponse('Internal Server Error', {status: 500})
    }
}