import { getOrganization } from "@/actions/organizations";
import React from "react";

const Organization =  async ({ params }) => {
    const { orgId } = params;
    const organization = await getOrganization(orgId);

    if (!organization) {
        return <div>Organization not found</div>
    }

    return <div>
        <div>
            <h1>{ organization.name}&rsquo;s Projects</h1>
        </div>
    </div>
};

export default Organization