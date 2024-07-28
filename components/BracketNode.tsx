type Player = {
  name: string
  seed: number
}

export type Match = {
  id: number
  player1: Player
  player2: Player
  children: Match[]
}

export default function BracketNode({
  node,
  parent = null,
  index = 0,
  state = { lastChildNodeCount: 0 },
}: {
  node: Match
  parent?: Match | null
  index?: number
  state?: { lastChildNodeCount: number }
}) {
  let nodeType = ""

  if (parent === null) {
    nodeType = "parent node" // Root node
  } else if (node.children && node.children.length > 0) {
    nodeType = "direct node" // Node with children
  } else {
    nodeType = "child node" // Node without children
  }

  const isLastChild =
    nodeType === "child node" && parent && index === parent.children.length - 1

  const getClosingDivs = () => {
    if (state.lastChildNodeCount % 16 === 0) {
      return 15
    } else if (state.lastChildNodeCount % 8 === 0) {
      return 11
    } else if (state.lastChildNodeCount % 4 === 0) {
      return 9
    } else if (state.lastChildNodeCount % 2 === 0) {
      return 6
    } else if (
      state.lastChildNodeCount % 3 === 0 ||
      state.lastChildNodeCount % 1 === 0
    ) {
      return 3
    }
    return 0
  }

  if (isLastChild) {
    state.lastChildNodeCount++
  }

  return (
    <>
      {nodeType === "parent node" && (
        <div className="flex h-fit justify-center">
          <div className="flex flex-row-reverse">
            <div className="relative ml-[50px] flex items-center">
              <div className="m-0 flex h-[50px] w-[200px] flex-col justify-center bg-black text-white">
                <div className="flex h-[25px] flex-row">
                  <img
                    src="/logo192.png"
                    width={25}
                    height={25}
                    draggable={false}
                    alt="player_img"
                    className="ml-[10px] select-none"
                  ></img>
                  <span className="ml-[10px] leading-[25px]">
                    {node.player1.seed}
                  </span>
                  <span className="ml-[10px] leading-[25px]">
                    {node.player1.name}
                  </span>
                </div>
                <hr className="m-0 box-border w-full border border-solid border-gray-500" />
                <div className="flex h-[25px] flex-row">
                  <img
                    className="ml-[10px] select-none"
                    src="/logo192.png"
                    width={25}
                    height={25}
                    draggable={false}
                    alt="player_img"
                  ></img>
                  <span className="ml-[10px] leading-[25px]">
                    {node.player2.seed}
                  </span>
                  <span className="ml-[10px] leading-[25px]">
                    {node.player2.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {node.children.map((child, index) => (
                <BracketNode
                  key={child.id}
                  node={child}
                  parent={node}
                  index={index}
                  state={state}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {nodeType === "direct node" && (
        <div className="relative mb-[10px] mt-[10px] flex items-start justify-end">
          <div className="flex flex-row-reverse">
            <div className="relative ml-[50px] flex items-center">
              <div className="m-0 flex h-[50px] w-[200px] flex-col justify-center bg-black text-white">
                <div className="flex h-[25px] flex-row">
                  <img
                    className="ml-[10px] select-none"
                    src="/logo192.png"
                    width={25}
                    height={25}
                    draggable={false}
                    alt="player_img"
                  ></img>
                  <span className="ml-[10px] leading-[25px]">
                    {node.player1.seed}
                  </span>
                  <span className="ml-[10px] leading-[25px]">
                    {node.player1.name}
                  </span>
                </div>
                <hr className="m-0 box-border w-full border border-solid border-gray-500" />
                <div className="flex h-[25px] flex-row">
                  <img
                    className="ml-[10px] select-none"
                    src="/logo192.png"
                    width={25}
                    height={25}
                    alt="player_img"
                  ></img>
                  <span className="ml-[10px] leading-[25px]">
                    {node.player2.seed}
                  </span>
                  <span className="ml-[10px] leading-[25px]">
                    {node.player2.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {node.children.map((child, index) => (
                <BracketNode
                  key={child.id}
                  node={child}
                  parent={node}
                  index={index}
                  state={state}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {nodeType === "child node" && (
        <div className="relative mb-[10px] mt-[10px] flex items-start justify-end">
          <div className="m-0 flex h-[50px] w-[200px] flex-col justify-center bg-black text-white">
            <div className="flex h-[25px] flex-row">
              <img
                className="ml-[10px] select-none"
                src="/logo192.png"
                width={25}
                height={25}
                draggable={false}
                alt="player_img"
              ></img>
              <span className="ml-[10px] leading-[25px]">
                {node.player1.seed}
              </span>
              <span className="ml-[10px] leading-[25px]">
                {node.player1.name}
              </span>
            </div>
            <hr className="m-0 box-border w-full border border-solid border-gray-500" />
            <div className="flex h-[25px] flex-row">
              <img
                className="ml-[10px] select-none"
                src="/logo192.png"
                width={25}
                height={25}
                draggable={false}
                alt="player_img"
              ></img>
              <span className="ml-[10px] leading-[25px]">
                {node.player2.seed}
              </span>
              <span className="ml-[10px] leading-[25px]">
                {node.player2.name}
              </span>
            </div>
          </div>
          {isLastChild && (
            <>
              {Array.from({ length: getClosingDivs() }).map((_, i) => (
                <div key={i} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  )
}
