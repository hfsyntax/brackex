import { getTournamentHost } from "@/actions/serverRequests"
import Sidebar from "@/components/Sidebar"
import { getSession } from "@/lib/session"

export const metadata = {
  title: "Brackex - Tournament Announcements",
  description: "Announcements page for a tournament",
}

export default async function TournamentAnnouncements({
  params,
}: {
  params: any
}) {
  const session = await getSession()
  const username = session?.user?.username
  const tournamentHost = await getTournamentHost(params?.id)
  return (
    <>
      <Sidebar
        items={
          tournamentHost === username
            ? [
                "../Standings",
                "Announcements",
                "../Log",
                "../Participants",
                "../Report Scores",
                "../Settings",
              ]
            : ["../Standings", "Announcements", "../Log"]
        }
      />
    </>
  )
}
