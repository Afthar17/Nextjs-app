'use server';

import { auth } from "@/auth";
import prisma from "../prisma";


export const reorderLocations = async (tripId: string, newOrder: string[]) => {
    const session =  await auth();
    if(!session || !session.user?.id) {
        throw new Error('Unauthorized');
    }
    await prisma.$transaction(newOrder.map((locationId:string,idx:number)=> prisma.location.update({where:{id:locationId},data:{order:idx}})))
};