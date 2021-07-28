import React, {useState} from 'react'
import '../styles/Post.css'
import {HiDotsHorizontal} from 'react-icons/hi'
import {MdDelete} from 'react-icons/md'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {db} from '../firebase'


const PostCaption = ({user,username,description, postId}) => {

    // STATE AND FUNCTION FOR EDITING DESCRIPTION
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [editDescription, setEditDescription] = useState('')
        const handleEditDescription = (e) =>{
            setEditDescription(e.target.value)
        }
        const handleEditDescriptionSubmit = (e) =>{
            e.preventDefault()
            db.collection('posts').doc(postId).update({
                description: editDescription
            })
            setEditDescription('')
            handleClose()
        }
    // FUNCTION FOR DELETING A POST
        const handleDelete = () =>{
            db.collection('posts').doc(postId).delete()
        }

    {if(user && user.displayName === username){
        return (
            <div className="app__PostDescriptionEdit">
                <p><b>{username}</b> - {description}</p>
                <div className="UD">
                    <HiDotsHorizontal
                        onClick={handleShow}
                        size="2rem"
                        className="editDescription"/>
                    <MdDelete
                        onClick={handleDelete}
                        className="deletePost"
                        size="1.75rem"/>
                </div>
                <Modal animation={false} show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Edit Description</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            onChange={handleEditDescription}
                            value={editDescription} 
                            type="text" 
                            placeholder="Edit your description..."
                            style={{
                                width: '100%'
                            }}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="warning" onClick={handleEditDescriptionSubmit}>
                            Edit 
                        </Button>
                    </Modal.Footer>
                </Modal>
                                
            </div>
        )
    } else {
        return (
            <div>
                <p><b>{username}</b> - {description}</p>
            </div>        
        )
    }}
    
}

export default PostCaption
