import { useContext } from "react";
import BlogNavBar from "../components/BlogNavBar";
import Footer from "../components/Footer";
import SideNavBar from "../components/MyNavBar";
import DataContext from "../DataContext";
import Test from "../test";


export default function About() {

    const contextData = useContext(DataContext);
    return (
        <div className="container-fluid root-body" style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
            <Test />
            <div className='row main-body'>
                <div className="col-4">
                    <SideNavBar currentUser={ contextData.getCurrentUser()}/>
                </div>
                <div className="col-6"

                 style={{ marginTop: '10rem', backgroundImage: "url('about-background.jpg')" , backgroundRepeat: 'no-repeat', backgroundSize: 'cover',height:'20rem' }}>
                    <p style={{fontSize:'xx-large', fontFamily:''}}>About Blog</p>
                    <p>

                        What is Lorem Ipsum?

                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    </p>
                </div>
                
                {/* <Footer /> */}
            </div>
        </div>
    )




}