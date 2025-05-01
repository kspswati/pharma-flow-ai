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
      "PharmaFlow.AI": {
        Row: {
          asndn_: string | null
          brand: string | null
          country: string | null
          delivered_to_client_date: string | null
          delivery_recorded_date: string | null
          dosage: string | null
          dosage_form: string | null
          first_line_designation: string | null
          freight_cost_usd: string | null
          fulfill_via: string | null
          id: number | null
          item_description: string | null
          line_item_insurance_usd: string | null
          line_item_quantity: number | null
          line_item_value: number | null
          managed_by: string | null
          manufacturing_site: string | null
          moleculetest_type: string | null
          pack_price: number | null
          po__so_: string | null
          po_sent_to_vendor_date: string | null
          pq_: string | null
          pq_first_sent_to_client_date: string | null
          product_group: string | null
          project_code: string | null
          scheduled_delivery_date: string | null
          shipment_mode: string | null
          sub_classification: string | null
          unit_of_measure_per_pack: number | null
          unit_price: number | null
          vendor: string | null
          vendor_inco_term: string | null
          weight_kilograms: string | null
        }
        Insert: {
          asndn_?: string | null
          brand?: string | null
          country?: string | null
          delivered_to_client_date?: string | null
          delivery_recorded_date?: string | null
          dosage?: string | null
          dosage_form?: string | null
          first_line_designation?: string | null
          freight_cost_usd?: string | null
          fulfill_via?: string | null
          id?: number | null
          item_description?: string | null
          line_item_insurance_usd?: string | null
          line_item_quantity?: number | null
          line_item_value?: number | null
          managed_by?: string | null
          manufacturing_site?: string | null
          moleculetest_type?: string | null
          pack_price?: number | null
          po__so_?: string | null
          po_sent_to_vendor_date?: string | null
          pq_?: string | null
          pq_first_sent_to_client_date?: string | null
          product_group?: string | null
          project_code?: string | null
          scheduled_delivery_date?: string | null
          shipment_mode?: string | null
          sub_classification?: string | null
          unit_of_measure_per_pack?: number | null
          unit_price?: number | null
          vendor?: string | null
          vendor_inco_term?: string | null
          weight_kilograms?: string | null
        }
        Update: {
          asndn_?: string | null
          brand?: string | null
          country?: string | null
          delivered_to_client_date?: string | null
          delivery_recorded_date?: string | null
          dosage?: string | null
          dosage_form?: string | null
          first_line_designation?: string | null
          freight_cost_usd?: string | null
          fulfill_via?: string | null
          id?: number | null
          item_description?: string | null
          line_item_insurance_usd?: string | null
          line_item_quantity?: number | null
          line_item_value?: number | null
          managed_by?: string | null
          manufacturing_site?: string | null
          moleculetest_type?: string | null
          pack_price?: number | null
          po__so_?: string | null
          po_sent_to_vendor_date?: string | null
          pq_?: string | null
          pq_first_sent_to_client_date?: string | null
          product_group?: string | null
          project_code?: string | null
          scheduled_delivery_date?: string | null
          shipment_mode?: string | null
          sub_classification?: string | null
          unit_of_measure_per_pack?: number | null
          unit_price?: number | null
          vendor?: string | null
          vendor_inco_term?: string | null
          weight_kilograms?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
