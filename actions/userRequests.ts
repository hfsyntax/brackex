"use server"
import { getSession } from "@/lib/session"
import { revalidatePath } from "next/cache"
import { sql } from "@vercel/postgres"

export type FormResult =
  | {
      error: string
      success?: undefined
    }
  | {
      success: string
      error?: undefined
    }

export async function createTournament(
  prevState: any,
  formData: FormData,
): Promise<FormResult | void> {
  const session = await getSession()
  if (session) {
    if (!formData) {
      revalidatePath("/tournaments/new")
      return { error: "no form data" }
    }
    const formInputs = ["name", "url", "description", "game", "type", "time"]
    for (let input of formInputs) {
      if (!formData.get(input)) {
        revalidatePath("/tournaments/new")
        return { error: `tournament ${input} cannot be empty` }
      }
    }
    const name = String(formData.get("name"))

    if (name.length > 255) {
      revalidatePath("/tournaments/new")
      return {
        error: "tournament name must be 255 characters or less",
      }
    }

    const url = String(formData.get("url"))

    if (url.length > 60) {
      revalidatePath("/tournaments/new")
      return {
        error: "tournament url must be 60 characters or less",
      }
    }

    const description = String(formData.get("description"))

    if (description.length > 300) {
      revalidatePath("/tournaments/new")
      return {
        error: "tournament description must be 300 characters or less",
      }
    }

    const game = String(formData.get("game"))

    if (game.length > 255) {
      revalidatePath("/tournaments/new")
      return {
        error: "tournament game must be 255 characters or less",
      }
    }
    const tournamentType = String(formData.get("type"))

    if (tournamentType !== "Bracket" && tournamentType !== "Survival") {
      revalidatePath("/tournaments/new")
      return {
        error: "invalid tournament type",
      }
    }
    const startTime = new Date(String(formData.get("time")))
    if (
      !(startTime instanceof Date) ||
      (startTime instanceof Date && isNaN(startTime.getTime()))
    ) {
      revalidatePath("/tournaments/new")
      return {
        error: "invalid start time",
      }
    }

    const urlExists = await sql`SELECT 1 from ta_tournaments where url = ${url}`
    if (urlExists.rowCount && urlExists.rowCount > 0) {
      revalidatePath("/tournaments/new")
      return { error: "tournament url already exists" }
    }

    const queryResult = await sql`
    INSERT INTO ta_tournaments (name, type, created_at, updated_at, game, url, description, host) 
    VALUES (${name}, ${tournamentType}, ${new Date().toISOString()}, ${new Date().toISOString()}, ${game}, ${url}, ${description}, ${session?.user?.authID} )`
    return { success: "success" }
  }
}
