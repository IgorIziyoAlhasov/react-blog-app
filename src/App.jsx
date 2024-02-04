import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Footer, NavigationPanel } from './components';
import { Home, Login } from './pages';
import './styles/main.scss';




const App = () => {


    return (
        <main className='app-container light'>
            <Router>
                <NavigationPanel />
                <Routes>

                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />

                </Routes>
            </Router>
            <Footer />
        </main>
    )
}

export default App