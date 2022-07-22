import { useState, useNa } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from "../DatabaseHandler/UserAuth";



function LoginForm({ login, registerForAuthChange, openHomePage }) {

    const [error, setError] = useState();
    const { register, handleSubmit } = useForm();

   
    const onSuccess = async (data) => {
        login(data.email, data.password)
            .then((userCreadental) => {

                openHomePage();
              toast.success('Logged In Successfully', { position: toast.POSITION.TOP_CENTER });

            })
            .catch((error) => {

                toast.error('Not Logged In Successfully', { position: toast.POSITION.TOP_CENTER });
            })

    }

    const onError = (error) => {
        toast.error(error?.email?.message, { position: toast.POSITION.TOP_CENTER });
        toast.error(error?.password?.message, { position: toast.POSITION.TOP_CENTER });
        setError(error);
    }


    registerForAuthChange((user) => {

        try {

            //console.log(user.displayNAme);
        } catch (error) {
            //console.log(error.message);
        }
    })



    return (

        <div className="wrapper login">

            <div className="logo">
                <img src="blog-logo.png" alt="No image found" />
            </div>
            <div className="text-center mt-4 name">
                Blog
            </div>
            <form className="p-3 mt-3" onSubmit={handleSubmit(onSuccess, onError)}>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input type="text" {...register('email', {
                        required: 'email is required', pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'email should be like this: email@example.com '
                        }
                    })}
                        id="email" placeholder="Username" />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input type="password" {...register('password',
                        { required: { value: true, message: 'password is required' } }

                    )}
                        id="pass" placeholder="Password" autoComplete="off" />
                </div>
                <button className="btn mt-3">Login</button>
            </form>
            <div className="text-center fs-6">
                <NavLink to= '#'>Forget password?</NavLink> or <NavLink to = "/signup">Sign up</NavLink>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginForm;