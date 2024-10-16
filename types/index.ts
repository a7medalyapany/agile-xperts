export interface FrameworkORLanguage {
	value: string;
	label: string;
	icon: string;
}

export interface IUser {
	id: string;
	name: string;
	email?: string;
	imgUrl: string;
	firstLetter: string;
}

export interface IPulseProps {
	id: number;
	content?: string | null;
	photo?: string | null;
	createdAt: string;
	updatedAt: string;
	authorId: string;
	authorName: string;
	authorUsername: string;
	authorAvatar: string;
	likeCount: number;
	replyCount: number;
	repostCount: number;
	hasLiked: boolean;
	hasReposted: boolean;
	hasBookmarked: boolean;
}

export interface ITeamMember {
    user_id: string;
    name: string;
    username: string;
    email: string;
    avatar_url: string;
    tech_id: number;
    tech_name: string;
    tech_designation: string;
}

export interface ITechStack {
    id: number;
    name: string;
    designation: string;
}

export interface IProjectOwner {
    name: string;
	username: string;
	email: string;
	avatar_url: string;
	user_id: string;
}

export interface IProject {
    project_id: number;
    project_title: string;
    project_description: string;
    is_private: boolean;
    repo_name: string;
    project_img_url: string;
    github_repo_url: string;
    project_created_at: string;
    project_updated_at: string;
    team_members: ITeamMember[];
    stack: ITechStack[];
    owner_id: string;
	project_owner: IProjectOwner[];
}

export interface ILastProject extends IProject {}

export interface IPostPulse {
	content?: string;
	imgUrl?: string;
	parentId?: number;
}

export interface URLProps {
	params: { id: string };
	searchParams?: { [key: string]: string | undefined };
}

export interface FormatDateTypes {
	dateString: string,
	type?: 'joinedAt' | 'createdAt' | 'updatedAt'
}

export interface IPulseReply {
	replyId: number,
	content?: string | null;
	photo?: string | null;
	createdAt:string;
	updatedAt: string;
	authorId: string;
	authorName: string;
	authorUsername: string;
	authorAvatar: string
}


export interface INotification {
	avatar_url: string | null;
    created_at: string | null;
    is_read: boolean | null;
    notification_id: number | null;
    notification_type: string | null;
    post_content: string | null;
	name: string | null;
    username: string | null;
	user_id: string | null;
	related_user_id: string | null;
	related_post_id: number | null;
	post_img_url: string | null
}