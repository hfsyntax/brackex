import {
  getUserTournaments,
  getProfilePictureURL,
} from "@/actions/serverRequests"
import { getSession } from "@/lib/session"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"

export const metadata = {
  title: "Brackex - Your Tournaments",
  description: "User tournaments for Brackex",
}

export default async function Dashboard() {
  const session = await getSession()
  const username = session?.user?.username
  const userTournaments = await getUserTournaments(username)
  const profilePictureURL = await getProfilePictureURL()
  return (
    <div className="flex">
      <div className="ml-3 mt-5 h-fit w-fit border-r-2 pb-3 pt-3">
        <span className="mr-3 block cursor-default select-none rounded-md bg-gray-500 p-1 text-3xl text-white">
          Your Tournaments
        </span>
        <Link href={"/dashboard/communities"} draggable={false}>
          <span className="mr-3 mt-2 block cursor-pointer rounded-md p-1 text-3xl text-white hover:bg-gray-700">
            Your Communities
          </span>
        </Link>
        <Link href={"/browse/communities"} draggable={false}>
          <span className="mr-3 mt-2 block cursor-pointer rounded-md p-1 text-3xl text-white hover:bg-gray-700">
            Browse Communities
          </span>
        </Link>
      </div>
      <div className="ml-3 grow">
        <h1 className="mt-5 inline-block text-4xl text-white">
          <u>Search Tournaments</u>
        </h1>
        <Link href={"/tournaments/new"} draggable={false}>
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
        <div className="flex w-[70%] flex-wrap">
          {userTournaments.map((tournament, index) => (
            <Link
              href={`/tournaments/${tournament?.url}`}
              className="mt-3 flex w-full items-center bg-slate-700 text-white hover:bg-slate-600"
              key={index}
              draggable={false}
            >
              <Image
                src={profilePictureURL}
                alt="profile_picture"
                className="m-3"
                height={50}
                width={50}
                draggable={false}
              />
              <div className="grow">
                <span className="inline-block pl-3">{tournament?.name}</span>

                <span className="float-right mr-3 inline-block">
                  {new Date(tournament?.created_at).toLocaleDateString()}
                </span>
                <span className="float-right mr-3">
                  <FontAwesomeIcon icon={faUsers} /> {tournament?.count}
                </span>
                <span className="block pl-3 text-gray-400">
                  {tournament?.type} tournament for {tournament?.game}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
