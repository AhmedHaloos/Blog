import { createContext, useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteImage, uploadImage } from "../DatabaseHandler/FileStorage";
import { Link, useNavigate } from "react-router-dom";



//css
import '../css/main.css'

//Custom components
import Post from "../components/post";
import { collections, Post as MyPost } from '../DatabaseHandler/DataCollections'
import SideNavBar from "../components/MyNavBar";
import HomeContext from "../HomeContext";
import {
    getData, getSubData, getSingleData, insertData,
    updateData, registerForDataChange, deleteData
} from "../DatabaseHandler/FireStoreDB";
import { registerForAuthChange, logout } from "../DatabaseHandler/UserAuth";
import { registerForChat } from "../DatabaseHandler/ChatDatabase";

// Js
import DataContext from "../DataContext";
import Test from "../test";
import NewPost from "../components/NewPost";
import Footer from "../components/Footer";



const Home = () => {

    const contextData = useContext(DataContext);

    const [postBody, setPostBody] = useState('');

    const [isNewPost, setNewPost] = useState(true);
    const [updatePostId, setUpdatePostId] = useState('');
    const [currentPost, setcurrentPost] = useState({});
    const [currentImgUrl, setcurrentImgUrl] = useState('');

    const [cleared, setCleared] = useState(true);
    const [image, setImage] = useState('');

    const [NewPostState, setNewPostState] = useState(false);
    const [imgPosted, setImgPosted] = useState(false);
    const [posted, setPosted] = useState(false);


    const getCurrentUser = () => {

        let curUser = contextData.users.find((user) => {
            return contextData.currentUser.uid == user.id;
        })

        return curUser;
    }

    /**
     * 
     * @param {*} id 
     */
    const handleLikePost = (id) => {



    }
    /**
     * 
     * @param {*} id 
     */
    const handleUnLikePost = (id) => {

        let likedPosts = [];
        contextData.posts.forEach((post) => {
            if (post.id == id) {
                post.likeUsers.push(contextData.currentUser.postId);
            }
            likedPosts.push(post)
        })

    }
    /**
     * 
     * @param {*} postId 
     * @param {*} comment 
     */
    const handleAddComment = (postId, comment) => {


        console.log('sent')
    }
    /**
     * 
     * @param {*} dataCollection 
     * @param {*} id 
     */
    // async function getPost(dataCollection, id) {
    //     const post = await getSingleData(dataCollection, id);
    //     //console.log(post);

    // }

    /**
     * 
     * @param {*} post 
     */
    const handleAddPost = (post, img) => {

        // console.log(post);
        if (img !== '') {

            uploadImage(img, post.id)
                .then(() => {
                    setImgPosted(!imgPosted);
                })
                .catch((error) => {
                    console.log(error);
                })
            setCleared(true);
            //setImage(img);
            console.log('image added');
        }
        else {
            console.log('image did not added');
        }

        insertData(collections.posts, post)
            .then(() => {
                console.log('added');
                closeNewPost();
                let data = [];
                contextData.posts.forEach((post) => {
                    data.push(post);
                })
                data.push(post);
                contextData.setPosts(data);
                setPostBody('');
                setPosted(true);
            })

    }
    /**
     * 
     * @param {*} e 
     */
    const handlePostData = e => {

        setPostBody(e.target.value);
    }

    /**
     * 
     * @param {*} post 
     */
    const handleEditPost = (post, imgUrl) => {

        // display post to the user
        setNewPost(false);
        setcurrentPost(post);
        setcurrentImgUrl(imgUrl);
        openNewPost();
    }
    /**
     * 
     */
    const handleUpdatePost = (post, img) => {


        updateData(collections.posts, post.id, post)
            .then(() => {
                closeNewPost();
            })

    };

    /**
     * 
     * @param {*} postId 
     */
    const handleDeletePost = (postId) => {

        deleteData(collections.posts, postId)
            .then(() => {
                console.log('deleted');
                let data = [];
                contextData.posts.forEach((post) => {

                    if (post.id !== postId) {
                        data.push({ ...post })
                    }
                })
                contextData.setPosts(data)
            })
            .catch(() => {

                console.log('not deleted');
            })

        deleteImage(postId)
            .then(() => {
                console.log('deleted');
            })
            .catch((e) => {
                console.log(e);
            })



    }

    // upload image 
    const loadFile = function (event) {
        var image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
        setImage(event.target.files[0]);
        setCleared(false)
        //uploadImage(event.target.files[0])
    };

    const closeNewPost = () => {

        setNewPostState(false);
    }
    const openNewPost = () => {
        setNewPostState(true);
        console.log(NewPostState);
    }

    return (
        <HomeContext.Provider value={{
            handleEditPost, handleDeletePost, handleAddPost, closeNewPost, handleUpdatePost,
            getCurrentUser, posted, setPosted, isNewPost, setNewPost
        }}>

            <div className='container-fluid root-body' style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
                {/* <BlogNavBar currTab={'home'} />  */}

                <Test logout={logout} currPage={'home'} />
                <div className='row main-body'>
                    <div className='col-3 side-nav-col'>
                        <SideNavBar currentUser = {getCurrentUser()}  />

                    </div>
                    <div className='col-6' style={{ marginTop: '10rem' }}>
                        {
                            (contextData.isLoggedIn) ?
                                <form className="form-body">
                                    <div className="mb-3 create-new-post">
                                        <div>
                                            <Link to={'/profile'}>
                                                <img src="avatar.png" className="circle-img avatar-img" style={{ width: '4rem', height: '4rem' }} />
                                            </Link>
                                        </div>
                                        <input type={'button'} onClick={() => { openNewPost() }} value={'Add New Blog'} />

                                    </div>
                                    <div  >

                                    </div>
                                    {
                                        (NewPostState) ?
                                            <NewPost isNewPost={isNewPost} UpdatedPost={currentPost} currentImgUrl={currentImgUrl} /> :
                                            <></>

                                    }
                                </form>
                                :
                                <></>
                        }
                        {
                            contextData.posts.map((post) => (
                                <Post key={post.id} handleLikePost={handleLikePost} handleAddComment={handleAddComment}
                                    post={post} currentUser={contextData.currentUser} handleDeletePost={handleDeletePost} handleEditPost={handleEditPost}
                                    imgPosted={imgPosted} setImgPosted={setImgPosted} />
                            ))
                        }
                    </div>
                </div>
                <Footer />
            </div>

        </HomeContext.Provider>
    );

}
export default Home;