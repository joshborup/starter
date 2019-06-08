import { useState, useEffect } from "react";
import axios from "axios";

export default function FetchUser(url) {
  const [user, setUser] = useState(null);
  function getUser() {
    axios.get(url).then(res => {
      setUser(res.data);
    });
  }
  useEffect(() => {
    axios
      .get("/api/user")
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.log(err));
  }, [url]);

  return [user, setUser, getUser];
}
