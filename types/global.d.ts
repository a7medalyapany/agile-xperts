/* eslint-disable no-unused-vars */

import { Database as DB } from "@/types/database";

type Pulse = DB["public"]["Tables"]["post"]["Row"];
type Profile = DB["public"]["Tables"]["profile"]["Row"];
type profileView = DB["public"]["Views"]["profile_view"]["Row"];
type socialMediaAccounts = DB["public"]["Tables"]["social_media"]["Row"];
type publicProfile = DB["public"]["Views"]["public_profile_view"]["Row"];
type privateProfile = DB["public"]["Views"]["private_profile_view"]["Row"];

declare global {
  type Database = DB;
  type privateProfileView = privateProfile;
  type publicProfileView = publicProfile;
}
