import Link from "next/link"

export const metadata = {
  title: "Brackex - Your Communities",
  description: "User Communities in Brackex",
}

export default function Communities() {
  return (
    <div className="flex">
      <div className="ml-3 mt-5 h-fit w-fit border-r-2 pb-3 pt-3">
        <Link href={"/dashboard/tournaments"} draggable={false}>
          <span className="mr-3 block rounded-md p-1 text-3xl text-white hover:bg-gray-700">
            Your Tournaments
          </span>
        </Link>
        <span className="mr-3 mt-2 block cursor-default select-none rounded-md bg-gray-500 p-1 text-3xl text-white">
          Your Communities
        </span>
        <Link href={"/browse/communities"} draggable={false}>
          <span className="mr-3 mt-2 block cursor-pointer rounded-md p-1 text-3xl text-white hover:bg-gray-700">
            Browse Communities
          </span>
        </Link>
      </div>
      <div className="ml-3 grow">
        <h1 className="mt-5 inline-block text-4xl text-white">
          <u>Search Communities</u>
        </h1>
        <Link href={"/tournaments/new"}>
          <button
            className="float-right mr-5 mt-5 h-[50px] w-[200px] bg-blue-600 text-white hover:bg-blue-400"
            draggable={false}
          >
            Create Community
          </button>
        </Link>
        <input
          type="search"
          placeholder="search"
          className="mt-3 box-border block w-[70%] border-none bg-slate-600 p-3 pl-2 text-white outline-none"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
