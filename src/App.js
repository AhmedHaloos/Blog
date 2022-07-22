import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';


import { registerForChat } from './DatabaseHandler/ChatDatabase'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import BlogNavBar from './components/BlogNavBar';
import { logout, registerForAuthChange } from './DatabaseHandler/UserAuth';
import { useEffect, useState } from 'react';
import About from './pages/About';
import ProfilePage from './pages/ProfilePage';
import DataContext from './DataContext';
import { getData, getSubData } from './DatabaseHandler/FireStoreDB';
import BigPost from './components/bigPost';
import { collections } from './DatabaseHandler/DataCollections';
import LoadingPage from './pages/LoadingPage';
import Me from './pages/Me'
import Chat from './pages/ChatPage';
import Settings from './pages/Settings'

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [dispState, setDispState] = useState(true)
  const [navVisible, setNavVisible] = useState(true);
  const [prevScrollpos, setPrevScrollPos] = useState(window.pageYOffset);
  const [isReady, setReady] = useState(0);
   const[conversations, setConversations] = useState([{}]);


  useEffect(()=>{
    let chatUser = getCurrentUser();
     let cnvs = [] 
    for (const key in chatUser?.convs) {
      
      registerForChat(chatUser?.convs[key], (snapshot) => {
        cnvs.push({convBody:snapshot.val(), id:key});
        // console.log(snapshot.val());
           
      })

    }
    setConversations(cnvs)

}, [users])



  useEffect(() => {

    registerForAuthChange((authUser) => {

      if (authUser !== null) {
        setCurrentUser({ ...authUser })
        console.log('logged in ');
        getUsers(authUser);
        setLoggedIn(true);

      }
      else {
        setLoggedIn(false);
        console.log('logged out');
      }
    })
    getPosts();
  }, [])



  //reaquest all posts
  const getPosts = async () => {

    let data = [];
    const querySnapshot = await getData(collections.posts);
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    });
    setPosts(data);
    setReady(1);
  }

  const getUsers = async (authUser) => {

    let usersData = [];
    const userDocs = await getData(collections.users)
   
    userDocs.forEach((userDoc) => {

      usersData.push(userDoc.data());
    })

   // listenForCahts();
    setUsers(usersData);
    //  setReady(2);
  }

  const getCurrentUser = () => {

    let curUser = users.find((user) => {
      return currentUser.uid == user.id;
    })

    return curUser;
  }

  // onClick on window
  window.onclick = (e) => {

    if (!e.target.classList.contains('ddown-btn')) {
      setDispState(!dispState);
    }

  }
  // scroll disappear navbar
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      setNavVisible(true);
      //document.getElementById("navbar").style.top = "0";
    } else {
      setNavVisible(false);
      //document.getElementById("navbar").style.top = "-50px";
    }
    setPrevScrollPos(currentScrollPos);
  }

  return (
    <DataContext.Provider value={{
      isLoggedIn, currentUser, users, posts, comments, dispState, setDispState, getCurrentUser,
      setCurrentUser, setPosts, setComments, setUsers, navVisible, conversations
    }}>

      <Router>
        <Routes>
          <Route path='/' element={isReady == 1 ? <Home /> : <LoadingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='signin' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Me />} />
          <Route path='/profilePage/:id' element={<ProfilePage />} />
          <Route path='/bigPost' element={<BigPost />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/settings' element = {<Settings/>}/>

        </Routes>
      </Router>
    </DataContext.Provider>
  )
}

export default App;
