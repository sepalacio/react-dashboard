import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = { 
  chat: false,
  cart: false,
  useProfile: false,
  notification: false,
 }

 export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState)

  const navbarItemClick = (clicked) => {
    setIsClicked({
      ...initialState,
      [clicked]: true,
    });
  }

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        navbarItemClick,
      }}>
      { children }
    </StateContext.Provider>
  )
 }

 export const useStateContext = () => useContext(StateContext);
 