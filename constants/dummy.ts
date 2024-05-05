import { IPulseProps, ItechStack } from "@/types";

export const pulses: IPulseProps[] = [
	{
	  id: '001',
	  author: {
		id: 'aa1',
		name: 'Alyapany',
		imgUrl: "https://avatars.githubusercontent.com/u/103336732?v=4",
		firstLetter: 'J'
	  },
	  content: 'Check out this cool event happening downtown!',
	  photo: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ,
	  isEchoBack: false,
	  echoBack: [
		{
		  id: 'eb02',
		  author: {
			id: 'afdkaslf2',
			name: 'shadcn',
			imgUrl: "https://avatars.githubusercontent.com/u/124599?v=4",
			firstLetter: 'cn'
		  },
		  content: 'I’ll be there!',
		  isEchoBack: true,
		  echoBack: []
		},
		{
		  id: 'eb003',
		  author: {
			id: 'a3fadf',
			name: 'Supabase',
			imgUrl: "https://avatars.githubusercontent.com/u/54469796?s=200&v=4",
			firstLetter: 'S'
		  },
		  content: 'FUCK OFF DUDE!',
		  isEchoBack: true,
		  echoBack: [
			{
				id: 'seb142',
				author: {
					id: 'aa1',
					name: 'Alyapany',
					imgUrl: "https://avatars.githubusercontent.com/u/103336732?v=4",
					firstLetter: 'J'
				},
				content: "third reply here",
				isEchoBack: true,
				echoBack: []
			}
		  ]
		}

	  ]
	},
	{
	  id: '0032',
	  author: {
		id: 'a212',
		name: 'Jane Smith',
		imgUrl: "https://avatars.githubusercontent.com/u/103336732?v=4",
		firstLetter: 'J'
	  },
	  content: 'Loving the new coffee shop on Main Street.',
	  isEchoBack: false,
	  echoBack: [
		{
		  id: '0053',
		  author: {
			id: 'asaf1',
			name: 'John Doe',
			imgUrl: "https://avatars.githubusercontent.com/u/103336732?v=4",
			firstLetter: 'J'
		  },
		  content: 'Yeah, their espresso is top-notch!',
		  isEchoBack: false,
		  echoBack: []
		}
	  ]
	},
	{
	  id: '0214',
	  author: {
		id: 'a543',
		name: 'Alice Johnson',
		imgUrl: "https://avatars.githubusercontent.com/u/103336732?v=4",
		firstLetter: 'A'
	  },
	  content: 'Who’s going to the concert this weekend?',
	  isEchoBack: false,
	  photo: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ,
	  echoBack: []
	},
	{
	  id: '0105',
	  author: {
		id: 'a4',
		name: 'Mike Brown',
		imgUrl: "https://avatars.githubusercontent.com/u/103336732?v=4",
		firstLetter: 'M'
	  },
	  content: 'Finally finished reading "Dune" — mind blowing!',
	  isEchoBack: false,
	  echoBack: []
	},
];
  
export const techStack: ItechStack[] = [
	{
	  id: '1',
	  name: "Next.js",
	  designation: "Frontend",
	  image: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
	},
	{
	  id: '2',
	  name: "TypeScript",
	  designation: "Full Stack",
	  image: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
	},
	{
	  id: '3',
	  name: "Apollo",
	  designation: "Backend",
	  image: "https://cdn.worldvectorlogo.com/logos/apollo-graphql-compact.svg",
	},
	{
	  id: '4',
	  name: "Docker",
	  designation: "DevOps",
	  image: "https://cdn.worldvectorlogo.com/logos/docker.svg",
	},
	{
	  id: '5',
	  name: "Prisma",
	  designation: "Database",
	  image: "https://cdn.worldvectorlogo.com/logos/prisma-2.svg",
	},
	{
	  id: '6',
	  name: "PostgreSQL",
	  designation: "Database",
	  image: "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
	},
	{
	  id: '7',
	  name: "Redis",
	  designation: "Database",
	  image: "https://cdn.worldvectorlogo.com/logos/redis.svg",
	},
];

