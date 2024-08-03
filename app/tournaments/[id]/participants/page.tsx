import Sidebar from "@/components/Sidebar"
export default function TournamentParticipants() {
  return (
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
  )
}
