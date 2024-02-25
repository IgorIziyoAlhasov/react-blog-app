import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Footer, NavigationPanel } from './components';
import { Home, Login, Post } from './pages';
import './styles/main.scss';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';



const App = () => {
    const {theme} = useContext(ThemeContext);

    return (
        <main className={`app-container ${theme}`}>
            <Router>
                <NavigationPanel />
                <Routes>

                    <Route path='/' element={<Home />} />
                    <Route path='/search/:query?' element={<Home />} />
                    <Route path='/user/:userId?' element={<Home />} />
                    <Route path='/post/:postId' element={<Post/>} />
                    <Route path='/login' element={<Login />} />

                </Routes>
            </Router>
            <Footer />
        </main>
    )
}

export default App