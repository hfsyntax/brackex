import Link from "next/link"

export const metadata = {
  title: "Brackex - Dashboard",
  description: "User dashboard for Brackex",
}

export default function Dashboard() {
  return (
    <div className="flex">
      <div className="ml-3 mt-5 h-fit w-fit border-r-2 pb-3 pt-3">
        <span className="mr-3 block cursor-default rounded-md bg-gray-500 p-1 text-3xl text-white">
          Your Tournaments
        </span>
        <Link href={"/dashboard/communities"}>
          <span className="mr-3 mt-2 block cursor-pointer rounded-md p-1 text-3xl text-white hover:bg-gray-700">
            Your Communities
          </span>
        </Link>
        <Link href={"/browse/communities"}>
          <span className="mr-3 mt-2 block cursor-pointer rounded-md p-1 text-3xl text-white hover:bg-gray-700">
            Browse Communities
          </span>
        </Link>
      </div>
      <div className="ml-3 grow">
        <h1 className="mt-5 inline-block text-4xl text-white">
          <u>Search Tournaments</u>
        </h1>
        <Link href={"/tournaments/new"}>
          <button className="float-right mr-5 mt-5 h-[50px] w-[200px] bg-blue-600 text-white hover:bg-blue-400">
            Create Tournament
          </button>
        </Link>
        <input
          type="search"
          placeholder="search"
          className="mt-3 box-border block w-[70%] border-none bg-slate-600 p-3 pl-2 text-white outline-none"
          spellCheck={false}
        />
        <div className="float-right mr-5 w-[200px]">
          <span className="mb-3 block cursor-default bg-gray-500 pl-2">
            all
          </span>
          <span className="mb-3 block cursor-pointer pl-2 text-white hover:bg-gray-700">
            in-progress
          </span>
          <span className="mb-3 block cursor-pointer pl-2 text-white hover:bg-gray-700">
            complete
          </span>
        </div>
      </div>
    </div>
  )
}
