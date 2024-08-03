import Sidebar from "@/components/Sidebar"
export default function TournamentSettings() {
  return (
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
  )
}
