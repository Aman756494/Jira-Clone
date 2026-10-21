"use server"

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server"

export async function getOrganization(slug) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthorized")
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const organization = await clerkClient().organizations.getOrganization({
        slug,
    });

    if (!organization) {
        return null;
    }

    const { data: membership } =
        await clerkClient().organizations.getOrganizationMembershipList({
            organizationId: organization.id,
        });
    
    const userMemebership = membership.find(
        (member) => member.publicUserData.userId === userId
    );

    //If User is not a member , return null
    if (!userMemebership) {
        return null
    }

    return organization;
}