/* eslint-disable no-unused-vars */

import { Database as DB } from "@/types/database";

type Pulse = DB["public"]["Tables"]["post"]["Row"];
type Profile = DB["public"]["Tables"]["profile"]["Row"];
type profileView = DB["public"]["Views"]["profile_view"]["Row"];

declare global {
  type Database = DB;

  type PulseWithAuthor = Pulse & {
    author: Profile;
    likes: number;
    user_has_liked_pulse: boolean;
  };
  type ProfileWithRole = Profile & { user_role: string };
}
