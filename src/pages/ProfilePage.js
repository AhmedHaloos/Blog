import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import SideNavBar from "../components/MyNavBar";
import { collections, Post as MyPost } from "../DatabaseHandler/DataCollections";
import { getData, getSubData } from "../DatabaseHandler/FireStoreDB"
import DataContext from "../DataContext"
import HomeContext from "../HomeContext";
import Test from "../test";
import Post from "../components/post";
import context from "react-bootstrap/esm/AccordionContext";

export default function ProfilePage() {

  const contextData = useContext(DataContext);
  const params = useParams();
  const [currentUser, setCurrentUser] = useState({});

  const Navigate = useNavigate();

  useEffect(() => {

  //  console.log(params.id);
    // get the user whom profilePage is displayed
    let user = contextData.users.find((user) => {
      return user.id == params.id;
    })
    if (user != null) {
      setCurrentUser(user);
    }
  

  }, [])





  return (
    <div className="container-fluid root-body" style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
      <Test currPage={'profilePage'} />
      <div className='row main-body'>
        <div className="col-3">
          <SideNavBar currentUser={ contextData.getCurrentUser()} />
        </div>
        <div className="col-6" style={{ marginTop: '10rem' }} >
          <img src="../avatar.png" style={{ width: '100%', height: '20rem', marginBottom: '1rem' }} />
          <p style={{ fontSize: '2em', marginTop: '2rem', textAlign: 'center' }}>
            {currentUser?.name}
          </p>
          {

              currentUser === null || currentUser.id == contextData.currentUser.uid?
              <></>
              :
          <div className="float" onClick={()=>{Navigate('/chat', {state:{id:currentUser.id}})}}>
            
              <i className="fa-solid fa-message my-float"></i>
          </div>
          
          }
          {
            contextData.posts.map((post) => (

              post.userId == currentUser.id ?
                <Post key={post.id} post={post} />
                :
                <div key={post.id}></div>

            ))

          }
        </div>
        <div className="col-3"></div>
        <Footer />
      </div>
    </div>
  )

}