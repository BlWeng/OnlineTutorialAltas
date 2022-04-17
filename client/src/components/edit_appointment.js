import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit_appointments() {
 const [form, setForm] = useState({
    tutor_name: "",
    student_name: "",
    time_window:"",
   //records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:3000/appointments/getOne/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
    tutor_name: form.tutor_name,
    student_name: form.student_name,
    time_window:form.time_window,
     
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:3000/appointments/update/${params.id}`, {
     method: "PUT",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
     <div className="form-group">
         <label htmlFor="tutor name">Tutor name</label>
         <input
           type="text"
           className="form-control"
           id="tutor_name"
           value={form.tutor_name}
           onChange={(e) => updateForm({ tutor_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="student name">Student name</label>
         <input
           type="text"
           className="form-control"
           id="student_name"
           value={form.student_name}
           onChange={(e) => updateForm({ student_name: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="time window">Time window</label>
         <input
           type="text"
           className="form-control"
           id="time_window"
           value={form.time_window}
           onChange={(e) => updateForm({ time_window: e.target.value })}
         />
       </div>
    
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}