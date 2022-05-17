import { useEffect } from "react"

const AuthResult = () => {
  useEffect(() => {
    window.postMessage("authorized", "*");
    window.close();
  })
  return (
    <></>
  )
}

export default AuthResult