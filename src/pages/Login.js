import { useNavigate } from "react-router-dom";
import BlogNavBar from "../components/BlogNavBar";

import LoginForm from "../components/LoginForm";
import  { login, registerForAuthChange, logout} from "../DatabaseHandler/UserAuth";
import Test from "../test";


export default function Login() {

    const navigate  = useNavigate();
const openHomePage = ()=>{
    navigate("/home", { replace: true })
}
    return (
        <>
        <Test currTab={'Login'}/>
        <LoginForm login = {login}  registerForAuthChange = {registerForAuthChange} 
        logout = {logout} openHomePage = {openHomePage} style={{marginTop:'5rem'}} />
        </>

    )
}