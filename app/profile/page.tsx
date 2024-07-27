import { getSession } from "@/lib/session"

export const metadata = {
  title: "Brackex - Profile",
}

export default async function Profile() {
  const session = await getSession()
  return (
    <>
      <div className="justify relative ml-auto mr-auto flex h-[200px] w-[90%] items-center bg-slate-700">
        <div className="ml-5 h-[150px] w-[150px] cursor-pointer rounded-full bg-white"></div>
        <div className="ml-3">
          <span className="block text-5xl text-white">
            {session?.user?.username}
          </span>
          <span className="block text-white">joined</span>
          <span className="block text-white">x followers</span>
        </div>
      </div>
      <h1 className="ml-[5%] mt-5 text-5xl text-white">Created Tournaments</h1>
      <h1 className="ml-[5%] mt-5 text-5xl text-white">Communities</h1>
    </>
  )
}
