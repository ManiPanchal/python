import styles from './style.module.css'
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Main_Page(){
    let data=localStorage.getItem("data");
    console.log(data)
    const navigate=useNavigate();
    data=JSON.parse(data)
    console.log(data[0][1]);
    const [newdata,setNewData]=useState([])
    const[insert,setinser]=useState(false)
    const[update,setUpdate]=useState(false);
    const[Delete,setDelete]=useState(false);
    const[view,setView]=useState(true);
    const[recipe_name,setRecipe_name]=useState("");
    const[instruction,setInstru]=useState("");
    const[ingre,setIngre]=useState("")
    const[rating,setRating]=useState("")
    const [time,setTime]=useState("");
    const[catagory,setCatagory]=useState("");
    const [id,setid]=useState("");
    const[new_data,setNewdata]=useState([]);
    if(!data){
      navigate("/login");
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://127.0.0.1:5000/viewall", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: data[0][1] }),
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
              {newdata.map((item,index) => (
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
      function fun_sel(e){
        // console.log(e.target.value)
        switch (e.target.value) {
            case "1":
              setView(true);
              setDelete(false);
              setUpdate(false)
              setinser(false)
              break;
            case "2":
              // Insert logic
              setView(false);
              setDelete(false);
              setUpdate(false)
              setinser(true)
              break;
            case "3":
              // Update logic
              setView(false);
              setDelete(false);
              setUpdate(true)
              setinser(false)
              break;
            case "4":
              
              setView(false);
              setDelete(true);
              setUpdate(false)
              setinser(false)
              break;
            default:
              setView(true);
          }
      }
      function insert_new(){
        return(
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
    
     async function insert_fun(){
          if(recipe_name.trim()==""||ingre.trim()==""||instruction.trim()==""||catagory.trim()==""||time.trim()==""||rating.trim()==""){
               Swal.fire({
                title:"Fill out all the fields",
                icon:"warning"
               })
          }
          else{
            try {
                const response = await fetch('http://127.0.0.1:5000/insert', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ name: recipe_name.trim(), ingredients: ingre.trim(), instruction: instruction.trim(),catagory:catagory.trim(),rating:rating.trim(),time:time.trim(),email: data[0][1]}),
                });
                
               if(response.status===200){
                   Swal.fire({
                    title:"Data inserted successfully",
                    icon:"success"
                   })
                   
               }
               else if(response.status===201){
                Swal.fire({
                    title:"something went wrong",
                    icon:"warning"
                   })
               }
               setRecipe_name("");
                   setCatagory("");
                   setIngre("");
                   setInstru("");
                   setCatagory("");
                   setTime("")
            }catch(e){

            }
          
            }

      }
    function delete_one(){
         return (
            <>
              <div className={styles.main_div}>
                <label>Enter the Id of recipe that you want to delete:</label>
                <input
                 type="text"
                 value={id}
                 onChange={(e) => setid(e.target.value)}
                 className={styles.input}
                 required/>
              <button onClick={del_fun} className={styles.btn}>Delete</button>
              </div>
            </>
         )
    }
   async function del_fun(){
        if(id.trim()==""){
            Swal.fire({
                title:"Please Enter Id",
                icon:"warning"
            })
        }
        else{
            try {
             let token=localStorage.getItem("token");
                const response = await fetch('http://127.0.0.1:5000/deleteone', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    
                  },
                  body: JSON.stringify({ id: id.trim(),email: data[0][1],role:data[0][3]}),
                });
                
               if(response.status===200){
                   Swal.fire({
                    title:"Data Deleted successfully",
                    icon:"success"
                   })
                   
               }
               else if(response.status===201){
                Swal.fire({
                    title:"You can not delete this recipe ",
                    icon:"warning"
                   })
               }
               else if(response.status===202){
                Swal.fire({
                    title:"something went wrong",
                    icon:"warning"
                })
               }
               setid("");
            }catch(e){

            }
          
        }
    }
    // async function get_new_data(){
    //   console.log('called')
    //   setLoading(true)
    //   try {
    //     const response = await fetch('http://127.0.0.1:5000/get_new_data', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({email: data[0][1]}),
    //     });
    //     if(response.ok){
    //       console.log('called2')
    //       const d = await response.json()
    //        const new_d=d.data;
    //         // {newdata.length > 0?update_one():<></>}
    //         setLoading(false)
    //         setNewdata(new_d);
    //     }
    //     // update_one()
    //   }
      
    //     catch(e){

    //     }
    // }
    function Row(props){
      const [data, setData] = useState(props.data)

      const setVal=(e, f)=>{
        console.log("onaosdjaskdj");
        setData(p=>{
          console.log(p)
          const obj = {...p}
          obj[f] = e.target.value
          return obj
        })
      }

      const update = async()=>{
        try {
          const res = await fetch("http://localhost:5000/updateone",{
            method:"POST",
            headers:{
              'content-type':'application/json'
            },
            body:JSON.stringify(data)
          })
          if(res.status==200){
             Swal.fire({
              title:"Updated successfully",
              icon:"success"
             })
          }
          else{
            Swal.fire({
              title:"Something went wrong",
              icon:"warning"
             })
          }
        } catch (error) {
          console.log(error);
        }
      }
      return (
        <tr>
          <td><input type="text" value={data.recipe_name} onInput={e=>setVal(e,'recipe_name')}/></td>
          <td><input type="text" value={data.ingredients} onInput={e=>setVal(e,'ingredients')}/></td>
          <td><input type="text" value={data.catagory} onInput={e=>setVal(e,'catagory')}/></td>
          <td><input type="text" value={data.instructions} onInput={e=>setVal(e,'instructions')}/></td>
          <td><input type="text" value={data.cooking_time} onInput={e=>setVal(e,'cooking_time')}/></td>
          <td><input type="text" value={data.rating} onInput={e=>setVal(e,'rating')}/></td>
          <td>
            <button onClick={e=>update()}>Update</button>
          </td>
        </tr>
      )
    }

    function update_one(){
            const filteredData = newdata.filter(item => item.user_id === data[0][1]);
        return(
            <>
            {/* {filteredData.length>0? */}
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
                <Row data={item}/>
              ))}
            </tbody>
          </table>
              </div>
              {/* <div className={styles.data}>No Data Available</div>} */}
            </>
        )
    }
  //   function update_one() {
  //     const filteredData = newdata.filter(item => item[7] === data[0][1]);
  
  //     const handleUpdate = async (id) => {
  //         const recipeToUpdate = filteredData.find(item => item[0] === id);
  
  //         if (!recipeToUpdate) {
  //             console.error("Recipe not found.");
  //             return;
  //         }
  
  //         try {
  //             const response = await fetch('http://127.0.0.1:5000/updateone', {
  //                 method: 'POST',
  //                 headers: {
  //                     'Content-Type': 'application/json',
  //                 },
  //                 body: JSON.stringify({
  //                     id: recipeToUpdate[0],
  //                     name: recipe_name.trim(),
  //                     ingredients: ingre.trim(),
  //                     instruction: instruction.trim(),
  //                     catagory: catagory.trim(),
  //                     rating: rating.trim(),
  //                     time: time.trim(),
  //                     email: data[0][1],
  //                 }),
  //             });
  
  //             if (response.ok) {
  //               if(response.status==200){

                
  //                 Swal.fire({
  //                     title: "Data updated successfully",
  //                     icon: "success"
  //                 })}

  //             } else {
  //                 Swal.fire({
  //                     title: "Something went wrong",
  //                     icon: "warning"
  //                 })
  //             }
  
  //             // Clear input fields after update
  //             setRecipe_name("");
  //             setCatagory("");
  //             setIngre("");
  //             setInstru("");
  //             setTime("");
  //             setRating("");
  //         } catch (error) {
  //             console.error('Error updating data:', error);
  //             // Handle error
  //         }
  //     };
  
  //     return (
  //         <>
  //             <div className={styles.container}>
  //                 <table>
  //                     <thead>
  //                         <tr>
  //                             <th>Recipe Id</th>
  //                             <th>Recipe Name</th>
  //                             <th>Ingredients</th>
  //                             <th>Catagory</th>
  //                             <th>Instruction</th>
  //                             <th>Cooking Time</th>
  //                             <th>rating</th>
  //                             <th>Option</th>
  //                         </tr>
  //                     </thead>
  //                     <tbody>
  //                         {filteredData.map((item, index) => (
  //                             <tr key={index}>
  //                                 <td><input value={item[0]} className={styles.input2} readOnly /></td>
  //                                 <td><input value={item[1]} className={styles.input2} onChange={(e) => setRecipe_name(e.target.value)} /></td>
  //                                 <td><input value={item[2]} className={styles.input2} onChange={(e) => setIngre(e.target.value)} /></td>
  //                                 <td><input value={item[3]} className={styles.input2} onChange={(e) => setCatagory(e.target.value)} /></td>
  //                                 <td><input value={item[4]} className={styles.input2} onChange={(e) => setInstru(e.target.value)} /></td>
  //                                 <td><input value={item[5]} className={styles.input2} onChange={(e) => setTime(e.target.value)} /></td>
  //                                 <td><input value={item[6]} className={styles.input2} onChange={(e) => setRating(e.target.value)} /></td>
  //                                 <td><button className={styles.btn2} onClick={() => handleUpdate(item[0])}>Update</button></td>
  //                             </tr>
  //                         ))}
  //                     </tbody>
  //                 </table>
  //             </div>
  //         </>
  //     );
  // }
  
    async function update_new(){
        if(recipe_name.trim()==""||ingre.trim()==""||instruction.trim()==""||catagory.trim()==""||time.trim()==""||rating.trim()==""){
            Swal.fire({
             title:"Fill out all the fields",
             icon:"warning"
            })
       }
       else{
         try {
             const response = await fetch('http://127.0.0.1:5000/updateone', {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({ name: recipe_name.trim(), ingredients: ingre.trim(), instruction: instruction.trim(),catagory:catagory.trim(),rating:rating.trim(),time:time.trim(),email: data[0][1],id:id}),
             });
             
            if(response.status===200){
                Swal.fire({
                 title:"Data updateed successfully",
                 icon:"success"
                })
                
            }
            else if(response.status===201){
             Swal.fire({
                 title:"something went wrong",
                 icon:"warning"
                })
            }
            setRecipe_name("");
                setCatagory("");
                setIngre("");
                setInstru("");
                setCatagory("");
                setTime("")
                setid("")
         }catch(e){

         }
       
         }

    }
    function fun_logout(){
       localStorage.clear();
       navigate("/login");
    }
    return(
        <>
        
        <div className={styles.back}>
        <h1>welcome</h1>
        <button className={styles.btn3} onClick={fun_logout}>Logout</button>
        <h3 className={styles.h3}>Select Any option</h3>
        <select className={styles.select} onChange={fun_sel}>
            <option value="1">View all</option>
            <option value="2">Insert</option>
            <option value="3">Update</option>
            <option value="4">Delete</option>
        </select>
        <br/>
        {view?loadall():<></>}
        {insert?insert_new():<></>}
        {Delete?delete_one():<></>}
        {update?update_one():<></>}
        </div>
        </>

    )
}