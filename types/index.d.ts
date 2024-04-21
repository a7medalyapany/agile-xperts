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

export interface ItechStack {
	id: string;
	name: string;
	designation: string;
	image: string;
}

export interface IProject {
	id: string;
	title: string;
	description: string;
	techStack: ItechStack[];
	knockCount: number;
	thumbnail: string;
	createdAt
}

export interface IPostPulse {
	content: string;
	photo?: string;
	author?: IUser;
}

export interface URLProps {
	params: { id: string };
	searchParams: { [key: string]: string | undefined };
}