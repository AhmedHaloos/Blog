import { useContext, useEffect, useState } from "react";
import LikeIcon from "./likeIcon";
import { Button } from 'react-bootstrap'

import PostDropDown from '../components/PostDropDown'
import USerInfo from "./UserInfo";
import { getSingleData, getSubData } from "../DatabaseHandler/FireStoreDB";
import { downloadImg } from '../DatabaseHandler/FileStorage'
import { collections } from "../DatabaseHandler/DataCollections";
import DataContext from "../DataContext";
import Test from "./bigPost";
import '../css/main.css'
import { LinkContainer } from "react-router-bootstrap";



function Post({ post, handleLikePost, handleSendComment, handleDeletePost, handleEditPost, imgPosted, setImgPosted }) {

    // const users = useContext(DataContext);
    // const [customUser, setCustomUser] = useState({});
    // const [dropDownState, setdropDownState] = useState(false);
    const [user, setUser] = useState({});
    const [imgUrl, setImgUrl] = useState('')
    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {

        getImage(post.id);
       // console.log('image load called');

    }, [imgPosted])
    const getImage = (id) => {
        downloadImg(id)
            .then((url) => {
                setImgUrl(url);
                //setImgPosted(false);    
            })
            .catch((error) => {

                console.log(error.message);

            })

    }
    const getUser = () => {
        let data = [];
        getSubData(collections.users, 'id', '==', post.userId)
            .then((querySnapshot) => {
                querySnapshot.forEach((myUser) => {

                    data.push(myUser.data());
                    setUser({ ...data[0] })
                   // console.log(data[0].id);
                })
            })
       
    }
    /************ test code *************/
    // console.log(users);
    const handleTest = () => {
        alert('clicked')
    }



    return (

        <div className="post-container  mt-4">
          
            <USerInfo user={user} post={post} imageUrl={imgUrl} />
            <section className="">
                {post.postBody.length > 80 ?
                <div style={{margin:'2rem'}} >
                {post.postBody.substr(0, 80)} 
                      <LinkContainer to={'/bigPost'} style={{textDecoration:'underline', color:'#009df7', cursor:'pointer', display:"inline"}}>
                        <p > Read More</p>
                      </LinkContainer>
                    </div>
                    :     
                <div className=" text-center m-1 p-2 mt-2">{post.postBody}</div>
                    }
            </section>
            <section>
                <img src={imgUrl} width='100%' className="post-img" />
            </section>
            <hr style={{ marginRight: '1rem', marginLeft: '1rem' }} />
         
        </div>
    )
}

export default Post;