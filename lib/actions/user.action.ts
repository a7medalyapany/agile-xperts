'use server'

import { createClient } from "../supabase/server";

export const checkUserIdentity = async () => {
	'use server';
  
	const supabase = createClient();
	const { data: { identities } }: any = await supabase.auth.getUserIdentities();
  
	const hasGitHubIdentity = identities.some(
	  (identity: { provider: string }) => identity.provider === "github"
	);
  
	return { identities, hasGitHubIdentity };
  };
  