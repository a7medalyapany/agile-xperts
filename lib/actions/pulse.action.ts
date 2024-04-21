'use server'

import { IPostPulse } from "@/types"
import { revalidatePath } from "next/cache"

export async function Pulse(params: IPostPulse) {
	try {
		const { content, photo } = params
		console.log('Post Pulse', {
			content,
			photo
		})

		revalidatePath('/dev-pulse')
	} catch (error) {
		console.error(error)
		throw error
	}
}
