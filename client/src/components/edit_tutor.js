import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";



export default function Edit_tutor() {
 const [form, setForm] = useState({
  first_name: "",
  last_name: "",
  certificate: "",
  rating: "",
  city: "",
  country: "",
  about: "",
  availability:"",
  //records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:3000/tutors/getOne/${params.id.toString()}`);
 
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

   setForm({    
    first_name: "",
    last_name: "",
    certificate: "",
    rating: "",
    city: "",
    country: "",
    about: "",
    availability:""
    });
 
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
     first_name: form.first_name,
     last_name: form.last_name,
     certificate: form.certificate,
     rating: form.rating,
     city: form.city,
     country: form.country,
     about: form.about,
     availability:form.availability
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:3000/tutors/update/${params.id}`, {
     method: "PUT",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
   
   setForm({    
    first_name: "",
    last_name: "",
    certificate: "",
    rating: "",
    city: "",
    country: "",
    about: "",
    availability:""
    });

   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
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
           value="Update the tutor in the List"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}