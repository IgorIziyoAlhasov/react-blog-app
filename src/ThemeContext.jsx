import { useState } from "react";
import { createContext } from "react";

const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}


export {
    ThemeContextProvider, ThemeContext
}