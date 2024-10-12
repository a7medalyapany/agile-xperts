import { NextResponse } from 'next/server'
import Parser from 'rss-parser'
import NodeCache from 'node-cache'
import { GoogleGenerativeAI } from '@google/generative-ai'

const cache = new NodeCache({ stdTTL: 86400 })  // Cache for 1 day
const parser = new Parser()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateTitleAndHook(text: string) {
	try {
		const prompt = `Generate a one-word title representing a technology name, related topic, big company, or repository name based on this text: "${text}". Then, create a catchy hook summarizing the topic in a way that attracts attention (maximum 70 characters) without using any special symbols or emojis.`;

		const result = await model.generateContent(prompt);
		const generatedText = result.response.text().trim().split('\n');

		const cleanText = (input: string) => input.replace(/\*\*|## Title: |## Hook: /g, '').trim();

		const title = cleanText(generatedText[0]) || `About ${text.split(' ').slice(0, 3).join(' ')}`;
		const hook = cleanText(generatedText[2]) || `Discover insights about ${text.split(' ').slice(0, 3).join(' ')}`;

		return { title, hook };
	} catch (error) {
		console.error('Error generating title and hook:', error);
		return {
			title: `About ${text.split(' ').slice(0, 3).join(' ')}`,
			hook: `Discover insights about ${text.split(' ').slice(0, 3).join(' ')}`,
		};
	}
}

async function fetchHackerNewsTrending() {
	try {
		const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
		if (!response.ok) {
			throw new Error('Failed to fetch Hacker News data')
		}

		const storyIds = await response.json()
		const topStories = await Promise.all(
			storyIds.slice(0, 5).map(async (id: any) => {
				const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
				return await storyRes.json()
			})
		)

		return topStories.map((story) => ({
			title: story.title,
			url: story.url,
			score: story.score,
		}))
	} catch (error) {
		console.error('Error fetching Hacker News trending:', error)
		return []
	}
}

async function fetchTechCrunch() {
	try {
		const feed = await parser.parseURL('https://techcrunch.com/feed/')
		return feed.items.map((item) => ({
			title: item.title,
			link: item.link,
		}))
	} catch (error) {
		console.error('Error fetching TechCrunch feed:', error)
		return []
	}
}

async function aggregateTrendingTech() {
	try {
		const [hackerNews, techCrunch] = await Promise.all([
			fetchHackerNewsTrending(),
			fetchTechCrunch(),
		]);

		const combinedData = [
			...hackerNews.map((h) => ({ text: h.title, url: h.url, engagementScore: h.score })),
			...techCrunch.map((tc) => ({ text: tc.title, url: tc.link })),
		];

		// Sort combined data by engagement score and take the top 5
		const topFive = combinedData
			.sort((a, b) => {
				const scoreA = 'engagementScore' in a ? a.engagementScore : 0;
				const scoreB = 'engagementScore' in b ? b.engagementScore : 0;
				return scoreB - scoreA;
			})
			.slice(0, 5); // Get top 5 items

		// Apply AI model to only the top 5 items
		const summarizedData = await Promise.all(
			topFive.map(async (item) => {
				const { title, hook } = await generateTitleAndHook(item.text);
				return { 
					title, 
					url: item.url, 
					engagementScore: 'engagementScore' in item ? item.engagementScore : undefined, 
					hook 
				};
			})
		);

		return summarizedData;
	} catch (error) {
		console.error('Error aggregating trending tech data:', error);
		return [];
	}
}

export async function GET() {
	const cacheKey = 'trending_tech'
	const cachedTopics = cache.get(cacheKey)

	if (cachedTopics) {
		return NextResponse.json(cachedTopics)
	}

	const trendingTech = await aggregateTrendingTech()
	cache.set(cacheKey, trendingTech)  // Cache the data

	return NextResponse.json(trendingTech)
}
