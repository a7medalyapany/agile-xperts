'use server';

import { createClient } from "@/lib/supabase/server";
import { SendMessageParams } from "../types";
import { revalidatePath } from "next/cache";


export async function getTeamMessages(projectId: number) {
	const supabase = createClient<Database>();

	try {
		const { data, error } = await supabase.from('team').select('id, name').eq('project_id', projectId).single()
		const teamId = data?.id;
		const teamName = data?.name;
		

		if (!teamId) {
			console.log(error)
			throw new Error("Team not found");
		}

		const { data: messages, error: messagesError } = await supabase
		.from('chat_view')
		.select('*')
		.eq('team_id', teamId)


		if (messagesError) {
			console.log(messagesError)
			throw new Error("Error fetching messages");
		}


		return  { messages, teamName, teamId };

	} catch (error) {
		console.error("Error fetching data: " + error);
		throw new Error("Error fetching data: " + error);
	}
}

export async function sendMessage(params: SendMessageParams) {
	const supabase = createClient<Database>();

	const { teamId, userId, content } = params;

	try {
		const { data, error } = await supabase
		.from('chat')
		.insert([{ team_id: teamId, send_by: userId, content }])

		if (error) {
			console.log(error)
			throw new Error("Error sending message");
		}

		revalidatePath(`/project/${teamId}`)
		return data;

	} catch (error) {
		console.error("Error sending message: " + error);
		throw new Error("Error sending message: " + error);
	}
}