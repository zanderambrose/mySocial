import React, {useState, useEffect, useRef} from 'react'
import '../styles/Post.css'
import firebase from 'firebase'
import {db} from '../firebase'
// import Avatar from '@material-ui/core/Avatar'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const Post = ({username, description, postImg, postId, user}) => {

    // FUNCTION AND STATE TO TURN THE LIKE BTN TO RED
    const [bgColor, setBgColor] = useState('black')
    const handleLikeClick = () =>{
        setBgColor('red')
    }

    // REF AND FUNCTION FOR COMMENT ICON AND COMMENT TEXT INPUT
    const commentRef = useRef()
    const commentFocus = () => {
        commentRef.current.focus();
    }

    // STATE AND FUNCTION FOR COMMENTS ON EACH POST
    const [comments, setComments] = useState([])
    useEffect(()=>{
        let unsubscribe;
        if(postId){
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot)=>{
                    setComments(snapshot.docs.map((doc) =>{
                        return doc.data()
                    }))
                })
        }
        return () =>{
            unsubscribe();
        }
    }, [postId])

    // STATE AND FUNCTION FOR ENTERING A COMMENT
    const [comment, setComment] = useState('')
    const handleCommentChange = (e) =>{
        setComment(e.target.value);
    }
    const postComment = (e) =>{
        e.preventDefault()
        db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setComment('')
    }

    return (
        <div className="app__Post">
            <header className="app__PostHeader leftIndent">
                {/* <Avatar 
                    src={avatar} 
                    alt="avatar"/> */}
                <h4 className="app__username"><b>{username}</b></h4>
            </header>

            <main className="app__PostImg">
                <img src={postImg} alt="post content"/>
            </main>

            <section className="app__PostIcons leftIndent">
                <FavoriteBorderIcon
                    className='like' 
                    style={{color: bgColor}} 
                    onClick={handleLikeClick}/>
                <ChatBubbleOutlineIcon
                    onClick={commentFocus} 
                    className='comment'
                    style={{
                        position: 'relative', 
                        left: "10px"
                    }}/>
            </section>

            <div className="app__PostCaption leftIndent">
                <p><b>{username}</b> - {description}</p>
            </div>

            <div className="app__PostComments leftIndent">
                {comments.map((item, idx)=>{
                    if(comments.length > 0){
                     return <p key={idx}>
                                <b>{item.username}</b> - {item.text}
                            </p>
                    } else {
                        return
                    }
                })}
            </div>
            
            {user && (
            <div className="app__PostAddComments">
                <form
                    className="app__PostForm">
                    <input
                        ref={commentRef} 
                        type="text" 
                        placeholder="Enter your comment..."
                        value={comment}
                        onChange={handleCommentChange}
                        />
                    <button
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}>
                            Post
                        </button>
                </form>
            </div>
            )}
            
        </div>
    )
}

export default Post
