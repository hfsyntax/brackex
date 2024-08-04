"use client"
import { createTournament } from "@/actions/userRequests"
import { useFormState } from "react-dom"
import { useState, useEffect, useRef, FormEvent } from "react"

export default function NewTournamentHandler() {
  const [formResponse, formAction] = useFormState(createTournament, null)
  const currentForm = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState({
    error: "",
    disabled: false,
    text: "Submit",
  })
  const handleSubmit = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault()
    const formElement = event.target as HTMLFormElement
    const formData = new FormData(formElement)
    const formInputs = ["name", "url", "description", "game", "type", "time"]
    for (let input of formInputs) {
      if (!formData.get(input)) {
        return setFormState({ ...formState, error: `${input} cannot be empty` })
      }
    }
    const name = String(formData.get("name"))

    if (name.length > 255) {
      return setFormState({
        ...formState,
        error: "tournament name must be 255 characters or less",
      })
    }

    const url = String(formData.get("url"))

    if (url.length > 60) {
      return setFormState({
        ...formState,
        error: "tournament url must be 60 characters or less",
      })
    }

    const description = String(formData.get("description"))

    if (description.length > 300) {
      return setFormState({
        ...formState,
        error: "tournament description must be 300 characters or less",
      })
    }

    const game = String(formData.get("game"))

    if (game.length > 255) {
      return setFormState({
        ...formState,
        error: "tournament game must be 255 characters or less",
      })
    }
    const tournamentType = String(formData.get("type"))

    if (tournamentType !== "Bracket" && tournamentType !== "Survival") {
      return setFormState({
        ...formState,
        error: "invalid tournament type",
      })
    }
    const startTime = new Date(String(formData.get("time")))
    if (
      !(startTime instanceof Date) ||
      (startTime instanceof Date && isNaN(startTime.getTime()))
    ) {
      return setFormState({
        ...formState,
        error: "invalid start time",
      })
    }
    formAction(formData)
    setFormState({
      ...formState,
      disabled: true,
      text: "Loading...",
    })
  }

  useEffect(() => {
    if (formResponse?.success) {
      currentForm.current?.reset()
    }
    setFormState({ disabled: false, text: "Submit", error: "" })
  }, [formResponse])

  return (
    <>
      <h1 className="ml-5 mt-5 inline-block select-none text-4xl text-white">
        Create Tournament
      </h1>
      <form
        onSubmit={handleSubmit}
        ref={currentForm}
        className="ml-auto mr-auto mt-3 w-[70%] select-none"
      >
        <h2 className="mt-5 bg-gray-800 pb-3 text-4xl text-white">
          Basic Info
        </h2>
        <div className="flex items-center bg-gray-900 pt-3">
          <label className="ml-3 w-[500px] text-white">
            Host (dropdown for user or any communities they are in)
          </label>
          <input
            type="text"
            placeholder="host"
            className="ml-3 box-border inline-block w-[55%] border-2 border-transparent bg-gray-700 pl-2 text-white outline-none focus:border-blue-600"
            spellCheck={false}
            disabled
          />
        </div>
        <div className="flex items-center bg-gray-900 pt-3">
          <label className="ml-3 w-[500px] text-white">Name</label>
          <input
            name="name"
            type="text"
            placeholder="name"
            className="ml-3 box-border inline-block w-[55%] border-2 border-transparent bg-gray-700 pl-2 text-white outline-none focus:border-blue-600"
            spellCheck={false}
            required
          />
        </div>
        <div className="flex items-center bg-gray-900 pt-3">
          <label className="ml-3 w-[500px] text-white">URL</label>
          <label className="ml-3 h-[28px] w-fit bg-slate-700 pl-1 pr-1 leading-[28px] text-white">
            brackex.com/
          </label>
          <input
            name="url"
            type="text"
            placeholder="url"
            className="ml-1 box-border inline-block w-[46%] border-2 border-transparent bg-gray-700 pl-2 text-white outline-none focus:border-blue-600"
            spellCheck={false}
            required
          />
        </div>
        <div className="flex bg-gray-900 pb-3 pt-3">
          <label className="ml-3 w-[500px] text-white">Description</label>
          <textarea
            name="description"
            className="ml-3 box-border inline-block h-[100px] w-[55%] border-2 border-transparent bg-gray-700 pl-2 text-white outline-none focus:border-blue-600"
            spellCheck={false}
            required
          ></textarea>
        </div>
        <h2 className="bg-gray-800 pb-3 pt-3 text-4xl text-white">Game Info</h2>
        <div className="flex items-center bg-gray-900 pt-3">
          <label className="ml-3 w-[500px] text-white">
            Game (add search to populate all games from db)
          </label>
          <input
            name="game"
            type="search"
            placeholder="game"
            className="ml-3 box-border inline-block w-[55%] border-2 border-transparent bg-gray-700 pl-2 text-white outline-none focus:border-blue-600"
            spellCheck={false}
            required
          />
        </div>
        <div className="flex items-center bg-gray-900 pt-3">
          <label className="ml-3 w-[500px] text-white">Tournament type</label>
          <select
            name="type"
            className="ml-3 inline-block w-[55%] bg-gray-700 pl-2 text-white outline-none"
          >
            <option>Bracket</option>
            <option>Survival</option>
          </select>
        </div>
        <div className="flex items-center bg-gray-900 pb-3 pt-3">
          <label className="ml-3 w-[500px] text-white">Start time</label>
          <input
            name="time"
            type="date"
            placeholder="time"
            className="ml-3 box-border inline-block w-[55%] border-2 border-transparent bg-gray-700 pl-2 text-white outline-none focus:border-blue-600"
            spellCheck={false}
            required
          />
        </div>
        <button className="mt-5 h-[50px] w-full rounded-[20px] bg-blue-600 text-white hover:bg-blue-400">
          Submit
        </button>
        {formState.error && (
          <span className="text-red-600">{formState.error}</span>
        )}
        {formResponse?.success && (
          <span className="text-green-600">{formResponse?.success}</span>
        )}
        {formResponse?.error && (
          <span className="text-red-600">{formResponse?.error}</span>
        )}
      </form>
    </>
  )
}
