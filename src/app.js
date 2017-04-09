import React, { Component } from 'react'
import Register from 'views/register'
import './app.css'

class App extends Component {
    render () {
        return (
            <div className='container-fluid app-container'>
               <Register />
            </div>
        )
    }
}

export default App
