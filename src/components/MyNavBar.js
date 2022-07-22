
import { useContext, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import '../css/main.css'
import DataContext from '../DataContext'



export default function SideNavBar({currentUser}){

    const contextData = useContext(DataContext);
    // useEffect(()=>{console.log(contextData);}, [])
return (

    <div className="side-nav-container">
        <ul>
           <LinkContainer to={contextData.isLoggedIn ? '/profile': '/signin'}><li>
           <i className="fa-solid fa-user" style={{marginRight:'1rem', fontSize:'1.5rem'}}></i>
            {contextData.isLoggedIn?contextData.getCurrentUser()?.name:'Profile Name'} </li></LinkContainer>
           <LinkContainer to={'/home'}><li>
           <i className="fa-solid fa-house" style={{marginRight:'1rem', fontSize:'1.5rem'}}></i>
            Home</li></LinkContainer>
           <LinkContainer to={'/about'}><li>
           <i className="fa-solid fa-circle-info" style={{marginRight:'1rem', fontSize:'1.5rem'}}></i>
            About</li></LinkContainer>
           <LinkContainer to={'/'}><li>
           <i className="fa-solid fa-gear" style={{marginRight:'1rem', fontSize:'1.5rem'}}></i>
            Settings</li></LinkContainer>
        </ul>

    </div>

)
    
}