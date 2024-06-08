export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      audit_details: {
        Row: {
          description: string | null;
          documentationLink: string | null;
          id: string;
          key: string;
          title: string;
          unit: string | null;
        };
        Insert: {
          description?: string | null;
          documentationLink?: string | null;
          id?: string;
          key: string;
          title: string;
          unit?: string | null;
        };
        Update: {
          description?: string | null;
          documentationLink?: string | null;
          id?: string;
          key?: string;
          title?: string;
          unit?: string | null;
        };
        Relationships: [];
      };
      audits: {
        Row: {
          actual_value: number;
          audit_detailsId: string;
          id: string;
          reportsId: string;
          score: number;
        };
        Insert: {
          actual_value: number;
          audit_detailsId: string;
          id?: string;
          reportsId: string;
          score: number;
        };
        Update: {
          actual_value?: number;
          audit_detailsId?: string;
          id?: string;
          reportsId?: string;
          score?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'audits_audit_detailsid_fkey';
            columns: ['audit_detailsId'];
            isOneToOne: false;
            referencedRelation: 'audit_details';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'audits_reportsid_fkey';
            columns: ['reportsId'];
            isOneToOne: false;
            referencedRelation: 'reports';
            referencedColumns: ['id'];
          },
        ];
      };
      reports: {
        Row: {
          created_at: string;
          id: string;
          version: string;
          websitesId: string;
        };
        Insert: {
          created_at: string;
          id?: string;
          version: string;
          websitesId: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          version?: string;
          websitesId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reports_websitesid_fkey';
            columns: ['websitesId'];
            isOneToOne: false;
            referencedRelation: 'websites';
            referencedColumns: ['id'];
          },
        ];
      };
      websites: {
        Row: {
          active: boolean;
          id: string;
          name: string | null;
          url: string;
        };
        Insert: {
          active?: boolean;
          id?: string;
          name?: string | null;
          url: string;
        };
        Update: {
          active?: boolean;
          id?: string;
          name?: string | null;
          url?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
