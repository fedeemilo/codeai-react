import React from 'react'
import './App.css'
import NavBar from './components/NavBar/'
import ChatContainer from './components/ChatContainer/'
import Footer from './components/Footer'

function App() {
    return (
        <div className="App">
            <NavBar />
            <ChatContainer />
            <Footer />
        </div>
    )
}

export default App
