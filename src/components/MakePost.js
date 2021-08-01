import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import {storage, db} from '../firebase'
import firebase from 'firebase'
import PercentCompleted from './PercentCompleted';
import '../styles/MakePost.css'
import Form from 'react-bootstrap/Form'


const MakePost = ({username}) => {
    // UPLOAD POST STATE
    const [description, setDescription] = useState('');
    const [img, setImg] = useState(null);
    const [percent, setPercent] = useState(0)
    
    // HANDLE CHANGE FUNCTIONS
    const handleDescriptionChange = (e) =>{
        setDescription(e.target.value);
    }; 
    const handleUploadChange = (e) =>{
        if(e.target.files[0]){
            setImg(e.target.files[0]);
        }
    };
    const handlePost =  (e) =>{
        e.preventDefault();
        const uploadTask = storage.ref(`images/${img.name}`).put(img);
        uploadTask.on( 
            firebase.storage.TaskEvent.STATE_CHANGED,
             (snapshot) => {
                const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100  
                );
                setPercent(percent);
             },
            // if error
            (err) =>{
                console.log(err);
                alert(err.message);
            },
            // when post completes
            () => {
                storage
                    .ref("images")
                    .child(img.name)
                    .getDownloadURL()
                    // put post and img inside firebase DB
                    .then(url => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            description: description,
                            postImg: url,
                            username: username
                        }); 
                    });
                setDescription('');
                setPercent(0);
                setImg(null);
            }
        );
    };

    return (
        <div className='app__MakePost'>
            <h1>Make Post!</h1>
            <Form>
                <Form.Group
                    className="my-3" 
                    controlId="formDescription"
                    label="Enter your description">
                    <Form.Label>Post description:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter your description..."
                        value={description}
                        onChange={handleDescriptionChange}/>
                </Form.Group>
                <input 
                    type="file"
                    onChange={handleUploadChange}/>
                <Form.Group
                    className="my-3" 
                    controlId="formFile">
                    <Button
                        type="submit"
                        variant="warning"
                        size="lg"
                        onClick={handlePost}>
                            Post
                    </Button>
                </Form.Group>
                {percent>0 ? <PercentCompleted percent={percent}/> : (<div></div>)}
            </Form>
        </div>
    )
}

export default MakePost
