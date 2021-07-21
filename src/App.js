import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header';
import LoginOrSignUp from './components/LoginOrSignUp';
import MakePost from './components/MakePost';
import Post from './components/Post';
import {db} from './firebase'



function App() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(false)

  // configure Firebase DB to display data
  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, 
        post: doc.data()
      })));
    })
  }, [])

  // OBTAIN USER STATE FROM HEADER COMPONENT
  // NEEDED FOR ABILITY TO MAKE POST OR NOT
  const getUser = (user) => {
      if(user){
        setUser(true)
      } else {
        setUser(false)
      }
  }


  return (
      <div className="App">
        <Header getUser={getUser}/>
        <main className="app__Main">
          {user ?(<MakePost/>):<LoginOrSignUp/>}
          {posts.map(({id, post})=>{
            return (
            <Post 
              key={id}
              username={post.username} 
              avatar={post.avatar}
              postImg={post.postImg}
              description={post.description}
              comments={post.comments}/>
            )
          })}
        </main>
      </div>
  
  );
}

export default App;




 // const [posts, setPosts] = useState([
  //   {
  //     username: 'zander',
  //     avatar: '../../img/zanderImg.png',
  //     postImg: '../../img/iii-points.png',
  //     description: 'this is my post',
  //     comments: [
  //       {
  //         username: 'ron',
  //         comment: 'this is my comment'
  //       },
  //       {
  //         username: 'ron',
  //         comment: 'this is my comment'
  //       }
  //     ]
  //   }
  // ])
