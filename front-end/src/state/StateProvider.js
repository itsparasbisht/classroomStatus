import React, { createContext, useContext, useReducer } from "react"

export const ClassContext = createContext()

export const StateProvider = ({reducer, initialState, children}) => (
    <ClassContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </ClassContext.Provider>
)

export const useStateValue = () => useContext(ClassContext)