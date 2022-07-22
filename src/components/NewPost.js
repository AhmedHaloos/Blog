import { Post, User } from "../DatabaseHandler/DataCollections";
import { collections, Post as MyPost } from '../DatabaseHandler/DataCollections'

import { Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";

import USerInfo from "./UserInfo";
import '../css/main.css'
import HomeContext from "../HomeContext";
import DataContext from "../DataContext";





export default function NewPost({isNewPost, UpdatedPost, currentImgUrl}) {

    const homeContext = useContext(HomeContext);
    const dataContext = useContext(DataContext);

    const [postBody, setPostBody] = useState('');
    const[postTitle, setPostTitle] = useState('')

    const [cleared, setCleared] = useState(true);
    const [image, setImage] = useState('');

   useEffect(()=>{
    if(Object.keys(UpdatedPost).length > 0){
        setPostBody(UpdatedPost.postBody);
        setPostTitle(UpdatedPost.postTitle);
        setImage(currentImgUrl);
       
    }
   }, [])

    // upload image 
    const loadFile = function (event) {
        var image = document.getElementById('selectedImg');
        image.src = URL.createObjectURL(event.target.files[0]);
         setImage(event.target.files[0]);
         setCleared(false)
    };

    const handlePostData = e => {

        setPostBody(e.target.value);
    }
    const handlePostTitle = e=>{

        setPostTitle(e.target.value);
    }
    
    return (
        <div className="popup-box" >

            <div className="new-post box" >
                <div className="d-flex justify-content-end"
                    onClick={() => { homeContext.closeNewPost() }}
                    style={{cursor:'pointer'}}>
                    <i className="fa-solid fa-xmark " onClick={() => { homeContext.closeNewPost() }}
                        style={{
                            cursor: 'pointer', fontSize: 'x-large'
                        }}
                    ></i>
                </div>
                <USerInfo user={homeContext.getCurrentUser()}
                    post={new Post('body', 'title', Date.now(), '1', '', [])} newPost={true} />
                {/* <hr style={{ marginBottom: '1rem', marginTop: '0px', marginLeft:'0.3rem', marginRight:'0.3rem' }} /> */}
                <div className="new-post-input mb-1">
                    {/* <input type={'text'} placeholder='Title' value={postTitle} onChange={handlePostTitle}/> */}

                    <textarea type="text" className=" mt-1" rows='3' placeholder="Write Your Post"
                        // style={{ border: '1px solid #bbb' }}
                         onChange={handlePostData}  value={postBody}/>
                </div>

                <div style={{ display: cleared ? 'none' : 'flex', justifyContent: 'space-between' }}>
                    <img id="selectedImg" style={{ width: '100%' }} />
                    <span>
                        <i className="fa-solid fa-xmark" onClick={() => { setCleared(true) }}
                            style={{ cursor: "pointer", fontSize: 'large', marginLeft: '1.5rem' }}></i>
                    </span>
                </div>
                {/* <hr style={{ margin: '0px' }} /> */}
                <div id="image-chooser">

                    <div>
                        <input type="file" accept="image/*" name="image" id="image" onChange={(e) => { loadFile(e) }} style={{ display: 'none' }} />
                        <label htmlFor="image"><i className="fa-solid fa-image"></i></label>
                    </div>

                </div>
                <Button variant="primary" className="btn-snd-comment"
                    onClick={() => {
                        isNewPost ?
                            homeContext.handleAddPost(new MyPost(postBody, postTitle, Date.now(), dataContext.currentUser.uid), image)
                            : homeContext.handleUpdatePost({...UpdatedPost, postBody, postTitle})
                    }}>Submit</Button>
            </div>
        </div>

    )


}