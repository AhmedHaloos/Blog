import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';
const Footer = () => {
    return (
        <CDBFooter className="shadow footer" style={{backgroundColor:'#333', color:'#fff'}}>
            <CDBBox
                display="flex"
                justifyContent="between"
                alignItems="center"
                className="mx-auto py-4 flex-wrap"
                style={{ width: '80%' }}
            >
                <CDBBox display="flex" alignItems="center">
                    <a href="/" className="d-flex align-items-center p-0 text-light" >
                        <img
                        className='blog-logo'
                            alt="logo"
                            src='blog-logo.png'
                            width="150px"
                            style={{marginRight:'3rem'}}
                        />
                        <span className="ml-4 h5 mb-0 font-weight-bold" >Ahmed Saeed</span>
                    </a>
                    <small className="ml-2">&copy; Software Engineer, 2022. All rights reserved.</small>
                </CDBBox>
                <CDBBox display="flex">
                    <a href= 'https://www.facebook.com/haloos.haloos/'>
                    </a>
                    <CDBBtn flat color="dark" className="p-2">
                        <CDBIcon fab icon="facebook-f" />
                    </CDBBtn>
                    {/* https://twitter.com */}
                    <a href= 'https://twitter.com/'>
                    <CDBBtn flat color="dark" className="mx-3 p-2">
                        <CDBIcon fab icon="twitter" />
                    </CDBBtn>
                    </a>
                    <a href= 'https://www.instagram.com//'>
                    <CDBBtn flat color="dark" className="p-2">
                        <CDBIcon fab icon="instagram" />
                    </CDBBtn>
                    </a>
                </CDBBox>
            </CDBBox>
        </CDBFooter>
    );
};


export default Footer;






































// export default function Footer() {

//     return (
//         <div className="footer">

//             <div className="col-3">
//                 <p>tel:</p>
//             </div>
//             <div className="col-6">
//                 <p>Contact us</p>
//                 <div >
//                     <a href="">facebook</a>
//                     <a>linkedIn</a>
//                     <a>twitter</a>

//                 </div>
//             </div>
//             <div className="col-3"></div>

//         </div>
//     )
// }