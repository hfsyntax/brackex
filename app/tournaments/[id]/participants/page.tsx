import { getTournamentHost } from "@/actions/serverRequests"
import Sidebar from "@/components/Sidebar"
import { getSession } from "@/lib/session"
export default async function TournamentParticipants({
  params,
}: {
  params: any
}) {
  const session = await getSession()
  const username = session?.user?.username
  const tournamentHost = await getTournamentHost(params?.id)
  return tournamentHost === username ? (
    <Sidebar
      items={[
        "../Standings",
        "../Announcements",
        "../Log",
        "Participants",
        "../Report Scores",
        "../Settings",
      ]}
    />
  ) : (
    <span className="text-white">401 Unauthorized</span>
  )
}
