// all hooks will use here--> useContext, useEffect, and useState

import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext(); // context created

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); //user is object bcz have lots of dataset  in key-values pairs and , initialially object is empty , thats why its null
  const [isLoading, setIsLoading] = useState(true); //loading while operation going on  in backend, true means pending work, false means work completed

  //case1-->jaise hi page load ho , useContext chal jaye and check kare ki user logged in hai ya nhi
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    }
    setIsLoading(false);
  }, []);
};
//case2-->
const userLogin = (userData, token) => {
  //userData and token pass karenge
  localStorage.setItem(token);
  localStorage.setItem("currentUser", JSON.stringify(userData));
  setCurrentUser(userData);
};

//case3-->
const userLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  setCurrentUser(null);
};

//context consuming
return (
  <AuthContext.Provider
    value={{
      userLogin,
      userLogout,
      currentUser,
      isLoading,
    }}
  >
    {children}
  </AuthContext.Provider>
);

export const useAuth = () => {
  useContext(AuthContext);
};
