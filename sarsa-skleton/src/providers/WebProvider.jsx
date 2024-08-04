import React, { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxios";
export const WebContext = createContext(null);

const WebProvider = ({ children }) => {
  const [webData, setWebData] = useState([]);
  
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('sarsaUser');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const axios = useAxiosPublic();

  console.log(webData);

  useEffect(() => {
    setLoading(true);
    axios("/users/get-web-data").then((res) => {
      setWebData(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <WebContext.Provider
      value={{ webData, user, setUser, loading, setLoading }}
    >
      {children}
    </WebContext.Provider>
  );
};

export default WebProvider;