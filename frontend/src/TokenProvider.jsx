import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TokenContext = createContext(null);
const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setloading] = useState(true);
  const [currentUserInfo, setCurrentUserInfo] = useState({});

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setToken(null);
        setloading(false);
        return;
      }
      try {
        const { data } = await axios.get("/api/user/token_valid_check", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setToken(accessToken);
        setCurrentUserInfo(data.userInfo);
        setloading(false);
      } catch (error) {
        setToken(null);
        setloading(false);
        console.log("error", error?.response?.data?.message);
      }
    };

    checkToken();
  }, [token]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <TokenContext.Provider value={{ token, setToken, currentUserInfo }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
