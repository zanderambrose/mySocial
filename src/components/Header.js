import React from 'react'
import '../styles/Header.css'
import Button from 'react-bootstrap/Button';

const Header = () => {
const btnStyle = {
    border: "1px solid #e4e2e2",
    borderRadius: '10px',
    marginRight: '0.25rem'
}

    return (
    <header className="app__header">
        <div className="app__headerContent">
            <img 
                src="./img/mySocial.png"
                alt="header icon"
                style={{width: '100px'}}
                className="app__headerImg"/>
            <input 
                type="text"
                placeholder="Search..."/>
            <div className="app__headerButtons">
                <Button
                    id="button" 
                    style={btnStyle} 
                    variant="dark">Login</Button>
                <Button
                    id="button" 
                    style={btnStyle} 
                    variant="dark">Sign Up</Button>
            </div>
        </div>
    </header>
    )
}

export default Header
