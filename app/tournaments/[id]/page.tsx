import Bracket from "@/components/Bracket"
export default function TournamentID() {
  const data = {
    id: 7,
    player1: { name: "foo", seed: 1 },
    player2: { name: "jane", seed: 4 },
    children: [
      {
        id: 5,
        player1: { name: "foo", seed: 1 },
        player2: { name: "ooga", seed: 2 },
        children: [
          {
            id: 1,
            player1: { name: "foo", seed: 1 },
            player2: { name: "bar", seed: 8 },
            children: [],
          },
          {
            id: 2,
            player1: { name: "ooga", seed: 2 },
            player2: { name: "booga", seed: 7 },
            children: [],
          },
        ],
      },
      {
        id: 6,
        player1: { name: "smith", seed: 6 },
        player2: { name: "jane", seed: 4 },
        children: [
          {
            id: 3,
            player1: { name: "john", seed: 3 },
            player2: { name: "smith", seed: 6 },
            children: [],
          },
          {
            id: 4,
            player1: { name: "jane", seed: 4 },
            player2: { name: "doe", seed: 5 },
            children: [],
          },
        ],
      },
    ],
  }

  return <Bracket data={data} />
}
