import { getTournamentByURL } from "@/actions/serverRequests"
import Sidebar from "@/components/Sidebar"
import { getSession } from "@/lib/session"
export default async function TournamentID({ params }: { params: any }) {
  const tournament = await getTournamentByURL(params.id)
  const session = await getSession()
  const username = session?.user?.username
  if (tournament) {
    return (
      <>
        <div className="ml-auto mr-auto mt-3 flex w-fit bg-slate-700 p-4 text-white">
          <div>
            <span className="block p-1 text-white">
              Players: {tournament?.name}
            </span>
            <span className="block p-1 text-white">
              Format: {tournament?.type}
            </span>
            <span className="block p-1 text-white">
              Game: {tournament?.game}
            </span>
            <span className="block p-1 text-white">
              Start Time: {new Date(tournament?.created_at).toLocaleString()}
            </span>
          </div>
          <span>Organized by {tournament?.host}</span>
        </div>

        <Sidebar
          items={
            username === tournament?.host
              ? [
                  "Standings",
                  "Announcements",
                  "Log",
                  "Participants",
                  "Report Scores",
                  "Settings",
                ]
              : ["Standings", "Announcements", "Log"]
          }
          defaultSelected="Standings"
        />
      </>
    )
  } else {
    return <span className="text-white">not found</span>
  }
}
