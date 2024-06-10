export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookmark: {
        Row: {
          created_at: string
          id: number
          post_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          post_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmark_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          continent: Database["public"]["Enums"]["continents"] | null
          id: number
          iso2: string
          iso3: string | null
          local_name: string | null
          name: string | null
        }
        Insert: {
          continent?: Database["public"]["Enums"]["continents"] | null
          id?: number
          iso2: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
        Update: {
          continent?: Database["public"]["Enums"]["continents"] | null
          id?: number
          iso2?: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string
          followe_id: string
          following_id: string
          id: number
        }
        Insert: {
          created_at?: string
          followe_id: string
          following_id: string
          id?: number
        }
        Update: {
          created_at?: string
          followe_id?: string
          following_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "follows_followe_id_fkey"
            columns: ["followe_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string
          id: number
          post_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          post_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "like_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      member: {
        Row: {
          joined_at: string
          team_id: number
          tech_id: number
          user_id: string
        }
        Insert: {
          joined_at?: string
          team_id: number
          tech_id: number
          user_id: string
        }
        Update: {
          joined_at?: string
          team_id?: number
          tech_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "technology"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      notification: {
        Row: {
          created_at: string
          id: number
          is_read: boolean
          notification_type: string
          related_post_id: number
          related_user_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_read?: boolean
          notification_type: string
          related_post_id: number
          related_user_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_read?: boolean
          notification_type?: string
          related_post_id?: number
          related_user_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      post: {
        Row: {
          content: string | null
          created_at: string
          id: number
          img_url: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          about_me: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          id: string
          location: number | null
          name: string
          skills: string[] | null
          status: Database["public"]["Enums"]["user_status"]
          streak_points: number
          token_hash: string | null
          updated_at: string
          username: string
        }
        Insert: {
          about_me?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          id: string
          location?: number | null
          name: string
          skills?: string[] | null
          status?: Database["public"]["Enums"]["user_status"]
          streak_points?: number
          token_hash?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          about_me?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          id?: string
          location?: number | null
          name?: string
          skills?: string[] | null
          status?: Database["public"]["Enums"]["user_status"]
          streak_points?: number
          token_hash?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_location_fkey"
            columns: ["location"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      project: {
        Row: {
          created_at: string
          description: string | null
          github_repo_url: string
          id: number
          img_url: string | null
          is_private: boolean
          owner_id: string
          repo_name: string
          title: string
          update_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          github_repo_url: string
          id?: number
          img_url?: string | null
          is_private?: boolean
          owner_id: string
          repo_name: string
          title: string
          update_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          github_repo_url?: string
          id?: number
          img_url?: string | null
          is_private?: boolean
          owner_id?: string
          repo_name?: string
          title?: string
          update_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      reply: {
        Row: {
          content: string | null
          created_at: string
          id: number
          img_url: string | null
          post_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          post_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          post_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reply_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reply_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      repost: {
        Row: {
          created_at: string
          id: number
          is_quoted: boolean
          original_post_id: number
          quote_content: string | null
          quote_img_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_quoted?: boolean
          original_post_id: number
          quote_content?: string | null
          quote_img_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_quoted?: boolean
          original_post_id?: number
          quote_content?: string | null
          quote_img_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "repost_original_post_id_fkey"
            columns: ["original_post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repost_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      request: {
        Row: {
          requested_at: string
          status: Database["public"]["Enums"]["request_status"]
          team_id: number
          tech_id: number
          user_id: string
        }
        Insert: {
          requested_at?: string
          status?: Database["public"]["Enums"]["request_status"]
          team_id: number
          tech_id: number
          user_id: string
        }
        Update: {
          requested_at?: string
          status?: Database["public"]["Enums"]["request_status"]
          team_id?: number
          tech_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "request_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "request_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "technology"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "request_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      stack: {
        Row: {
          project_id: number
          tech_id: number
        }
        Insert: {
          project_id: number
          tech_id: number
        }
        Update: {
          project_id?: number
          tech_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "stack_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stack_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "technology"
            referencedColumns: ["id"]
          },
        ]
      }
      team: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          project_id: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          project_id: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "team_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      technologies: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      technology: {
        Row: {
          designation: string
          id: number
          name: string
        }
        Insert: {
          designation: string
          id?: number
          name: string
        }
        Update: {
          designation?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "technology_name_fkey"
            columns: ["name"]
            isOneToOne: false
            referencedRelation: "technologies"
            referencedColumns: ["name"]
          },
        ]
      }
      user_activity: {
        Row: {
          activity_type: string
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_level: {
        Row: {
          id: number
          level: number
          user_id: string
        }
        Insert: {
          id?: number
          level: number
          user_id: string
        }
        Update: {
          id?: number
          level?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_level_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_role: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
        }
        Returns: boolean
      }
      call_handle_project_submission: {
        Args: {
          _name: string
          _description: string
          _img_url: string
          _owner_id: string
          _is_private: boolean
          _repo_name: string
          _github_repo_url: string
          _team_name: string
          _technologies: Json
        }
        Returns: number
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
      handle_project_submission: {
        Args: {
          _name: string
          _description: string
          _img_url: string
          _owner_id: string
          _is_private: boolean
          _repo_name: string
          _github_repo_url: string
          _team_name: string
          _technologies: Json
        }
        Returns: number
      }
    }
    Enums: {
      app_permission:
        | "project.insert"
        | "project.update"
        | "team.insert"
        | "team.update"
        | "team.delete"
        | "request.select"
        | "request.update"
      app_role: "pro" | "normal"
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
      request_status: "pending" | "rejected" | "accepted"
      user_status: "ONLINE" | "OFFLINE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
