import Sidebar from "@/components/Sidebar"
export default function TournamentLog() {
  return (
    <Sidebar
      items={[
        "../Standings",
        "../Announcements",
        "Log",
        "../Participants",
        "../Report Scores",
        "../Settings",
      ]}
    />
  )
}
