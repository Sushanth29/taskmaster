import React, { useState, useEffect } from 'react';
 import axios from 'axios';
 
 const ProjectForm = ({ onClose }) => {
   const [project, setProject] = useState({
     projectName: '',
     description: '',
     ownerName: '',
     managerName: '',
     team: '',
   });
 
   const [users, setUsers] = useState([]);
   const [teams, setTeams] = useState([]);
 
   const getUsers = () => {
     return new Promise((resolve, reject) => {
       axios
         .get("http://localhost:5001/all-users")
         .then((response) => {
           return resolve(response.data);
         })
         .catch((error) => {
           reject(error);
         });
     });
   };
   const getTeams = () => {
     return new Promise((resolve, reject) => {
       axios
         .get("http://localhost:5001/all-teams")
         .then((response) => {
           return resolve(response.data);
         })
         .catch((error) => {
           reject(error);
         });
     });
   };
   useEffect(() => {
     Promise.all([getUsers(), getTeams()])
       .then((response) => {
         const usersList = response[0]?.map((item) => item.username);
         setUsers(usersList);
         const teamsList = response[1]?.map((item) => item.teamName);
         setTeams(teamsList);
       })
       .catch((error) => {
         console.log("error", error);
       });
   }, []);
 
 
   const onSubmitClicked = async (e) => {
     e.preventDefault();
     try {
       await axios.post('http://localhost:5001/add-project', project);
       window.alert('Project added successfully!');
       onClose(); 
     } catch (error) {
       console.error('Error adding project:', error);
       window.alert('Error adding project. Please try again.');
     }
   };
 
   return (
     <form className="card border-0 w-100 p-3">
       <div className="card-body">
         <h4
           className="title"
           style={{
             fontSize: "24px",
             fontWeight: 600,
             margin: "10px 0px",
             color: "#f44336",
           }}
         >
           Create New Project
         </h4>
         <hr />
         <div className="container-fluid m-0 p-0">
           <div className="row m-0 p-0">
           
             <div className="col-md-6 p-2">
               <label className="form-label">Project Name</label>
               <input
                 placeholder="Enter Your Project Name"
                 className="form-control"
                 name="projectName"
                 type="text"
                 onChange={(e) =>
                   setProject({ ...project, projectName: e.target.value })
                 }
               />
             </div>
             
             <div className="col-md-6 p-2">
               <label className="form-label">Project Description</label>
               <textarea
                 placeholder="Enter Your Project Description"
                 className="form-control"
                 type="text"
                 rows="1"
                 name="description"
                 onChange={(e) =>
                   setProject({ ...project, description: e.target.value })
                 }
               />
             </div>
             {/* Product Owner */}
             <div className="col-md-6 p-2">
               <label className="form-label">Product Owner</label>
               <select
                 className="form-select form-control"
                 aria-label="Default select example"
                 name="ownerName"
                 onChange={(e) =>
                   setProject({ ...project, ownerName: e.target.value })
                 }
               >
                 <option selected disabled>
                   Select Product Owner
                 </option>
                 {users?.map((item) => (
                   <option value={item} key={item}>
                     {item}
                   </option>
                 ))}
               </select>
             </div>
             {/* Manger */}
             <div className="col-md-6 p-2">
               <label className="form-label">Manger</label>
               <select
                 className="form-select form-control"
                 aria-label="Default select example"
                 name="managerName"
                 onChange={(e) =>
                   setProject({ ...project, managerName: e.target.value })
                 }
               >
                 <option selected disabled>
                   Select manager
                 </option>
                 {users?.map((item) => (
                   <option value={item} key={item}>
                     {item}
                   </option>
                 ))}
               </select>
             </div>
             {/* Team */}
             <div className="col-md-12 p-2">
               <label className="form-label">Team</label>
               <select
                 className="form-select form-control"
                 aria-label="Default select example"
                 name="team"
                 onChange={(e) =>
                   setProject({ ...project, team: e.target.value })
                 }
               >
                 <option selected disabled>
                   Select your team
                 </option>
                 {teams?.map((item) => (
                   <option value={item} key={item}>
                     {item}
                   </option>
                 ))}
               </select>
             </div>
           </div>
           <div className="mt-2 p-2 d-flex align-items-end justify-content-end">
             <button
               type="submit"
               className="btn p-2 btn-primary w-full"
               onClick={onSubmitClicked}
             >
               Submit
             </button>
           </div>
         </div>
       </div>
     </form>
   );
 }
 
 export default ProjectForm;