"use server"

import { sql } from "@vercel/postgres"
import type { QueryResultRow } from "@vercel/postgres"
export async function getTournamentByURL(
  url: string,
): Promise<QueryResultRow | null> {
  const queryResult =
    await sql`SELECT t.name, t.type, t.created_at, t.updated_at, t.game, t.url, t.description, ta.username as host 
    FROM ta_tournaments t
    JOIN ta_auth ta ON t.host = ta.auth_id
    where url = ${url}`
  return queryResult.rowCount === 1 ? queryResult.rows[0] : null
}

export async function getTournamentHost(url: string): Promise<string> {
  const queryResult = await sql`SELECT ta.username as host 
    FROM ta_tournaments t
    JOIN ta_auth ta ON t.host = ta.auth_id
    where url = ${url}`
  return queryResult.rowCount === 1 ? queryResult?.rows?.[0]?.host : null
}
