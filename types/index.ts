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
	id?: string;
	author: IUser;
	content: string;
	photo?: string;
	isEchoBack?: boolean;
	echoBack: IPulseProps[];
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
    tech_id: number;
    tech_name: string;
    tech_designation: string;
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
	content: string;
	photo?: string;
	author?: IUser;
}

export interface URLProps {
	params: { id: string };
	searchParams: { [key: string]: string | undefined };
}

export interface FormatDateTypes {
	dateString: string,
	type?: 'joinedAt' | 'createdAt' | 'updatedAt'
}