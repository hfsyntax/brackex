import BracketNode from "@/components/BracketNode"
import type { Match } from "@/components/BracketNode"
export default function Bracket({ data }: { data: Match }) {
  return <BracketNode node={data} />
}
