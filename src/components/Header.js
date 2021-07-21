import React, {useState, useEffect} from 'react'
import '../styles/Header.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import {auth} from '../firebase'


const Header = ({getUser}) => {
    const btnStyle = {
        border: "1px solid #e4e2e2",
        borderRadius: '10px',
        marginRight: '0.25rem'
    }

    // LOGIN MODAL STATE
    const [loginShow, setLoginShow] = useState(false);
    const handleLoginClose = () => setLoginShow(false);
    const handleLoginShow = () => setLoginShow(true);

    // SIGN UP MODAL STATE
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // USERNAME, EMAIL, PASSWORD STATE
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    // AUTHENTICATION LISTENER FOR EACH AUTH CHANGE
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if (authUser){
                setUser(authUser);
            } else {
                setUser(null);
            }
        })
        return () =>{
            unsubscribe()
        }
    }, [user, username])

    // LOGIN FUNCTION LOGIC
    const onLoginSubmit = (e) =>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .catch((err)=>{
            alert(err.message)
        })
        handleLoginClose()
    }

    // SIGN UP FUNCTION LOGIC
    const onSignUpSubmit = (e) =>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser)=>{
            return authUser.user.updateProfile({
                displayName: username
            })
        })
        .catch((err) => alert(err.message))
        handleClose()
    }

    // SIGN OUT FUNCTION LOGIC
    const onSignout = () =>{
        auth.signOut()
        setUser(null)
    }

    // GETUSER FUNCTION PASSING STATE UP TO APP.JS
    useEffect(()=>{
        getUser(user)
    }, [user])

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
            {/* CONDITIONAL RENDER BUTTON DISPLAY */}
                {user ? (
                    <Button
                        onClick={onSignout}
                        id="button" 
                        style={btnStyle} 
                        variant="dark">
                            Log Out
                    </Button>
                ): (
                    <div>
                        <Button
                            onClick={handleLoginShow}
                            id="button" 
                            style={btnStyle} 
                            variant="dark">
                                Login
                        </Button>
                        <Button
                            onClick={handleShow}
                            id="button" 
                            style={btnStyle} 
                            variant="dark">
                                Sign Up
                        </Button>
                    </div>
                )}


            {/* SIGN UP MODAL DISPLAY */}
                <Modal 
                    animation={false}
                    show={show} 
                    onHide={handleClose}>
                    <Modal.Header
                        bsPrefix
                        style={{
                            backgroundColor: '#fbf6f0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                            }}>
                        <img 
                            style={{
                                width: '80px', 
                            }}
                            src="./img/mySocial.png" 
                            alt="mySocial logo"/>
                        <Modal.Title>
                                Sign up for mySocial!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="app__ModalBody">
                            <label htmlFor="username">Enter your username:</label>
                            <input 
                                onChange={(e)=>setUsername(e.target.value)}
                                type="text" 
                                name="username" 
                                id="username"/>
                            <label htmlFor="email">Enter your email:</label>
                            <input 
                                onChange={(e)=>setEmail(e.target.value)}
                                type="email" 
                                name="email" 
                                id="email"/>
                            <label htmlFor="password">Enter your password:</label>
                            <input 
                                onChange={(e)=> setPassword(e.target.value)} 
                                type="password" 
                                name="password" 
                                id="password"/>
                            <Button
                                variant='dark'
                                className="app__ModalBtn" 
                                onClick={handleClose}>
                                Close
                            </Button>
                            <button
                                type='submit'
                                className="app__ModalBtn" 
                                onClick={onSignUpSubmit}>
                                    Submit
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>

                {/* LOGIN MODAL DISPLAY */}
                 <Modal 
                    animation={false}
                    show={loginShow} 
                    onHide={handleLoginClose}>
                    <Modal.Header
                        bsPrefix
                        style={{
                            backgroundColor: '#fbf6f0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                            }}>
                        <img 
                            style={{
                                width: '80px', 
                            }}
                            src="./img/mySocial.png" 
                            alt="mySocial logo"/>
                        <Modal.Title>
                                Login to mySocial!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="app__ModalBody">
                            <label htmlFor="email">Enter your email:</label>
                            <input 
                                onChange={(e)=>setEmail(e.target.value)}
                                type="email" 
                                name="email" 
                                id="email"/>
                            <label htmlFor="password">Enter your password:</label>
                            <input 
                                onChange={(e)=> setPassword(e.target.value)} 
                                type="password" 
                                name="password" 
                                id="password"/>
                            <Button
                                variant='dark'
                                className="app__ModalBtn" 
                                onClick={handleLoginClose}>
                                Close
                            </Button>
                            <button
                                type='submit'
                                className="app__ModalBtn" 
                                onClick={onLoginSubmit}>
                                    Login
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    </header>
    )
}

export default Header
