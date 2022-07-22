
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../css/main.css'
import DataContext from '../DataContext';
import HomeContext from '../HomeContext';
import 'bootstrap'

export default function PostDropDown({post, imageUrl}) {

  const contextData = useContext(HomeContext);
  const [locDispState, setLocDispState] = useState(false);

  useEffect(
    () => {
      setLocDispState(false);
    }, [contextData.dispState,])

  return (


    <div className="dropdown">
      <div className="colapse-icon ddown-btn " id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
       onClick={(e) => { (contextData.isLoggedIn) ? setLocDispState(!locDispState) : toast.error('you must login first'); }} >
        <i className="fa-solid fa-ellipsis ddown-btn"  ></i>
      </div>
      <ul className ="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a className ="dropdown-item" type={'button'} onClick={() => { contextData.handleEditPost(post, imageUrl) }}>Edit Post</a></li>
        <li><a className ="dropdown-item" type={'button'} onClick={() => {contextData.handleDeletePost(post.id) }} >Delete Post</a></li>
      </ul>
    </div>

  )

}