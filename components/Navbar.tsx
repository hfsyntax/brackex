import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGamepad,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import ProfileDropdown from "./ProfileDropdown"
import { getProfilePictureURL } from "@/actions/serverRequests"

export default async function Navbar({ session }: { session: any }) {
  const pictureURL = await getProfilePictureURL()
  return (
    <nav className="fixed top-0 z-10 flex h-[60px] w-full items-center justify-end bg-gray-900">
      <Link
        href={session ? "/dashboard/tournaments" : "/"}
        className="ml-[10px] mr-auto"
      >
        <FontAwesomeIcon
          icon={faGamepad}
          size="2xl"
          className="text-blue-600 hover:text-blue-400"
        />
      </Link>
      <Link href={"/browse/tournaments"} className="mr-[10px]">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="2xl"
          className="mr-3 text-gray-500 hover:text-white"
        />
      </Link>
      {session ? (
        <>
          <ProfileDropdown
            pictureURL={pictureURL ? pictureURL : "/default.png"}
          />
        </>
      ) : (
        <Link href={"/"} className="mr-3">
          <button className="rounded bg-blue-600 p-[10px] text-white hover:bg-blue-400">
            Login
          </button>
        </Link>
      )}
    </nav>
  )
}
