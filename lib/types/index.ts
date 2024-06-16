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