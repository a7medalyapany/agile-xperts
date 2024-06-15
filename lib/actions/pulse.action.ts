'use server'

import { IPostPulse, IPulseReply } from "@/types"
import { revalidatePath } from "next/cache"
import { createClient } from "../supabase/server"

export async function postPulse(params: IPostPulse) {
	const { content, imgUrl, parentId } = params
	if (!content && !imgUrl) {
		throw new Error("Content or photo is required")
	}


	const supabase = createClient<Database>()
	
	try {

		

		const { data: { user }, error } = await supabase.auth.getUser()
		if (!user) {
			throw new Error("User not found")
		}

		if (error) {
			throw error
		}

		const userId = user.id

		if (parentId) {
			const { error: insertError } = await supabase.from("reply").insert({
				user_id: userId,
				content: content || null,
				img_url: imgUrl || null,
				post_id: parentId
			}).single()

			if (insertError) {
				throw insertError
			}

			revalidatePath(`/dev-pulse/${parentId}`)
			
		} else {

			const { error: insertError } = await supabase.from("post").insert({
			user_id: userId,
			content: content || null,
			img_url: imgUrl || null
			}).single()
	
			if (insertError) {
			throw insertError
			}
	
			revalidatePath('/dev-pulse')

		}
		   
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function getAllPulses() {
	const supabase = createClient<Database>()
	const { data, error } = await supabase.from("post_details").select("*")
	if (error) {
		throw error
	}
	return data
}

export async function getPulseById(params: { id: string }) {
	const supabase = createClient<Database>()
	const { id } = params
	try {
		const { data: pulse, error } = await supabase
		.from("post_details_with_replies")
		.select("*")
		.eq('post_id', id)
		.single()
  
	  if (error) {
		throw error
	  }

		const replies: IPulseReply[] = pulse.replies ? (pulse.replies as any[]).map(reply => ({
			replyId: reply.reply_id,
			content: reply.content,
			img_url: reply.img_url,
			createdAt: reply.created_at,
			updatedAt: reply.updated_at,
			authorId: reply.author_id,
			authorName: reply.author_name,
			authorUsername: reply.author_username,
			authorAvatar: reply.author_avatar_url
		  })) : []
	  
		  return { pulse, replies }
	} catch (error) {
		console.error(error)
		throw error
	}
}
