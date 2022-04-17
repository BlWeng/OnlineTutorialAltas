import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create_tutor() {
 const [form, setForm] = useState({
   first_name: "",
   last_name: "",
   certificate: "",
   rating: "",
   city: "",
   country: "",
   about: "",
   availability:""
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
 
   await fetch("http://localhost:3000/tutor/add", {
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
   first_name: "",
   last_name: "",
   certificate: "",
   rating: "",
   city: "",
   country: "",
   about: "",
   availability:"" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Add a New Tutor to the List</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="first name">First name</label>
         <input
           type="text"
           className="form-control"
           id="first name"
           value={form.first_name}
           onChange={(e) => updateForm({ first_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="last name">Last name</label>
         <input
           type="text"
           className="form-control"
           id="last name"
           value={form.last_name}
           onChange={(e) => updateForm({ last_name: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="certificate">Certificate</label>
         <input
           type="text"
           className="form-control"
           id="certificate"
           value={form.certificate}
           onChange={(e) => updateForm({ certificate: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="rating">Rating</label>
         <input
           type="text"
           className="form-control"
           id="rating"
           value={form.rating}
           onChange={(e) => updateForm({ rating: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="city">City</label>
         <input
           type="text"
           className="form-control"
           id="city"
           value={form.city}
           onChange={(e) => updateForm({ city: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="country">Country</label>
         <input
           type="text"
           className="form-control"
           id="country"
           value={form.country}
           onChange={(e) => updateForm({ country: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="about">About</label>
         <input
           type="text"
           className="form-control"
           id="about"
           value={form.about}
           onChange={(e) => updateForm({ about: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="availability">Availability</label>
         <input
           type="text"
           className="form-control"
           id="availability"
           value={form.availability}
           onChange={(e) => updateForm({ availability: e.target.value })}
         />
       </div>
       
       <div className="form-group">
         <input
           type="submit"
           value="Add the new tutor to the List"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
