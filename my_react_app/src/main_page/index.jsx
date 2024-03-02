import styles from './style.module.css'
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Main_Page() {
  const navigate = useNavigate();
  const [newdata, setNewData] = useState([])
  const [insert, setinser] = useState(false)
  const [update, setUpdate] = useState(false);
  const [view, setView] = useState(true);
  const [recipe_name, setRecipe_name] = useState("");
  const [instruction, setInstru] = useState("");
  const [ingre, setIngre] = useState("")
  const [rating, setRating] = useState("")
  const [time, setTime] = useState("");
  const [catagory, setCatagory] = useState("");
  const [filteredData, setfilteredData] = useState([]);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) {
      navigate("/login");
    }
  }, [])



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/viewall", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ email: data[0][1] }),
        });

        if (response) {
          const d = await response.json()
          setNewData(d);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  function loadall() {
    return (
      <table className={styles.back2}>
        <thead>
          <tr >
            <th>Recipe Id</th>
            <th>Recipe Name</th>
            <th>Ingredients</th>
            <th>Catagory</th>
            <th>Instruction</th>
            <th>Cooking Time</th>
            <th>rating</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {/* Render data here */}
          {newdata.map((item, index) => (
            <tr key={index} className={styles.cell}>
              {/* Render each row */}
              <td>{item.id}</td>
              <td>{item.recipe_name}</td>
              <td>{item.ingredients}</td>
              <td>{item.catagory}</td>
              <td>{item.instructions}</td>
              <td>{item.cooking_time}</td>
              <td>{item.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  function fun_sel(e) {
    // console.log(e.target.value)
    switch (e.target.value) {
      case "1":
        setView(true);
        // setDelete(false);
        setUpdate(false)
        setinser(false)
        break;
      case "2":
        // Insert logic
        setView(false);
        // setDelete(false);
        setUpdate(false)
        setinser(true)
        break;
      case "3":
        // Update logic
        setView(false);
        // setDelete(false);
        setUpdate(true)
        update_one()
        setinser(false)
        break;
      default:
        setView(true);
    }
  }
  function insert_new() {
    return (
      <>
        <div className={styles.main_div}>
          <br></br><br></br>
          <label className={styles.label}>Enter Recipe Name:</label>
          <input
            type="text"
            value={recipe_name}
            onChange={(e) => setRecipe_name(e.target.value)}
            className={styles.input}
            required
          /><br />
          <label className={styles.label}>Enter Recipe Ingredients:</label>
          <input
            type="text"
            value={ingre}
            onChange={(e) => setIngre(e.target.value)}
            className={styles.input}
            required
          /><br />
          <label className={styles.label}>Enter Recipe Instructions:</label>
          <input
            type="text"
            value={instruction}
            onChange={(e) => setInstru(e.target.value)}
            className={styles.input}
            required
          /><br />
          <label className={styles.label}>Enter Recipe catagory:</label>
          <input
            type="text"
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
            className={styles.input}
            required
          /><br />
          <label className={styles.label}>Enter Recipe Cooking Time:</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={styles.input}
            required
          /><br />
          <label className={styles.label}>Enter Recipe Rating:</label>
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className={styles.input}
            required
          /><br />
          <button className={styles.btn} onClick={insert_fun}>Insert</button>
        </div>
      </>
    )
  }

  async function insert_fun() {
    if (recipe_name.trim() == "" || ingre.trim() == "" || instruction.trim() == "" || catagory.trim() == "" || time.trim() == "" || rating.trim() == "") {
      Swal.fire({
        title: "Fill out all the fields",
        icon: "warning"
      })
    }
    else {
      let token = localStorage.getItem("token");
      try {
        const response = await fetch('http://127.0.0.1:5000/insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': JSON.parse(token)
          },
          body: JSON.stringify({ name: recipe_name.trim(), ingredients: ingre.trim(), instruction: instruction.trim(), catagory: catagory.trim(), rating: rating.trim(), time: time.trim() }),
        });

        if (response.status === 200) {
          Swal.fire({
            title: "Data inserted successfully",
            icon: "success"
          })

        }
        else if (response.status === 201) {
          Swal.fire({
            title: "something went wrong",
            icon: "warning"
          })
        }
        setRecipe_name("");
        setCatagory("");
        setIngre("");
        setInstru("");
        setCatagory("");
        setTime("")
        setRating("")
      } catch (e) {

      }

    }

  }
  
  function Row(props) {
    const [data, setData] = useState(props.data)
    const [up, setupdate] = useState(false)

    const setVal = (e, f) => {
      setupdate(true)
      // console.log("onaosdjaskdj");
      setData(p => {
        console.log(p)
        const obj = { ...p }
        obj[f] = e.target.value
        return obj
      })
    }

    const update = async () => {
      let token = localStorage.getItem("token")
      if (up) {
        try {
          const res = await fetch("http://localhost:5000/updateone", {
            method: "POST",
            headers: {
              'content-type': 'application/json',
              'token': token
            },
            body: JSON.stringify(data)
          })
          if (res.status == 200) {
            Swal.fire({
              title: "Updated successfully",
              icon: "success"
            })
            setupdate(false)
          }
          else {
            Swal.fire({
              title: "Something went wrong",
              icon: "warning"
            })
          }
        } catch (error) {
          console.log(error);
        }
      }
      else {
        Swal.fire({
          title: "Please Update first",
          icon: "warning"
        })
      }
    }
    async function deleteone(e) {
      // console.log(e.target.parentNode.parentNode.key);
      let token = localStorage.getItem("token")
      try {
        const res = await fetch("http://localhost:5000/delete_one", {
          method: "POST",
          headers: {
            'content-type': 'application/json',
            'token': token
          },
          body: JSON.stringify(data)
        })
        if (res.status == 200) {
          Swal.fire({
            title: "Deleted successfully",
            icon: "success"
          })
          // console.log(data.id)
          setfilteredData(filteredData.filter(item => item.id !== data.id))
        }
        else {
          Swal.fire({
            title: "Something went wrong",
            icon: "warning"
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
    return (
      <tr key={data.id}>
        {/* {console.log(data.recipe_name)} */}
        <td ><input type="text" value={data.recipe_name} onInput={e=>setVal(e,'recipe_name')} className={styles.row}/></td>
          <td><input type="text" value={data.ingredients} onInput={e=>setVal(e,'ingredients')} className={styles.row}/></td>
          <td><input type="text" value={data.catagory} onInput={e=>setVal(e,'catagory')} className={styles.row}/></td>
          <td><input type="text" value={data.instructions} onInput={e=>setVal(e,'instructions')} className={styles.row}/></td>
          <td><input type="text" value={data.cooking_time} onInput={e=>setVal(e,'cooking_time')} className={styles.row}/></td>
          <td><input type="text" value={data.rating} onInput={e=>setVal(e,'rating')} className={styles.row}/></td>
          <td>
            <button onClick={e=>update()} className={styles.btn2}>Update</button>
            <button onClick={e=>deleteone(e)} className={styles.btn2}>Delete</button>
          </td>
      </tr>
    )
  }

  function update_one(){
    let token = localStorage.getItem("token");
   ( async()=>{
    try {
    const res = await fetch("http://localhost:5000/get_data", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'token': JSON.parse(token)
      },

    })
    if (res.ok) {
      const d = await res.json()
      console.log(d)
      setfilteredData(d)
    }
    else {
      if (res.status === 201) {
        Swal.fire({
          title: 'something went wrong',
          icon: 'warning'
        })
      }
    }
  }
  catch (e) {
    Swal.fire({
      title: 'Error',
      text: 'An error occurred while deleting data. Please try again later',
      icon: 'error'
    });
  }})()
    
  }

  function fun_logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <div className={styles.back}>
        <h1>welcome </h1>
        <button className={styles.btn3} onClick={fun_logout}>Logout</button>
        <h3 className={styles.h3}>Select Any option</h3>
        <select className={styles.select} onChange={fun_sel}>
          <option value="1">View all</option>
          <option value="2">Insert</option>
          <option value="3">Update/Delete</option>
          {/* <option value="4">Delete</option> */}
        </select>
        <br />
        {view ? loadall() : <></>}
        {insert ? insert_new() : <></>}
        {/* {Delete ? delete_one() : <></>} */}
        {update ?  <>
        {filteredData.length > 0 ?
          <div className={styles.container}>
            <table >
              <thead>
                <tr >
                  <th>Recipe Name</th>
                  <th>Ingredients</th>
                  <th>Catagory</th>
                  <th>Instruction</th>
                  <th>Cooking Time</th>
                  <th>rating</th>
                  <th>Option</th>
                  {/* <th>Status</th> */}
                </tr>
              </thead>
              <tbody>
                {/* Render data here */}
                {
                  filteredData.map((item) => (
                    <Row data={item} />
                  ))
                }
                {/* <h1>asdjlaksjl</h1> */}
              </tbody>
            </table>
          </div>
          : <div className={styles.data}>No Data Available</div>}
      </> : <></>}
      </div>
    </>

  )
}
