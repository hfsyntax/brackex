import Sidebar from "@/components/Sidebar"
export default function ReportScores() {
  return (
    <>
      <Sidebar
        items={[
          "../Standings",
          "../Announcements",
          "../Log",
          "../Participants",
          "Report Scores",
          "../Settings",
        ]}
      />
    </>
  )
}
