import React, {useState, useEffect, useRef} from 'react'
import '../styles/Post.css'
import firebase from 'firebase'
import {db} from '../firebase'
import {FaRegHeart} from 'react-icons/fa'
import {BiComment} from 'react-icons/bi'
import PostCaption from './PostCaption'



const Post = ({username, description, postImg, postId, user}) => {

    // FUNCTION AND STATE TO TURN THE LIKE BTN TO RED
    const [bgColor, setBgColor] = useState('black')
    const handleLikeClick = () =>{
        setBgColor('red')
    }

    // REF AND FUNCTION FOR COMMENT ICON AND COMMENT TEXT INPUT
    const commentRef = useRef()
    const commentFocus = () => {
        if(user){
            commentRef.current.focus();
        }
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
                <h4 className="app__username"><b>{username}</b></h4>
            </header>

            <main className="app__PostImg">
                <img src={postImg} alt="post content"/>
            </main>

            <section className="app__PostIcons leftIndent">
                <FaRegHeart
                    size="1.25rem"
                    className='like' 
                    style={{color: bgColor}} 
                    onClick={handleLikeClick}/>
                <BiComment
                    size="1.25rem"
                    onClick={commentFocus} 
                    className='comment'
                    style={{
                        position: 'relative', 
                        left: "10px"
                    }}/>
            </section>

            <div className="app__PostCaption leftIndent">
                <PostCaption username={username} user={user} description={description} postId={postId}/>
            </div>

            <div className="app__PostComments leftIndent">
                {comments.map((item, idx)=>{
                        return(
                        <div key={idx}>
                            <p>
                                <b>{item.username}</b> - {item.text}
                            </p>
                        </div>
                        )
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
