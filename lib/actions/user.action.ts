'use server'

import { createClient } from "../supabase/server";

export const checkUserIdentity = async () => {
	const supabase = createClient();
	const { data: { identities } }: any = await supabase.auth.getUserIdentities();
  
	const hasGitHubIdentity = identities.some(
	  (identity: { provider: string }) => identity.provider === "github"
	);

	const identitiesNumber = identities.length;
  
	return { identities, hasGitHubIdentity, identitiesNumber };
};
