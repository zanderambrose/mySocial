import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import {storage, db} from '../firebase'
import firebase from 'firebase'


const MakePost = () => {
    // UPLOAD POST STATE
    const [description, setDescription] = useState('')
    const [img, setImg] = useState(null)
    
    // HANDLE CHANGE FUNCTIONS
    const handleDescriptionChange = (e) => setDescription(e.target.value)
    const handleUploadChange = (e) =>{
        if(e.target.files[0]){
            setImg(e.target.files[0])
        }
    }
    const handlePost = () =>{
        const upload = storage.ref(`images/${img.name}`).put(img);
        upload.on(
            // if error
            (err) =>{
                console.log(err);
                alert(err.message);
            },
            // when post completes
            () =>{
                storage
                    .ref('images')
                    .child(img.name)
                    .getDownloadURL()
                    // put post and img inside firebase DB
                    .then(url =>{
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            description: description,
                            postImg: url,
                            // username: username
                        })
                    })
            }
        )
    }

    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter your description..." 
                onChange={handleDescriptionChange}/>
            <input 
                type="file"
                onChange={handleUploadChange}/>
            <Button
                onChange={handlePost}>
                    Post
            </Button>
        </div>
    )
}

export default MakePost
