export interface CreateRepositoryParams {
  repoName: string;
  isPrivate?: boolean;
  description?: string;
}

export interface InsertProjectParams {
  name: string;
  description?: string;
  imgUrl?: string;
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

export interface PasswordChangeParams {
  oldPassword?: string | undefined;
  newPassword: string;
  confirmPassword: string | undefined;
  twoFactorAuth?: boolean | undefined;
}

export interface LikePulseParams {
  postId: number;
}


export interface joinRequestParams {
  projectId: number;
  technologyId: number;
}

export interface AcceptRejectMemberParams {
  userId: string;
  teamId: number;
  technologyId: number;
  pathname: string;
}


export interface SendMessageParams {
  teamId: number;
  userId: string;
  content: string;
}

export interface UrlQueryParams {
  params: string;
  updates: Record<string, string | string[] | null>;
}
  
export interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export interface ProjectSearchParams {
  query?: string;
  techFilter?: string[];
}
