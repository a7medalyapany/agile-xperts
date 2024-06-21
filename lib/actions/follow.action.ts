'use server'

import { revalidatePath } from "next/cache";
import { FollowUserParams } from "../types";
import { createClient } from "@/lib/supabase/server";


export async function followUser(params: FollowUserParams) {
	const supabase = createClient<Database>();

    try {
        const { userId, targetUserId, path } = params;

        if (userId === targetUserId) {
            throw new Error('Cannot follow yourself');
        }

        const { data: existingFollow } = await supabase
            .from('follows')
            .select('id')
            .eq('followe_id', userId)
            .eq('following_id', targetUserId)
            .single();

        if (existingFollow) {
            throw new Error('Already following this user');
        }

        await supabase
            .from('follows')
            .insert({ followe_id: userId, following_id: targetUserId });

        if (path) revalidatePath(path);
    } catch (error) {
        console.error('Error following user:', error);
        throw error;
    }
}

export async function unfollowUser(params: FollowUserParams) {
	const supabase = createClient<Database>();

    try {
        const { userId, targetUserId, path } = params;

        const { data: existingFollow } = await supabase
            .from('follows')
            .select('id')
            .eq('followe_id', userId)
            .eq('following_id', targetUserId)
            .single();

        if (!existingFollow) {
            throw new Error('Not following this user');
        }

        await supabase
            .from('follows')
            .delete()
            .eq('id', existingFollow.id);

        if (path) revalidatePath(path);
    } catch (error) {
        console.error('Error unfollowing user:', error);
        throw error;
    }
}

export async function checkIsFollowing(params: FollowUserParams) {
	const supabase = createClient<Database>();

    try {
        const { userId, targetUserId } = params;

        const { data: existingFollow } = await supabase
            .from('follows')
            .select('id')
            .eq('followe_id', userId)
            .eq('following_id', targetUserId)
            .single();

        return !!existingFollow;
    } catch (error) {
        console.error('An error occurred while checking follow status:', error);
        throw error;
    }
}

export async function getFollowCount(userId: string) {
	const supabase = createClient<Database>();
    try {
        const { count: followerCount } = await supabase
            .from('follows')
            .select('id', { count: 'exact' })
            .eq('following_id', userId);

        const { count: followingCount } = await supabase
            .from('follows')
            .select('id', { count: 'exact' })
            .eq('followe_id', userId);

        return { followers: followerCount, following: followingCount };
    } catch (error: any) {
        throw new Error('Error getting follow count: ' + error.message);
    }
}