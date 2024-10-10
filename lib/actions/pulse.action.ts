'use server'

import { LikePulseParams } from "../types"
import { revalidatePath } from "next/cache"
import { IPostPulse, IPulseReply } from "@/types"
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
		   
	} catch (error: any) {
		console.error('User Must be logged in to post a pulse')
	}
}

export async function getUserPulses(userID: string) {
	const supabase = createClient<Database>()

	try {
		const { data: pulses, error } = await supabase
		  .from("user_posts_with_reposts")
		  .select("*")
		  .or(`author_id.eq.${userID},original_author_id.eq.${userID}`)
		  .order("created_at", { ascending: false });
  
		if (error) {
		  throw error;
		}
		return pulses;
	} catch (error) {
		console.error(error)
		throw error
	}

}
export async function getAllPulses() {
	const supabase = createClient<Database>()
	const { data, error } = await supabase.from("post_details").select("*").order("created_at", { ascending: false })
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

export async function handlePulseLike(params: LikePulseParams) {
	const { postId } = params;
	const supabase = createClient<Database>()

	try {
		const { data: { user }, error: userError } = await supabase.auth.getUser()
		if (userError) {
		  throw userError
		}
		if (!user) {
		  throw new Error("User not found")
		}
		const userId = user.id
	
		const { error: postError } = await supabase.from('post').select('id').eq('id', postId).single()
	
		if (postError) {
		  throw new Error("Post not found")
		}
	
		const { data: like, error: likeError } = await supabase.from('likes').select('id').eq('post_id', postId).eq('user_id', userId).single()
	
		if (like && !likeError) {
		  const { error: deleteError } = await supabase.from('likes').delete().eq('id', like.id)
	
		  if (deleteError) {
			throw deleteError
		  }
	
		  const { count: updatedLikeCount, error: countError } = await supabase.from('likes').select('id', { count: 'exact' }).eq('post_id', postId)
	
		  if (countError) {
			throw countError
		  }
		  
		  revalidatePath(`/dev-pulse}`)
		  return { message: 'Post disliked', likeCount: updatedLikeCount }
		} else {
		  const { data: likeData, error: insertError } = await supabase.from('likes').insert({
			user_id: userId,
			post_id: postId
		  }).single()
	
		  if (insertError) {
			throw insertError
		  }
	
		  const { count: updatedLikeCount, error: countError } = await supabase.from('likes').select('id', { count: 'exact' }).eq('post_id', postId)
	
		  if (countError) {
			throw countError
		  }
		  
		  revalidatePath(`/dev-pulse}`)
		  return { message: 'Post liked', likeData, likeCount: updatedLikeCount }
		}
	
	  } catch (error) {
		console.error(error)
		throw error
	  }
}

export async function handlePulseBookMark(params: LikePulseParams) {
	const { postId } = params;
	const supabase = createClient<Database>()

	try {
		const { data: { user }, error: userError } = await supabase.auth.getUser()
		if (userError) {
		  throw userError
		}
		if (!user) {
		  throw new Error("User not found")
		}
		const userId = user.id
	
		const { error: postError } = await supabase.from('post').select('id').eq('id', postId).single()
	
		if (postError) {
		  throw new Error("Post not found")
		}
	
		const { data: bookmark, error: bookmarkError } = await supabase.from('bookmark').select('id').eq('post_id', postId).eq('user_id', userId).single()
	
		if (bookmark && !bookmarkError) {
		  const { error: deleteError } = await supabase.from('bookmark').delete().eq('id', bookmark.id)
	
		  if (deleteError) {
			throw deleteError
		  }
	
		  
		  revalidatePath(`/dev-pulse}`)
		  return { message: 'Post deleted from bookmark' }
		} else {
		  const { data: bookmarkData, error: insertError } = await supabase.from('bookmark').insert({
			user_id: userId,
			post_id: postId
		  }).single()
	
		  if (insertError) {
			throw insertError
		  }
	
		  revalidatePath(`/dev-pulse}`)
		  return { message: 'Post bookmarked', bookmarkData }
		}
	
	  } catch (error) {
		console.error(error)
		throw error
	  }
}

export async function removeBookmarkedPulse(params: { bookmarkId:  number }) {
	const { bookmarkId } = params;
	const supabase = createClient<Database>()

	try {
		const { error: deleteError } = await supabase.from('bookmark').delete().eq('id', bookmarkId)
	
		if (deleteError) {
			throw deleteError
		}
		revalidatePath('/bookmarks')
		return { message: 'Post deleted from bookmark' }
	  } catch (error) {
		console.error(error)
		throw error
	  }
}

export async function getUserBookmarks() {
	const supabase = createClient<Database>()

	try{
		const { data, error } = await supabase.from("bookmark").select("*, profile(*), post(*)")
		if (error) {
			throw error
		}
		return data
	} catch (error) {
		console.error(error)
		throw error
	}
}