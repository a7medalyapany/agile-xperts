export interface CreateRepositoryParams {
	repoName: string;
	isPrivate?: boolean;
	description?: string;
}

export interface InsertProjectParams {
	name: string;
	description?: string;
	imgUrl?: string
	ownerId?: string;
	isPrivate?: boolean;
	repoName: string;
	githubRepoUrl: string;
    teamName: string;
    technologies: {
		name: string;
		designation: string;
	}[];
}

export interface FollowUserParams {
	userId: string;
	targetUserId: string;
	path?: string;
}
