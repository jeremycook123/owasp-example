import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data) => {
    console.log(data);

    const APIHOSTPORT = "localhost:8080"
    var url = `http://${APIHOSTPORT}/login`;

    axios.post(url, data).then((response) => {
        var token = response.data.token;
        console.log("token=" + token);
        setUser(token);
        navigate("/dashboard/profile", { replace: true });
    }).catch((err) => {
        console.log("access denied!!");
        console.log(err);
    })
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
