import { useEffect, useState } from "react";

// TODO: Should get user from token instead of local storage
export function getUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return user;
}
