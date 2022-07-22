import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "react-spinkit";

export default function LoadingPage() {

    return (
        <div>
            <p style={{textAlign:'center', fontSize:'2em', marginTop:'3rem'}}>Ahmed Saeed Blog</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginTop: '10rem' }}>

                <Spinner name="double-bounce" style={{ width: 100, height: 100 }} />
                <Spinner name="circle" style={{ width: 100, height: 100 }} />
                <Spinner name="cube-grid" style={{ width: 100, height: 100 }} />
                <Spinner name="wave" color="coral" style={{ width: 100, height: 100 }} />
                <Spinner name="three-bounce" style={{ width: 100, height: 100 }} />
                <Spinner name="wandering-cubes" style={{ width: 100, height: 100 }} />
                <Spinner name="chasing-dots" style={{ width: 100, height: 100 }} />
                <Spinner name="rotating-plane" style={{ width: 100, height: 100 }} />

            </div>
        </div>

    )
}