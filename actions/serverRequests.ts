"use server"

import { sql } from "@vercel/postgres"
import { getSession } from "@/lib/session"
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

export async function getUserTournaments(
  user: string,
): Promise<QueryResultRow[]> {
  const queryResult = await sql`
  SELECT t.url, t.name, t.type, t.game, t.created_at, COUNT(tp.id) FROM ta_tournaments t
  JOIN ta_auth ta ON host = ta.auth_id
  LEFT JOIN ta_participants tp ON t.id = tp.tournament_id
  WHERE ta.username = ${user}
  GROUP BY t.url, t.name, t.type, t.game, t.created_at
  `
  return queryResult.rows
}

export async function getUserById(id: string): Promise<QueryResultRow> {
  const queryResult = await sql`SELECT * FROM ta_auth WHERE auth_id = ${id}`
  return queryResult.rows?.[0]
}

export async function getProfilePictureURL(): Promise<
  QueryResultRow[string] | null
> {
  try {
    const session = await getSession()
    const authID = session?.user?.authID
    const profileURL =
      await sql`SELECT picture_url FROM ta_auth WHERE auth_id = ${authID}`
    return profileURL?.rows?.[0]?.picture_url
  } catch (error) {
    return null
  }
}
