import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import {db} from './firebase'

function App() {
  const [posts, setPosts] = useState([])

  // configure Firebase DB to display data
  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, 
        post: doc.data()
      })));
    })
  }, [])


  return (
    <div className="App">
      <Header/>
      <main className="app__Main">
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
