import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header';
import LoginOrSignUp from './components/LoginOrSignUp';
import MakePost from './components/MakePost';
import Post from './components/Post';
import {db} from './firebase'


function App() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)
  const [isUser, setIsUser] = useState(false)

  // configure Firebase DB to display data
  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, 
        post: doc.data()
      })));
    })
  }, [])

  // OBTAIN USER AND USERNAME STATE FROM HEADER COMPONENT
  const getUser = (user) => {
      if(user){
        setIsUser(true)
        setUser(user)
      } else {
        setIsUser(false)
        setUser(null)
      };
  }


  return (
      <div className="App">
        <Header getUser={getUser}/>
        <main className="app__Main">
          {isUser ?(
          <MakePost username={user?.displayName}/>):
          <LoginOrSignUp/>}
          {posts.map(({id, post})=>{
            return (
            <Post 
              key={id}
              postId={id}
              username={post.username} 
              avatar={post.avatar}
              postImg={post.postImg}
              description={post.description}
              user={user}
              />
            )
          })}
        </main>
      </div>
  
  );
}

export default App;


