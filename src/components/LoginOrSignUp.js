import React from 'react'

const LoginOrSignUp = () => {
    const headingContainer = {
        width: '80vw',
        margin: '0 auto'
    }
    
    const headingStyle = {
        color: '#FFA45B',
        textAlign: 'center',
        margin: '2rem 0',
        textDecoration: 'underline'
    }

    return (
        <div style={headingContainer}>
            <h1 style={headingStyle}>Login or sign up to get the full mySocial experience!</h1>
        </div>
    )
}

export default LoginOrSignUp
