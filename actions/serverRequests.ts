"use server"

import { sql } from "@vercel/postgres"
import type { QueryResultRow } from "@vercel/postgres"
export async function getTournamentByURL(
  url: string,
): Promise<QueryResultRow | null> {
  const queryResult =
    await sql`SELECT name, type, created_at, updated_at, game, url, description FROM ta_tournaments where url = ${url}`
  return queryResult.rowCount === 1 ? queryResult.rows[0] : null
}
