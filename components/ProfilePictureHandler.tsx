"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useState, useRef } from "react"
import { useEdgeStore } from "@/lib/edgestore"
import { getProfilePictureURL } from "@/actions/serverRequests"
import { updateProfilePictureURL } from "@/actions/userRequests"
import type { ChangeEvent } from "react"

export default function ProfilePictureHandler({
  pictureURL,
}: {
  pictureURL: string
}) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState(pictureURL)
  const { edgestore } = useEdgeStore()
  const [message, setMessage] = useState({ message: "", error: "" })

  const handleSubmit = async () => {
    fileInput?.current?.click()
  }

  const handleDelete = async () => {
    try {
      const previousURL = await getProfilePictureURL()
      if (previousURL) {
        await edgestore.myPublicImage.delete({ url: previousURL })
        const defaultPictureURL = "/default.png"
        await updateProfilePictureURL("")
        setUrl(defaultPictureURL)
        setMessage({
          error: "",
          message: "Sucessfully removed profile picture",
        })
      }
    } catch (error) {
      console.error(error)
      setMessage({ message: "", error: "failed deleting profile picture" })
    }
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]
    if (file) {
      try {
        const response = await edgestore.myPublicImage.upload({ file })
        const previousURL = await getProfilePictureURL()
        if (previousURL) {
          await edgestore.myPublicImage.delete({ url: previousURL })
        }
        await updateProfilePictureURL(response.url)
        setUrl(response.url)
        setMessage({
          error: "",
          message: "Sucessfully change profile picture",
        })
      } catch (error: any) {
        if (error.name === "EdgeStoreApiClientError") {
          if (error.message.startsWith("File size")) {
            setMessage({
              message: "",
              error: "file size must be 0.293 mb or less",
            })
          } else if (error.message.startsWith("Only images")) {
            setMessage({
              message: "",
              error: "Only image types jpeg and png are accepted",
            })
          } else {
            setMessage({
              message: "",
              error: "Unauthorized to change profile picture",
            })
          }
        } else {
          setMessage({
            message: "",
            error: "failed changing profile picture",
          })
        }
      }
    }
  }
  return (
    <>
      <div
        className="bg-img-remove group relative ml-5 h-[150px] w-[150px] rounded-full bg-cover hover:bg-black"
        style={{ backgroundImage: `url('${url}')` }}
      >
        {url !== "/default.png" && (
          <FontAwesomeIcon
            icon={faTrash}
            size="2xl"
            className="translate-center invisible absolute left-1/2 top-1/2 cursor-pointer text-white group-hover:visible"
            onClick={handleDelete}
          />
        )}
      </div>
      <div className="relative right-5 mb-9 mt-auto cursor-pointer">
        <FontAwesomeIcon
          icon={faCamera}
          size="2xl"
          className="text-gray-500 hover:text-white"
          onClick={handleSubmit}
        />
        <input
          className="hidden"
          ref={fileInput}
          type="file"
          onChange={handleFileChange}
        />
      </div>
      {message.message && (
        <span className="absolute bottom-0 left-0 ml-3 text-green-500">
          {message.message}
        </span>
      )}
      {message.error && (
        <span className="absolute bottom-0 left-0 ml-3 text-red-500">
          {message.error}
        </span>
      )}
    </>
  )
}
