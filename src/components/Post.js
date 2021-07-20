import React from 'react'
import '../styles/Post.css'
// import Avatar from '@material-ui/core/Avatar'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const Post = ({username, avatar, description, postImg, comments}) => {

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
                <FavoriteBorderIcon/>
                <ChatBubbleOutlineIcon style={{position: 'relative', left: "10px"}}/>
            </section>

            <div className="app__PostCaption leftIndent">
                <p><b>{username}</b> - {description}</p>
            </div>

            {/* <div className="app__PostComments leftIndent">
                {comments.map((item, idx)=>{
                    if(comments.length > 0){
                     return <div key={idx}>
                                <b>{item.username}</b> - {item.comment}
                            </div>
                    } else {
                        return
                    }
                })}
            </div> */}
            
        </div>
    )
}

export default Post
