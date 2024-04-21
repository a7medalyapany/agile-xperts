export interface FrameworkORLanguage {
	value: string;
	label: string;
	icon: string;
}

export interface IPulseProps {
	id?: string;
	author: {
		id: string;
		name: string;
		imgUrl: string;
		firstLetter: string;
	};
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