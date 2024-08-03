"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
export default function Sidebar({
  items,
  defaultSelected,
}: {
  items: string[]
  defaultSelected?: string
}) {
  const pathname = usePathname()
  const pagename = pathname.split("/").slice(-1).join("")
  useEffect(() => {
    console.log(`the pathname is ${pathname}`)
  }, [])
  return (
    <div className="absolute left-0 top-0 ml-3 mt-5 h-fit w-fit border-r-2 pb-3 pt-3">
      {items.map((item, index) =>
        item.toLowerCase().replace(" ", "_") === pagename ||
        item === defaultSelected ? (
          <span
            key={index}
            className="mr-3 mt-2 block cursor-default rounded-md bg-gray-500 p-1 text-3xl text-white"
          >
            {item}
          </span>
        ) : (
          <Link
            key={index}
            href={`${pathname}/${item.toLowerCase().replace("standings", "").replace(" ", "_")}`}
          >
            <span className="mb-2 mr-3 mt-2 block cursor-pointer rounded-md p-1 text-3xl text-white hover:bg-gray-700">
              {item.replaceAll("../", "")}
            </span>
          </Link>
        ),
      )}
    </div>
  )
}
