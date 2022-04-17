import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create_appointment() {
 const [form, setForm] = useState({
   tutor_name: "",
   student_name: "",
   time_window:""
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:3000/appointments/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ 
   tutor_name: "",
   student_name: "",
   time_window:""
   });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Request the Appointment</h3>
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
       
       <div className="form-group">
         <input
           type="submit"
           value="Add the new appointment"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
