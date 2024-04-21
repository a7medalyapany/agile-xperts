import { FrameworkORLanguage } from "@/types";

export const pageLinks = [
	{
		route: "/",
		label: "Home",
	},
	{
		route: "/search",
		label: "Search",
	},
	{
		route: "/lobby",
		label: "Lobby",
	},
	{
		route: "/dev-pulse",
		label: "DevPulse",
	},
	{
		route: "/bookmarks",
		label: "Bookmarks",
	},
	{
		route: "/activity",
		label: "Activity",
	},
	{
		route: "/profile",
		label: "Profile",
	},
];
  
export const frameworks: FrameworkORLanguage[] = [
	{ value: "next", label: "Next", icon: "/assets/techLogo/next.svg" },
	{ value: "react", label: "React", icon: "/assets/techLogo/react.svg" },
	{ value: "angular", label: "Angular", icon: "/assets/techLogo/angular.svg" },
	{ value: "vue", label: "Vue", icon: "/assets/techLogo/vue.svg" },
	{ value: "django", label: "Django", icon: "/assets/techLogo/django.svg" },
	{ value: "spring", label: "Spring", icon: "/assets/techLogo/spring.svg" },
	{ value: ".net", label: ".Net", icon: "/assets/techLogo/net.svg" },
];
  
export const languages: FrameworkORLanguage[] = [
	{ value: "python", label: "Python", icon: "/assets/techLogo/python.svg" },
	{ value: "typeScript", label: "TypeScript", icon: "/assets/techLogo/typescript.svg" },
	{ value: "java ", label: "Java", icon: "/assets/techLogo/java.svg" },
	{ value: "C#", label: "C#", icon: "/assets/techLogo/c-sharp.svg" },
	{ value: "javaScript", label: "JavaScript", icon: "/assets/techLogo/javascript.svg" },
	{ value: "swift", label: "Swift", icon: "/assets/techLogo/swift.svg" },
	{ value: "rust", label: "Rust", icon: "/assets/techLogo/rust.svg" },
	{ value: "ruby", label: "Ruby", icon: "/assets/techLogo/ruby.svg" },
	{ value: "go", label: "Go", icon: "/assets/techLogo/go.svg" },
];

export const HomePageFilters = [
	{ name: "Newest", value: "newest" },
	{ name: "Oldest", value: "oldest" },
	{ name: "Status", value: "status" },
];