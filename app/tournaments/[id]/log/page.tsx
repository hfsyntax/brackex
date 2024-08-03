import Sidebar from "@/components/Sidebar"
import { getSession } from "@/lib/session"
import { getTournamentHost } from "@/actions/serverRequests"
export default async function TournamentLog({ params }: { params: any }) {
  const session = await getSession()
  const username = session?.user?.username
  const tournamentHost = await getTournamentHost(params?.id)
  return (
    <Sidebar
      items={
        tournamentHost === username
          ? [
              "../Standings",
              "../Announcements",
              "Log",
              "../Participants",
              "../Report Scores",
              "../Settings",
            ]
          : ["../Standings", "../Announcements", "Log"]
      }
    />
  )
}
