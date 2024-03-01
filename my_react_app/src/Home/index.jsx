
import React from "react";
import styles from "./style.module.css";
import {Link} from "react-router-dom";
export default function Home()
{
   const backgroundImageStyle = {
      // backgroundImage: 'url("/path-to-your-image.jpg")',
      // backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat',
      background: 'rgba(0,0,0,0.7)url("http://localhost:8000/back.jpg")',
      backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  backgroundPosition: 'center',
  height:'490px',
  position:'relative',
  backgroundBlendMode: 'darken'
    };
     return (
        <>
        
        
           {/* <div id={styles.main}></div> */}
           <div id={styles.home} >
           <h1>Home Page</h1>
           <Link to="/login">LOGIN</Link>
           <Link to="/signup">Signup</Link>
           </div>
           
        </>
     )
}