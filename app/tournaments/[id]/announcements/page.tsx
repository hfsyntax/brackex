import Sidebar from "@/components/Sidebar"
export default function TournamentAnnouncements() {
  return (
    <>
      <Sidebar
        items={[
          "../Standings",
          "Announcements",
          "../Log",
          "../Participants",
          "../Report Scores",
          "../Settings",
        ]}
      />
    </>
  )
}
