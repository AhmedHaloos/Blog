import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../DatabaseHandler/FireStoreDB'
import { insertData } from "../DatabaseHandler/FireStoreDB";
import { signup } from '../DatabaseHandler/UserAuth'
import { collections, User } from "../DatabaseHandler/DataCollections";
import BlogNavBar from "../components/BlogNavBar";
import Test from "../test";


/******************  Form  ******************/
const SignUp = () => {

    const navigate = useNavigate();

    const [error, setError] = useState();
    const { register, handleSubmit, setValue } = useForm();


    /****************  DB  *********************/
    function addUser(user) {

        console.log("add user");
        signup(user.email, user.password)
            .then(
                async (userCredential) => {
                   // toast.success('user added')
                    await insertData(collections.users, { ...user, id : userCredential.user.uid });
                    clear();
                    goToSignIn();
                    console.log("user added");
                })
            .catch((error) => {
                console.log(error);
                //toast.error('Error in saving user : ' + error.message);
            });

        // return insertData(collections.users, user);
        //  return insertionResult; 
    }



    /**
     * 
     * @param {*} data 
     */
    function onSuccess(data) {

        let user = new User(data.fName + " " + data.lName, data.phone,
            data.email, data.password, data.postId, '', {}, '');

        addUser(user);

    

    }

    /**
     * 
     * @param {*} error 
     */
    function onError(error) {
        if (error?.fName?.message) {
            toast.error(error?.fName?.message, { position: toast.POSITION.TOP_CENTER });
        }
        else if (error?.phone?.message) {

            toast.error(error?.phone?.message, { position: toast.POSITION.TOP_CENTER });
        }
        else if (error?.email?.message) {

            toast.error(error?.email?.message, { position: toast.POSITION.TOP_CENTER });
        }
        else {
            toast.error(error?.password?.message, { position: toast.POSITION.TOP_CENTER });
        }
        setError(error);
    }
    /**
     * 
     */
    function clear() {

        setValue('fName', '');
        setValue('lName', '');
        setValue('phone', '');
        setValue('email', '');
        setValue('password', '');
    }

    const goToSignIn = () => {

        navigate("/", { repalce: true })
    }

    return (

        <>
        <Test currTab={'SignUp'} />
            <div className="registration-form" style={{marginTop:'5rem'}}>
                <form onSubmit={handleSubmit(onSuccess, onError)}>
                    <div className="logo mb-2">
                        <img src="blog-logo.png" alt="No image found" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control item mt-3" {...register('fName', { required: 'you must write your first name' })
                        }
                            placeholder="First Name" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control item mt-3" {...register('lName')}
                            placeholder="Last Name" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control item" {...register('phone', { required: 'you must add your phone' })}
                            placeholder="Phone Number" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control item" {...register('email',
                            {
                                required: 'email is required', pattern: {
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'email should be like this: email@example.com '
                                }
                            })}
                            placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control item" {...register('password', { required: 'you must craete a password' }

                        )}
                            placeholder="Password" />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block create-account">Create Account</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    )

}
export default SignUp;