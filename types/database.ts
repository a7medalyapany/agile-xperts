/* eslint-disable no-unused-vars */
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
            foreignKeyName: "bookmark_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "bookmark_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "bookmark_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
          },
        ]
      }
      chat: {
        Row: {
          content: string
          created_at: string
          id: number
          send_by: string
          team_id: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          send_by: string
          team_id: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          send_by?: string
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
          },
          {
            foreignKeyName: "chat_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["team_id"]
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
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "follows_followe_id_fkey"
            columns: ["followe_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "follows_followe_id_fkey"
            columns: ["followe_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_followe_id_fkey"
            columns: ["followe_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_followe_id_fkey"
            columns: ["followe_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_followe_id_fkey"
            columns: ["followe_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "follows_followe_id_fkey"
            columns: ["followe_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
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
            foreignKeyName: "like_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "like_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "like_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
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
            foreignKeyName: "member_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "member_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "technology"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["technology_id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
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
            foreignKeyName: "notification_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notification_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notification_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
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
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
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
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
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
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
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
            foreignKeyName: "reply_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "reply_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "reply_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "reply_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "reply_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "reply_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reply_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reply_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reply_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "reply_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
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
            foreignKeyName: "repost_original_post_id_fkey"
            columns: ["original_post_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "repost_original_post_id_fkey"
            columns: ["original_post_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "repost_original_post_id_fkey"
            columns: ["original_post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "repost_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "repost_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "repost_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repost_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repost_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repost_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "repost_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
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
            foreignKeyName: "request_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "request_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "technology"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "request_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["technology_id"]
          },
          {
            foreignKeyName: "request_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "request_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "request_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "request_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "request_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "request_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "request_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
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
      social_media: {
        Row: {
          account_link: string
          id: number
          platform: Database["public"]["Enums"]["social_media_platform"]
          user_id: string
        }
        Insert: {
          account_link: string
          id?: number
          platform: Database["public"]["Enums"]["social_media_platform"]
          user_id: string
        }
        Update: {
          account_link?: string
          id?: number
          platform?: Database["public"]["Enums"]["social_media_platform"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_media_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "social_media_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "social_media_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_media_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_media_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_media_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "social_media_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
          },
        ]
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
            foreignKeyName: "stack_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_technology_request_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "stack_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "stack_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "technology"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stack_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["technology_id"]
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
          {
            foreignKeyName: "team_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_technology_request_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "team_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["project_id"]
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
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
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
          level?: number
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
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "user_level_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "user_level_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_level_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_level_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_level_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "user_level_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
          },
        ]
      }
      user_role: {
        Row: {
          assigned_at: string | null
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
          },
        ]
      }
    }
    Views: {
      chat_view: {
        Row: {
          content: string | null
          created_at: string | null
          id: number | null
          send_by: string | null
          sender_name: string | null
          sender_username: string | null
          team_id: number | null
          team_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "chat_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
          },
          {
            foreignKeyName: "chat_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["team_id"]
          },
        ]
      }
      post_details: {
        Row: {
          author_avatar_url: string | null
          author_id: string | null
          author_name: string | null
          author_username: string | null
          content: string | null
          created_at: string | null
          has_bookmarked: boolean | null
          has_liked: boolean | null
          has_reposted: boolean | null
          img_url: string | null
          like_count: number | null
          post_id: number | null
          reply_avatars: string[] | null
          reply_count: number | null
          repost_count: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["author_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      post_details_with_replies: {
        Row: {
          author_avatar_url: string | null
          author_id: string | null
          author_name: string | null
          author_username: string | null
          content: string | null
          created_at: string | null
          has_bookmarked: boolean | null
          has_liked: boolean | null
          has_reposted: boolean | null
          img_url: string | null
          like_count: number | null
          post_id: number | null
          replies: Json | null
          reply_avatars: string[] | null
          reply_count: number | null
          repost_count: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["author_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      private_profile_view: {
        Row: {
          about_me: string | null
          avatar_url: string | null
          bio: string | null
          country_name: string | null
          created_at: string | null
          email: string | null
          id: string | null
          name: string | null
          skills: string[] | null
          status: Database["public"]["Enums"]["user_status"] | null
          streak_points: number | null
          token_hash: string | null
          updated_at: string | null
          user_level: number | null
          user_role: Database["public"]["Enums"]["app_role"] | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_technology_request_view: {
        Row: {
          project_created_at: string | null
          project_id: number | null
          project_img_url: string | null
          project_title: string | null
          request_count: number | null
          technologies: Json | null
        }
        Relationships: []
      }
      public_profile_view: {
        Row: {
          about_me: string | null
          avatar_url: string | null
          bio: string | null
          country_name: string | null
          created_at: string | null
          email: string | null
          id: string | null
          name: string | null
          skills: string[] | null
          status: Database["public"]["Enums"]["user_status"] | null
          streak_points: number | null
          user_level: number | null
          user_role: Database["public"]["Enums"]["app_role"] | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notifications_view: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          is_read: boolean | null
          name: string | null
          notification_id: number | null
          notification_type: string | null
          post_content: string | null
          post_img_url: string | null
          related_post_id: number | null
          related_user_id: string | null
          user_id: string | null
          username: string | null
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
            foreignKeyName: "notification_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notification_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notification_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "notification_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
          },
        ]
      }
      user_posts_with_reposts: {
        Row: {
          author_avatar_url: string | null
          author_id: string | null
          author_name: string | null
          author_username: string | null
          content: string | null
          created_at: string | null
          has_bookmarked: boolean | null
          has_liked: boolean | null
          has_reposted: boolean | null
          img_url: string | null
          is_repost: boolean | null
          like_count: number | null
          original_author_avatar_url: string | null
          original_author_id: string | null
          original_author_name: string | null
          original_author_username: string | null
          post_id: number | null
          quote_content: string | null
          quote_img_url: string | null
          reply_count: number | null
          repost_count: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["author_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["original_author_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_projects: {
        Row: {
          description: string | null
          github_repo_url: string | null
          img_url: string | null
          is_private: boolean | null
          owner_id: string | null
          project_created_at: string | null
          project_id: number | null
          project_updated_at: string | null
          repo_name: string | null
          team_created_at: string | null
          team_description: string | null
          team_id: number | null
          team_name: string | null
          technology_designation: string | null
          technology_id: number | null
          technology_name: string | null
          title: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "post_details"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "post_details_with_replies"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "private_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "public_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "project_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_posts_with_reposts"
            referencedColumns: ["original_author_id"]
          },
          {
            foreignKeyName: "technology_name_fkey"
            columns: ["technology_name"]
            isOneToOne: false
            referencedRelation: "technologies"
            referencedColumns: ["name"]
          },
        ]
      }
    }
    Functions: {
      accept_request: {
        Args: {
          user_id_param: string
          team_id_param: number
          tech_id_param: number
        }
        Returns: undefined
      }
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
        }
        Returns: boolean
      }
      calculate_user_points: {
        Args: {
          input_user_id: string
        }
        Returns: undefined
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
      delete_member: {
        Args: {
          p_user_id: string
          p_team_id: number
        }
        Returns: undefined
      }
      delete_user_notification: {
        Args: {
          p_notification_type: string
          p_related_post_id: number
          p_user_id: string
        }
        Returns: undefined
      }
      get_detailed_requests: {
        Args: {
          proj_id: number
        }
        Returns: {
          user_id: string
          sender_name: string
          sender_username: string
          sender_email: string
          sender_avatar_url: string
          tech_id: number
          tech_name: string
          tech_designation: string
          team_id: number
          request_status: Database["public"]["Enums"]["request_status"]
        }[]
      }
      get_last_project_details:
        | {
            Args: Record<PropertyKey, never>
            Returns: {
              project_id: number
              project_title: string
              project_description: string
              is_private: boolean
              repo_name: string
              project_img_url: string
              github_repo_url: string
              project_created_at: string
              project_updated_at: string
              team_members: Json
              stack: Json
              project_owner: Json
            }[]
          }
        | {
            Args: {
              p_user_id: string
            }
            Returns: {
              project_id: number
              project_title: string
              project_description: string
              is_private: boolean
              repo_name: string
              project_img_url: string
              github_repo_url: string
              project_created_at: string
              project_updated_at: string
              team_members: Json
              stack: Json
              project_owner: Json
            }[]
          }
      get_project_details_by_id: {
        Args: {
          project_id_param: number
        }
        Returns: {
          project_id: number
          project_title: string
          project_description: string
          is_private: boolean
          repo_name: string
          project_img_url: string
          github_repo_url: string
          project_created_at: string
          project_updated_at: string
          team_members: Json
          stack: Json
          project_owner: Json
        }[]
      }
      get_recent_users: {
        Args: {
          num_users: number
          p_user_id: string
        }
        Returns: {
          user_id: string
          username: string
          name: string
          avatar_url: string
          signup_date: string
        }[]
      }
      get_users_in_same_team: {
        Args: {
          p_user_id: string
        }
        Returns: {
          user_id: string
          username: string
          name: string
          avatar_url: string
        }[]
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
      promote_to_pro: {
        Args: {
          input_user_id: string
        }
        Returns: undefined
      }
      reject_request: {
        Args: {
          user_id_param: string
          team_id_param: number
          tech_id_param: number
        }
        Returns: undefined
      }
      search_projects: {
        Args: {
          query?: string
          tech_filter?: string[]
        }
        Returns: {
          project_id: number
          image_url: string
          title: string
          tech_stack: Json
          knock_count: number
          created_at: string
        }[]
      }
      update_profile_and_social_media: {
        Args: {
          p_user_id: string
          p_about_me: string
          p_skills: string[]
          p_social_media: Json
        }
        Returns: undefined
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
      social_media_platform:
        | "Other"
        | "Google"
        | "LinkedIn"
        | "X"
        | "Facebook"
        | "Instagram"
        | "GitHub"
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
