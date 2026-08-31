/**
 * Terminology Database
 * SQLite-backed terminology store using better-sqlite3.
 * In-memory by default; persists to file if dbPath is provided.
 *
 * Usage:
 *   const db = new TerminologyDB();
 *   const db = new TerminologyDB('/path/to/terminology.db');
 */
import Database from 'better-sqlite3';
import path from 'path';

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
}

export class TerminologyDB {
  private db: Database.Database;
  private config: TerminologyConfig;

  /**
   * @param dbPath - SQLite file path. Omit for in-memory DB.
   * @param config - Table name configuration.
   */
  constructor(dbPath?: string, config?: TerminologyConfig) {
    const defaultConfig: TerminologyConfig = {
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
    };
    this.config = config ?? defaultConfig;

    if (dbPath) {
      this.db = new Database(dbPath);
    } else {
      this.db = new Database(':memory:');
    }

    // Enable WAL mode for better concurrent read performance
    this.db.pragma('journal_mode = WAL');
  }

  /** Close the database connection. */
  close(): void {
    this.db.close();
  }

  /** Run a raw SQL query (for SELECT). Returns rows as objects. */
  query<T = Record<string, unknown>>(sql: string, params?: unknown[]): T[] {
    const stmt = this.db.prepare(sql);
    return (params ? stmt.all(...params) : stmt.all()) as T[];
  }

  /** Run a raw SQL statement (for INSERT/UPDATE/DELETE). Returns changes count. */
  run(sql: string, params?: unknown[]): Database.RunResult {
    const stmt = this.db.prepare(sql);
    return params ? stmt.run(...params) : stmt.run();
  }

  /** Get a single row by SQL. Returns one object or undefined. */
  get<T = Record<string, unknown>>(sql: string, params?: unknown[]): T | undefined {
    const stmt = this.db.prepare(sql);
    return (params ? stmt.get(...params) : stmt.get()) as T | undefined;
  }

