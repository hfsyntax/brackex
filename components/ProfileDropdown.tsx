"use client"

import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { logout } from "@/lib/session"

export default function ProfileDropdown() {
  const [dropdown, showDropdown] = useState<boolean>(false)
  const currentDropdown = useRef<HTMLDivElement>(null)
  const currentDropdownState = useRef<boolean>(false)
  const dropdownArrow = useRef<SVGSVGElement>(null)

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (
      target !== currentDropdown.current &&
      target.parentElement !== currentDropdown.current &&
      target.id !== dropdownArrow.current?.id &&
      currentDropdown.current
    ) {
      showDropdown(false)
    }
  }

  useEffect(() => {
    currentDropdownState.current = dropdown
  }, [dropdown])

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  return (
    <>
      <Link href={"/profile"} className="mr-3">
        <div className="h-[40px] w-[40px] cursor-pointer rounded-3xl bg-white"></div>
      </Link>
      <div
        className="absolute right-0 top-full h-fit w-[200px] cursor-default select-none bg-slate-950 pb-2 pt-2"
        style={{ display: dropdown ? "block" : "none" }}
        ref={currentDropdown}
      >
        <a
          href="/dashboard/tournaments"
          className="ml-3 block w-fit text-gray-500 hover:text-white"
        >
          Dashboard
        </a>
        <a
          href="/profile"
          className="ml-3 mt-1 block w-fit text-gray-500 hover:text-white"
        >
          Profile
        </a>
        <a
          href="#"
          className="ml-3 mt-1 block w-fit text-gray-500 hover:text-white"
        >
          Settings
        </a>
        <span
          className="ml-3 mt-1 block w-fit cursor-pointer text-gray-500 hover:text-white"
          onClick={async () => await logout()}
        >
          Logout
        </span>
      </div>
      <FontAwesomeIcon
        icon={faAngleDown}
        id="profile-arrow-opener"
        size="2xl"
        className="ml-2 mr-3 cursor-pointer text-blue-600 hover:text-blue-400"
        onClick={() => showDropdown(!dropdown)}
        ref={dropdownArrow}
      />
    </>
  )
}
