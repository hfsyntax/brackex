"use client"
import { login } from "@/lib/session"
import { useState, useEffect, useRef, FormEvent } from "react"
import { useFormState } from "react-dom"
import ReCAPTCHA from "react-google-recaptcha"

export default function ForgotPasswordHandler(): JSX.Element {
  const recaptchaSiteKey = "6LepxRQqAAAAAF0qzB26pRheQpBM3drSOVXFMvj_"
  const recaptcha = useRef<ReCAPTCHA>(null)
  const currentForm = useRef<HTMLFormElement>(null)
  const [formResponse, formAction] = useFormState(login, null)
  const [formState, setFormState] = useState({
    error: "",
    disabled: false,
    text: "Submit",
  })

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await recaptcha?.current?.executeAsync()
    const formData = new FormData(event.target as HTMLFormElement)
    if (!formData.get("username")) {
      setFormState({
        ...formState,
        error: "username is empty",
      })
    } else {
      //formAction(formData)
      setFormState({
        ...formState,
        error: "feature not implemented",
      })
    }
  }

  useEffect(() => {
    if (formResponse?.error) {
      currentForm.current?.reset()
      setFormState({
        disabled: false,
        text: "Submit",
        error: formResponse?.error,
      })
    }
  }, [formResponse])

  return (
    <div className="relative ml-auto mr-auto mt-[30px] w-[600px]">
      <h1 className="text-[30px] text-white">Log in to Brackex</h1>
      <span className="block text-gray-500">
        Forgot your password? Enter your username or email associated with your
        account.
      </span>
      <form ref={currentForm} onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          className="focus: mt-[20px] box-border h-[48px] w-full border-2 border-transparent bg-gray-700 pl-[10px] text-white outline-none focus:border-blue-600"
          autoComplete="username"
          spellCheck={false}
          required
        />
        <button
          className="mt-[10px] h-[50px] w-full rounded-[20px] bg-blue-600 text-white hover:bg-blue-400"
          type="submit"
          disabled={formState.disabled}
        >
          {formState.text}
        </button>
        <a href="/forgot_password" className="m-1 text-blue-600">
          Return to login
        </a>
        {formState?.error && (
          <span className="text-red-500">{formState?.error}</span>
        )}
        <ReCAPTCHA
          ref={recaptcha}
          sitekey={recaptchaSiteKey}
          size="invisible"
        />
      </form>
    </div>
  )
}
