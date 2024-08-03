import Sidebar from "@/components/Sidebar"
import { getSession } from "@/lib/session"
import { getTournamentHost } from "@/actions/serverRequests"
export default async function TournamentSettings({ params }: { params: any }) {
  const session = await getSession()
  const username = session?.user?.username
  const tournamentHost = await getTournamentHost(params?.id)
  return tournamentHost === username ? (
    <Sidebar
      items={[
        "../Standings",
        "../Announcements",
        "../Log",
        "../Participants",
        "../Report Scores",
        "Settings",
      ]}
    />
  ) : (
    <span className="text-white">401 Unauthorized</span>
  )
}