const imageUrl =
  "https://thumbs.dreamstime.com/b/you-have-been-hacked-warning-binary-code-stream-background-digital-screen-over-green-panorama-163641541.jpg";
export const projects = [
	{
	  id: '1',
	  imageUrl,
	  title: "Dope Project 1",
	  techStack,
	  knockCount: 10,
	  createdAt: "2023-05-15",
	},
	{
	  id: '2',
	  title: "Lit Project 2",
	  imageUrl,
	  knockCount: 15,
	  createdAt: "2023-07-20",
	},
	{
	  id: '3',
	  title: "Project X",
	  imageUrl,
	  techStack,
	  knockCount: 8,
	  createdAt: "2023-09-10",
	},
	{
		id: '4',
	  title: "Awesome App",
	  imageUrl,
	  techStack,
	  knockCount: 20,
	  createdAt: "2023-11-03",
	},
	{
		id: '5',
	  title: "Epic Project",
	  imageUrl,
	  techStack,
	  knockCount: 12,
	  createdAt: "2023-12-25",
	},
	{
		id: '6',
	  title: "Funky Framework",
	  imageUrl,
	  techStack,
	  knockCount: 18,
	  createdAt: "2024-01-15",
	},
	{
		id: '7',
	  title: "Superb Site",
	  imageUrl,
	  techStack,
	  knockCount: 25,
	  createdAt: "2024-03-02",
	},
	{
		id: '8',
	  title: "Gnarly Game",
	  imageUrl,
	  techStack,
	  knockCount: 30,
	  createdAt: "2024-04-10",
	},
	{
		id: '9',
	  title: "Project Z",
	  imageUrl,
	  techStack,
	  knockCount: 22,
	  createdAt: "2024-05-20",
	},
	{
		id: '10',
	  title: "Next Level App",
	  imageUrl,
	  techStack,
	  knockCount: 17,
	  createdAt: "2024-07-01",
	},
];

export const currentProjectMembers = [
	{
		id: "1",
		name: "Radwa",
		role: "Developer",
	},
	{
		id: "2",
		name: "Mohamed",
		role: "Backend",
	},
	{
		id: "3",
		name: "Shorouk",
		role: "Full Stack",
	},
	{
		id: "4",
		name: "Eman",
		role: "Database",
	},
	{
		id: "5",
		name: "Alyapany",
		role: "Cyber Security",
	},
]

export const frameworks = [
	{
	  value: "next.js",
	  label: "Next.js",
	},
	{
	  value: "sveltekit",
	  label: "SvelteKit",
	},
	{
	  value: "nuxt.js",
	  label: "Nuxt.js",
	},
	{
	  value: "remix",
	  label: "Remix",
	},
	{
	  value: "astro",
	  label: "Astro",
	},
];

export const userSkills = [
	{ name: "Next", type: "framework", icon: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
	{ name: "TypeScript", type: "language", icon: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
	{ name: "Django", type: "framework", icon: "https://cdn.worldvectorlogo.com/logos/django.svg" },
	{ name: "Spring", type: "framework", icon: "https://cdn.worldvectorlogo.com/logos/spring.svg" },
	{ name: ".NET", type: "framework", icon: "https://cdn.worldvectorlogo.com/logos/net.svg" },
  
	{ name: "Java", type: "language", icon: "https://cdn.worldvectorlogo.com/logos/java.svg" },
	{ name: "Rust", type: "language", icon: "https://cdn.worldvectorlogo.com/logos/rust.svg" },
	{ name: "Ruby", type: "language", icon: "https://cdn.worldvectorlogo.com/logos/ruby.svg" },

	{ name: "TypeScript", type: "language", icon: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
	{ name: "Spring", type: "framework", icon: "https://cdn.worldvectorlogo.com/logos/spring.svg" },
];

export const user = {
	id: 'aa1',
	name: 'Alyapany',
	imgUrl: "https://avatars.githubusercontent.com/u/103336732?v=4",
	firstLetter: 'A'
}