  /** Bulk insert rows. */
  bulkInsert(table: string, columns: string[], rows: unknown[][]): void {
    const placeholders = rows.map(() => `(${columns.map(() => '?').join(', ')})`).join(', ');
    const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES ${placeholders}`;
    const flat = rows.flat();
    this.run(sql, flat);
  }

  /** Drop table if exists. */
  dropTable(table: string): void {
    this.run(`DROP TABLE IF EXISTS ${table}`);
  }

  /** Create table with given schema. */
  createTable(table: string, columns: { name: string; type: string; primaryKey?: boolean }[]): void {
    const defs = columns.map(c => `${c.name} ${c.type}`).join(', ');
    this.run(`CREATE TABLE IF NOT EXISTS ${table} (${defs})`);
  }

  /** Get all table names. */
  tables(): string[] {
    return this.query<{ name: string }>("SELECT name FROM sqlite_master WHERE type='table'").map(r => r.name);
  }

  /** Count rows in a table. */
  count(table: string): number {
    const result = this.get<{ cnt: number }>(`SELECT COUNT(*) as cnt FROM ${table}`);
    return result?.cnt ?? 0;
  }

  // ─── ICD10 ─────────────────────────────────────────────────────────────────

  /** Find ICD10 by code. */
  findIcd10(code: string) {
    return this.get<{ id: number; icd10_code: string; icd10_en: string; icd10_id: string; active: boolean }>(
      `SELECT * FROM ${this.config.icd10_table_name} WHERE icd10_code = ? LIMIT 1`,
      [code]
    );
  }

  /** Search ICD10 by code prefix or English/Indonesian display. */
  searchIcd10(term: string, limit = 20) {
    const t = `%${term}%`;
    return this.query(
      `SELECT * FROM ${this.config.icd10_table_name}
       WHERE icd10_code LIKE ? OR icd10_en LIKE ? OR icd10_id LIKE ?
       LIMIT ?`,
      [t, t, t, limit]
    );
  }

  // ─── ICD9CM ────────────────────────────────────────────────────────────────

  /** Find ICD9CM by code. */
  findIcd9cm(code: string) {
    return this.get(
      `SELECT * FROM ${this.config.icd9cm_table_name} WHERE icd9cm_code = ? LIMIT 1`,
      [code]
    );
  }

  /** Search ICD9CM. */
  searchIcd9cm(term: string, limit = 20) {
    const t = `%${term}%`;
    return this.query(
      `SELECT * FROM ${this.config.icd9cm_table_name}
       WHERE icd9cm_code LIKE ? OR icd9cm_en LIKE ? OR icd9cm_id LIKE ?
       LIMIT ?`,
      [t, t, t, limit]
    );
  }

  // ─── SNOMED CT ─────────────────────────────────────────────────────────────

  /** Find SNOMED CT concept by code. */
  findSnomedct(code: string) {
    return this.get(
      `SELECT * FROM ${this.config.snomedct_table_name} WHERE code = ? LIMIT 1`,
      [code]
    );
  }

  /** Search SNOMED CT by code or description. */
  searchSnomedct(term: string, limit = 20) {
    const t = `%${term}%`;
    return this.query(
      `SELECT * FROM ${this.config.snomedct_table_name}
       WHERE code LIKE ? OR fsn LIKE ? OR preferred LIKE ?
       LIMIT ?`,
      [t, t, t, limit]
    );
  }

  // ─── LOINC ─────────────────────────────────────────────────────────────────

  /** Find LOINC by LOINC_NUM. */
  findLoinc(loincNum: string) {
    return this.get(
      `SELECT * FROM ${this.config.loinc_table_name} WHERE LOINC_NUM = ? LIMIT 1`,
      [loincNum]
    );
  }

  /** Search LOINC. */
  searchLoinc(term: string, limit = 20) {
    const t = `%${term}%`;
    return this.query(
      `SELECT * FROM ${this.config.loinc_table_name}
       WHERE LOINC_NUM LIKE ? OR COMPONENT LIKE ? OR LONG_COMMON_NAME LIKE ?
       LIMIT ?`,
      [t, t, t, limit]
    );
  }

  // ─── Kode Wilayah Indonesia ─────────────────────────────────────────────────

  /** Find wilayah by kode_wilayah. */
  findWilayah(kode: string) {
    return this.get(
      `SELECT * FROM ${this.config.kode_wilayah_indonesia_table_name} WHERE kode_wilayah = ? LIMIT 1`,
      [kode]
    );
  }

  /** Find child wilayats by parent code. */
  findChildren(parent: string) {
    return this.query(
      `SELECT * FROM ${this.config.kode_wilayah_indonesia_table_name} WHERE parent = ?`,
      [parent]
    );
  }

  /** Get provinces (level 1). */
  getProvinces() {
    return this.query(
      `SELECT * FROM ${this.config.kode_wilayah_indonesia_table_name} WHERE level = 1`
    );
  }

  // ─── UCUM ──────────────────────────────────────────────────────────────────

  /** Find UCUM unit by code. */
  findUcum(code: string) {
    return this.get(
      `SELECT * FROM ${this.config.ucum_table_name} WHERE code = ? LIMIT 1`,
      [code]
    );
  }

  /** Search UCUM units. */
  searchUcum(term: string, limit = 20) {
    const t = `%${term}%`;
    return this.query(
      `SELECT * FROM ${this.config.ucum_table_name}
       WHERE code LIKE ? OR descriptive_name LIKE ? OR definition LIKE ?
       LIMIT ?`,
      [t, t, t, limit]
    );
  }

  // ─── CVX ───────────────────────────────────────────────────────────────────

  /** Find CVX vaccine by code. */
  findCvx(code: string) {
    return this.get(
      `SELECT * FROM ${this.config.cvx_table_name} WHERE cvx_code = ? LIMIT 1`,
      [code]
    );
  }

  // ─── KFA ───────────────────────────────────────────────────────────────────

  /** Find KFA product by kfa_code. */
  findKfa(code: string) {
    return this.get(
      `SELECT * FROM ${this.config.kfa_table_name} WHERE kfa_code = ? LIMIT 1`,
      [code]
    );
  }

  /** Search KFA products. */
  searchKfa(term: string, limit = 20) {
    const t = `%${term}%`;
    return this.query(
      `SELECT * FROM ${this.config.kfa_table_name}
       WHERE kfa_code LIKE ? OR display_name LIKE ? OR brand LIKE ?
       LIMIT ?`,
      [t, t, t, limit]
    );
  }

  // ─── KemkesTerm ────────────────────────────────────────────────────────────

  /** Find KemkesTerm by code and resource_type. */
  findKemkesTerm(code: string, resourceType?: string) {
    if (resourceType) {
      return this.get(
        `SELECT * FROM ${this.config.kemkesterm_table_name} WHERE code = ? AND resource_type = ? LIMIT 1`,
        [code, resourceType]
      );
    }
    return this.get(
      `SELECT * FROM ${this.config.kemkesterm_table_name} WHERE code = ? LIMIT 1`,
      [code]
    );
  }

  /** Search KemkesTerm by display or code. */
  searchKemkesTerm(term: string, limit = 20) {
    const t = `%${term}%`;
    return this.query(
      `SELECT * FROM ${this.config.kemkesterm_table_name}
       WHERE code LIKE ? OR display LIKE ? OR display_en LIKE ?
       LIMIT ?`,
      [t, t, t, limit]
    );
  }

  // ─── FHIR R4 Term ──────────────────────────────────────────────────────────

  /** Find FHIR R4 Term by id or url. */
  findFhirR4term(identifier: string) {
    return this.get(
      `SELECT * FROM ${this.config.fhirr4term_table_name} WHERE id = ? OR url = ? LIMIT 1`,
      [identifier, identifier]
    );
  }

  // ─── FHIR R4 ValueSet ──────────────────────────────────────────────────────

  /** Find FHIR R4 ValueSet by id or url. */
  findFhirR4vs(identifier: string) {
    return this.get(
      `SELECT * FROM ${this.config.fhirr4vs_table_name} WHERE id = ? OR url = ? LIMIT 1`,
      [identifier, identifier]
    );
  }

  // ─── KPTL ──────────────────────────────────────────────────────────────────

  /** Find KPTL base procedure by base_code. */
  findKptlBase(baseCode: string) {
    return this.get(
      `SELECT * FROM ${this.config.kptl_base_table_name} WHERE base_code = ? LIMIT 1`,
      [baseCode]
    );
  }

  /** Find KPTL modifier by modifier_code. */
  findKptlModifier(modifierCode: string) {
    return this.get(
      `SELECT * FROM ${this.config.kptl_modifier_table_name} WHERE modifier_code = ? LIMIT 1`,
      [modifierCode]
    );
  }

  /** Find KPTL kamar (room/action) by kode_kptl. */
  findKptlKamar(kode: string) {
    return this.get(
      `SELECT * FROM ${this.config.kptl_kamar_table_name} WHERE kode_kptl = ? LIMIT 1`,
      [kode]
    );
  }

  /** Find KPTL base-modifier mapping by base_code. */
  findKptlBaseModifierMapping(baseCode: string) {
    return this.query(
      `SELECT * FROM ${this.config.kptl_base_modifier_mapping_table_name} WHERE base_code = ?`,
      [baseCode]
    );
  }

  // ─── LOINC Answer ──────────────────────────────────────────────────────────

  /** Find LOINC answers by LoincNumber. */
  findLoincAnswer(loincNum: string) {
    return this.query(
      `SELECT * FROM ${this.config.loinc_answer_table_name} WHERE LoincNumber = ? ORDER BY SequenceNumber`,
      [loincNum]
    );
  }
}
