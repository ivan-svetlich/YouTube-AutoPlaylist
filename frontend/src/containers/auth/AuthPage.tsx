import { useEffect } from "react";
import useQuery from "../hooks/useQuery";

const AuthPage = () => {
  const query = useQuery();
  const authUrl = query.get("auth_url");

  useEffect(() => {
    if (authUrl) {
      console.log(authUrl)
      window.location.replace(decodeURIComponent(authUrl));
    }
    else {
      //window.close();
    }
  }, [authUrl])

  return (
    <></>
  )
}

export default AuthPage