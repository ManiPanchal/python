import React, { useState,useEffect,createContext } from 'react';
import styles from './style.module.css';
import { Link, json } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
function Login() {
  let invalid=0;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  useEffect(()=>{

    let t=localStorage.getItem("token")
    if(t){
      navigate("/main")
    }
  },[])
  
  const ptrn = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '' && name.trim() === '' && password.trim() === '') {
      alert('Please enter data.');
    } else if (!email.trim().match(ptrn)) {
      alert('Please enter a valid email.');
    } else {
      
      console.log('Form submitted:', name, email, password);
      const data={name:name,email:email,password:password};
       getdata(data);
    }
  };
  
  function getdata(data)
  {
    console.log("inside");
    console.log(data);
      const fun= async()=>{
        // console.log(data,typeof(data));
        const response=await fetch("http://127.0.0.1:5000/login",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data),
      });
        if(response.ok){
          let data=await response.json()
            localStorage.setItem("token",JSON.stringify(data.token))
            // localStorage.setItem("data",JSON.stringify(data.data))
            // setResponseData(data.data);
            navigate("/main")
          
        }
        else if(response.status===400){
          swal.fire({
            title:"Please enter complete",
            icon:"warning"
          })
        }
        else if(response.status===201){
          invalid++;
          console.log(invalid)
          swal.fire({
            title:"Please enter valid data",
            icon:"warning"
          })
          setEmail("");
          setName("");
          setPassword("");
        }
        
      }
     fun(); 
  }
  return (
  
    (invalid!==0?
    <div id={styles.login}>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter username:</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          className={styles.back}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <label className={styles.email_i}>Enter Email:</label>
        <input
          type="email"
          placeholder="abc@gmail.com"
          name="email"
          
          value={email}
          className={styles.back}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <label>Enter Password:</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          className={styles.back}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <input type="submit" value="Submit" id={styles.data_submit} />
      </form>
      <Link to="/signup" >Signup</Link><br />
      <p className={styles.para}>Enter valid data</p>
      {/* <Link to="/forgot">Forgot password?</Link>  */}
    </div> :<div id={styles.login}>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter username:</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          className={styles.back}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <label className={styles.email_i}>Enter Email:</label>
        <input
          type="email"
          placeholder="abc@gmail.com"
          name="email"
          
          value={email}
          className={styles.back}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <label>Enter Password:</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          className={styles.back}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <input type="submit" value="Submit" id={styles.data_submit} />
        <Link to="/signup" >Signup</Link><br />
      </form>
      
      
      {/* <Link to="/forgot">Forgot password?</Link>  */}
    
    </div>)
    
  );
}

export default Login;