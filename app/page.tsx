import Login from "@/components/Login"
import { title } from "process"

export const metadata = {
  title: "Brackex - Login",
  description: "logs user in",
}

export default function Home() {
  return <Login />
}
