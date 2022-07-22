import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/main.css'
import DataContext from "../DataContext";
import PostDropDown from "./PostDropDown";
const USerInfo = ({ post, user, imageUrl }) => {

 const contextData = useContext(DataContext);

 useEffect(()=>{console.log('current',  contextData.users); /* console.log('current', contextData.getCurrentUser());*/}, [user])
    return (
        <div className="profile-body user-profile">
            <div>
                <div>
                    <Link to={`/profilePage/${user.id}`}>
                        <img src="../avatar.png" className="circle-img avatar-img" style={{ width: '4rem', height: '4rem' }} />
                    </Link>
                </div>
                <div>
                    <Link to={`/profilePage/${user.id}`}>
                        <div >{user.name}</div>
                    </Link>
                    <div>{new Date(post.postDate).toDateString()}</div>
                </div>
            </div>
            {
                (user.id !== contextData.getCurrentUser()?.id) ?
                    <></>
                    :
                    <PostDropDown post={post} imageUrl={imageUrl} />
            }
        </div>
    )

}
export default USerInfo;