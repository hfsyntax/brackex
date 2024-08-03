import { getTournamentByURL } from "@/actions/serverRequests"
import Sidebar from "@/components/Sidebar"
export default async function TournamentID({ params }: { params: any }) {
  const tournament = await getTournamentByURL(params.id)
  if (tournament) {
    return (
      <>
        <div className="ml-auto mr-auto mt-3 w-fit bg-slate-700 p-4 text-white">
          <span className="block p-1 text-white">
            Players: {tournament?.name}
          </span>
          <span className="block p-1 text-white">
            Format: {tournament?.type}
          </span>
          <span className="block p-1 text-white">Game: {tournament?.game}</span>
          <span className="block p-1 text-white">
            Start Time: {String(tournament?.created_at)}
          </span>
        </div>
        <Sidebar
          items={[
            "Standings",
            "Announcements",
            "Log",
            "Participants",
            "Report Scores",
            "Settings",
          ]}
          defaultSelected="Standings"
        />
      </>
    )
  } else {
    return <span className="text-white">not found</span>
  }
}
