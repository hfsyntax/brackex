import { getSession } from "@/lib/session"
import { getProfilePictureURL, getUserById } from "@/actions/serverRequests"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import ProfilePictureHandler from "@/components/ProfilePictureHandler"
import { EdgeStoreProvider } from "@/lib/edgestore"

export const metadata = {
  title: "Brackex - Profile",
}

export default async function Profile() {
  const session = await getSession()
  const userId = String(session?.user?.authID)
  const userData = await getUserById(userId)
  const userCreated = new Date(userData?.created_at).toDateString()
  const userFollowers = Number(userData?.followers)
  const profilePictureURL = await getProfilePictureURL()
  console.log(profilePictureURL)
  return (
    <EdgeStoreProvider>
      <div className="justify relative ml-auto mr-auto flex h-[250px] w-[90%] items-center bg-slate-700">
        <ProfilePictureHandler
          pictureURL={profilePictureURL ? profilePictureURL : "/default.png"}
        />
        <div className="ml-3">
          <span className="block text-5xl text-white">
            {session?.user?.username}
          </span>
          <span className="block text-white">created {userCreated}</span>
          <span className="block text-white">{userFollowers} followers</span>
        </div>
        <FontAwesomeIcon
          icon={faGear}
          size="2xl"
          className="ml-auto mr-3 mt-3 cursor-pointer self-start text-gray-500 hover:text-white"
        />
      </div>
      <h1 className="ml-[5%] mt-5 text-5xl text-white">Created Tournaments</h1>
      <h1 className="ml-[5%] mt-5 text-5xl text-white">Communities</h1>
    </EdgeStoreProvider>
  )
}
