'use server'

import { auth } from "@/auth"
import prisma from "../prisma";
import { redirect } from "next/navigation";

export async function addLocation(formData: FormData,tripId: string) {
    const session =  await auth();
    if(!session || !session.user?.id) {
        throw new Error('Unauthorized');
    }
    const address = formData.get('address')?.toString();
    if(!address) {
        throw new Error('Address is required');
    }
    const {lat,lng} = await geocodeAddress(address);
    const count =  await prisma.location.count({
        where: {
            tripId
        }
    })

    await prisma.location.create({
        data:{
            locationTitle: address,
            lat,
            lng,
            tripId,
            order: count
        }
    })

    redirect(`/trips/${tripId}`)
}

//google lat and lon function

async function geocodeAddress(address: string) {
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&format=json&apiKey=${apiKey}`
    const res = await fetch(url);
    const data =  await res.json();
    const {lat,lon} = data.results[0];
    return {lat,lng:lon};
}