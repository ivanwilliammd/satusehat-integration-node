/**
 * SATUSEHAT Integration Configuration
 * Ported from Laravel config/satusehatintegration.php
 */

export interface TerminologyConfig {
  icd10_table_name: string;
  icd9cm_table_name: string;
  loinc_table_name: string;
  loinc_answer_table_name: string;
  kode_wilayah_indonesia_table_name: string;
  snomedct_table_name: string;
  cvx_table_name: string;
  ucum_table_name: string;
  kfa_table_name: string;
  kemkesterm_table_name: string;
  fhirr4term_table_name: string;
  fhirr4vs_table_name: string;
  kptl_base_table_name: string;
  kptl_modifier_table_name: string;
  kptl_base_modifier_mapping_table_name: string;
  kptl_kamar_table_name: string;
  log_table_name: string;
  token_table_name: string;
  database_connection_master: string;
  database_connection_satusehat: string;
  /** Override SS parameters: environment, organization_id, client_id, client_secret */
  ss_parameter_override: {
    enabled: boolean;
    driver: 'env' | 'database';
    parameters: {
      environment?: string;
      organization_id?: string;
      organization_name?: string;
      client_id?: string;
      client_secret?: string;
    };
  };
  tenancy: {
    enabled: boolean;
    default_team_key?: string;
    teams_table_name: string;
    team_key_column: string;
    connection: string;
    cache_ttl: number;
    columns: {
      client_id: string;
      client_secret: string;
      organization_id: string;
      organization_name: string;
      environment: string;
    };
  };
}

const config: TerminologyConfig = {
  // Table names
  icd10_table_name: 'satusehat_icd10',
  icd9cm_table_name: 'satusehat_icd9cm',
  loinc_table_name: 'satusehat_loinc',
  loinc_answer_table_name: 'satusehat_loinc_answer',
  kode_wilayah_indonesia_table_name: 'kode_wilayah_indonesia',
  snomedct_table_name: 'satusehat_snomedct',
  cvx_table_name: 'satusehat_cvx',
  ucum_table_name: 'satusehat_ucum',
  kfa_table_name: 'satusehat_kfa',
  kemkesterm_table_name: 'satusehat_kemkesterm',
  fhirr4term_table_name: 'fhir_r4_term',
  fhirr4vs_table_name: 'fhir_r4_vs',
  kptl_base_table_name: 'kptl_base',
  kptl_modifier_table_name: 'kptl_modifier',
  kptl_base_modifier_mapping_table_name: 'kptl_base_modifier_mapping',
  kptl_kamar_table_name: 'kptl_kamar',
  log_table_name: 'satusehat_log',
  token_table_name: 'satusehat_token',

  // Database connections (use env vars in real usage)
  database_connection_master: process.env.DB_CONNECTION_MASTER ?? 'mysql',
  database_connection_satusehat: process.env.DB_CONNECTION ?? 'mysql',

  // SS Parameter override (from env vars)
  ss_parameter_override: {
    enabled: process.env.SATUSEHAT_PARAMETER_OVERRIDE === 'true',
    driver: (process.env.SATUSEHAT_PARAMETER_DRIVER as 'env' | 'database') ?? 'env',
    parameters: {
      environment: process.env.SATUSEHAT_ENVIRONMENT,
      organization_id: process.env.SATUSEHAT_ORGANIZATION_ID,
      organization_name: process.env.SATUSEHAT_ORGANIZATION_NAME,
      client_id: process.env.SATUSEHAT_CLIENT_ID,
      client_secret: process.env.SATUSEHAT_CLIENT_SECRET,
    },
  },

  // Multi-tenancy config
  tenancy: {
    enabled: process.env.SATUSEHAT_MULTI_TENANT === 'true',
    default_team_key: process.env.SATUSEHAT_DEFAULT_TEAM,
    teams_table_name: process.env.SATUSEHAT_TEAMS_TABLE ?? 'satusehat_teams',
    team_key_column: process.env.SATUSEHAT_TEAMS_KEY_COLUMN ?? 'team_key',
    connection: process.env.SATUSEHAT_TEAMS_CONNECTION ?? process.env.DB_CONNECTION_MASTER ?? 'mysql',
    cache_ttl: parseInt(process.env.SATUSEHAT_TEAMS_CACHE_TTL ?? '300', 10),
    columns: {
      client_id: process.env.SATUSEHAT_TEAMS_CLIENT_ID_COL ?? 'client_id',
      client_secret: process.env.SATUSEHAT_TEAMS_CLIENT_SECRET_COL ?? 'client_secret',
      organization_id: process.env.SATUSEHAT_TEAMS_ORGANIZATION_ID_COL ?? 'organization_id',
      organization_name: process.env.SATUSEHAT_TEAMS_ORGANIZATION_NAME_COL ?? 'organization_name',
      environment: process.env.SATUSEHAT_TEAMS_ENVIRONMENT_COL ?? 'environment',
    },
  },
};

export default config;
