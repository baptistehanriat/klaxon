export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      offices: {
        Row: {
          address: string
          coordinates: string
          id: string
          name: string
        }
        Insert: {
          address: string
          coordinates: string
          id?: string
          name: string
        }
        Update: {
          address?: string
          coordinates?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          destination_id: string | null
          detour_max: number | null
          email: string | null
          home_address: string | null
          home_coordinates: string | null
          id: string
          name: string | null
          phone_number: string | null
        }
        Insert: {
          created_at?: string
          destination_id?: string | null
          detour_max?: number | null
          email?: string | null
          home_address?: string | null
          home_coordinates?: string | null
          id?: string
          name?: string | null
          phone_number?: string | null
        }
        Update: {
          created_at?: string
          destination_id?: string | null
          detour_max?: number | null
          email?: string | null
          home_address?: string | null
          home_coordinates?: string | null
          id?: string
          name?: string | null
          phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
