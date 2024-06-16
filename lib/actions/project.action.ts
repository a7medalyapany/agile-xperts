'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkUserIdentity } from "./user.action";
import { createClient } from "@/lib/supabase/server";
import { CreateRepositoryParams, InsertProjectParams } from "@/lib/types";
import { ILastProject, ITeamMember } from "@/types";

export async function createRepository(params: CreateRepositoryParams) {
	const supabase = createClient();
	const {
		data: { user },
	  } = await supabase.auth.getUser();

	if (!user) {
		throw new Error("User not logged in");
	}

	const providerToken = cookies().get('provider_token');

	if (!providerToken) {
		console.error("No provider_token found in cookies");
		redirect('/settings/github');
	}

	const { repoName, description, isPrivate } = params;

	try {
		const githubResponse = await fetch("https://api.github.com/user/repos", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${providerToken.value}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: repoName, description, 'private': isPrivate }),
    	});

		if (!githubResponse.ok) {
			const errorData = await githubResponse.json();
			throw errorData.message;
		}

		const repoData = await githubResponse.json();
    	const repoLink = repoData.html_url;

		return repoLink;
	} catch (error) {
		console.error(error)
		throw error;
	}
}

export async function deleteRepository(repoName: string) {
	const { githubUsername } = await checkUserIdentity()
	const providerToken = cookies().get('provider_token');
  
	if (!providerToken) {
	  console.error("No provider_token found in cookies");
	  redirect('/settings/github');
	}
  
	try {
	  const githubResponse = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}`, {
		method: "DELETE",
		headers: {
		  Authorization: `Bearer ${providerToken.value}`,
		  "Content-Type": "application/json",
		},
	  });
  
	  if (!githubResponse.ok) {
		const errorData = await githubResponse.json();
		throw errorData.message;
	  }
  
	  return true;
	} catch (error) {
	  console.error('Delete Repository Error:', error);
	  throw error;
	}
}
  
export async function insertProject(params: InsertProjectParams) {
	const supabase = createClient<Database>();
	const {
		name,
		description = '',
		githubRepoUrl,
		repoName,
		teamName,
		technologies,
		imgUrl = '',
		isPrivate = false
	} = params;


	try {
			
		const { data: { user }} = await supabase.auth.getUser();

		if (!user){
			redirect('/login');
			return;
		}

		const { data, error } = await supabase.rpc('call_handle_project_submission', {
			_name: name,
			_description: description,
			_img_url: imgUrl,
			_owner_id: user.id,
			_is_private: isPrivate,
			_repo_name: repoName,
			_github_repo_url: githubRepoUrl,
			_team_name: teamName,
			_technologies: technologies
		});

		if (error) {
			console.log('Supabase RPC Error:', error);
			throw error;
		}

		return data;

	} catch (error) {
		console.error('Insert Project Error:', error);
		throw error;
	}
}

export async function getLatestProject() {
	const supabase = createClient<Database>();

	try {
		const { data } = await supabase.rpc("get_last_project_details");
	  
		const project = data?.[0] ?? ({} as ILastProject);
	  
		const stack = project.stack as {
		  id: number;
		  name: string;
		  designation: string;
		}[];
		
		const members = project.team_members as ITeamMember[];
		const owner = project.project_owner as {
		  name: string;
		  username: string;
		  email: string;
		  avatar_url: string;
		  user_id: string;
		};
	  
	  
		return { project, members, stack, owner };
	  
	} catch (error) {
		console.error('Get Latest Project Error:', error);
		throw error;
	}
}

export async function getProjectById(id: number) {
	const supabase = createClient<Database>();

	try {
		const { data } = await supabase.rpc("get_project_details_by_id", {
			project_id_param: id
		})
	  
		const project = data?.[0] ?? ({} as ILastProject);
	  
		const stack = project.stack as {
		  id: number;
		  name: string;
		  designation: string;
		}[];
		
		const members = project.team_members as ITeamMember[];
		const owner = project.project_owner as {
		  name: string;
		  username: string;
		  email: string;
		  avatar_url: string;
		  user_id: string;
		};
	  
	  
		return { project, members, stack, owner };
	  
	} catch (error) {
		console.error('Get Latest Project Error:', error);
		throw error;
	}
}
