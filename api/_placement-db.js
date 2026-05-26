import fs from 'node:fs/promises';
import path from 'node:path';
import { Pool } from 'pg';

let pool = null;
let tableReadyPromise = null;

function getPool() {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) return null;
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: process.env.DATABASE_SSL === 'disable' ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

async function ensurePlacementTable(poolInstance) {
  if (tableReadyPromise) return tableReadyPromise;
  tableReadyPromise = poolInstance.query(`
    CREATE TABLE IF NOT EXISTS placement_submissions (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      source TEXT,
      lead JSONB NOT NULL,
      result JSONB NOT NULL,
      writing_answer TEXT NOT NULL,
      grammar_answers JSONB NOT NULL
    );
  `);
  await tableReadyPromise;
}

function resolveDbPath() {
  if (process.env.PLACEMENT_DB_PATH?.trim()) {
    return process.env.PLACEMENT_DB_PATH.trim();
  }
  if (process.env.VERCEL) {
    return '/tmp/placement-submissions.json';
  }
  return path.join(process.cwd(), 'data', 'placement-submissions.json');
}

async function ensureDbFile(filePath) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]', 'utf8');
  }
}

async function readAll(filePath) {
  await ensureDbFile(filePath);
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

async function writeAll(filePath, records) {
  await fs.writeFile(filePath, JSON.stringify(records, null, 2), 'utf8');
}

export async function savePlacementSubmission(submission) {
  const poolInstance = getPool();
  const record = {
    id: `pls_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    ...submission,
  };

  if (poolInstance) {
    await ensurePlacementTable(poolInstance);
    await poolInstance.query(
      `
      INSERT INTO placement_submissions (
        id, created_at, source, lead, result, writing_answer, grammar_answers
      )
      VALUES ($1, $2, $3, $4::jsonb, $5::jsonb, $6, $7::jsonb);
      `,
      [
        record.id,
        record.createdAt,
        record.source || null,
        JSON.stringify(record.lead || {}),
        JSON.stringify(record.result || {}),
        record.writingAnswer || '',
        JSON.stringify(record.grammarAnswers || []),
      ]
    );
    return record;
  }

  const filePath = resolveDbPath();
  const records = await readAll(filePath);
  records.unshift(record);
  const trimmed = records.slice(0, 5000);
  await writeAll(filePath, trimmed);
  return record;
}

export async function listPlacementSubmissions(limit = 100) {
  const max = Math.max(1, Math.min(limit, 1000));
  const poolInstance = getPool();
  if (poolInstance) {
    await ensurePlacementTable(poolInstance);
    const result = await poolInstance.query(
      `
      SELECT id, created_at, source, lead, result, writing_answer, grammar_answers
      FROM placement_submissions
      ORDER BY created_at DESC
      LIMIT $1;
      `,
      [max]
    );
    return result.rows.map((row) => ({
      id: row.id,
      createdAt: row.created_at,
      source: row.source,
      lead: row.lead,
      result: row.result,
      writingAnswer: row.writing_answer,
      grammarAnswers: row.grammar_answers,
    }));
  }

  const filePath = resolveDbPath();
  const records = await readAll(filePath);
  return records.slice(0, max);
}
