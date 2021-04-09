import "./App.css";
import Nav_Header from "./components/Nav_Header";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
library.add(fab, faCheckSquare, faCoffee);

// function App() {
//   return <div></div>;
// }

// import React, { useEffect, useState } from "react";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";


// const App = () => {

// };

// function requestUserRepos(username){
    
  // Create new XMLHttpRequest object
  // const xhr = new XMLHttpRequest();
  
  // GitHub endpoint, dynamically passing in specified username
  // const url = `https://api.github.com/users/${username}/repos`;
  
  // Open a new connection, using a GET request via URL endpoint
  // Providing 3 arguments (GET/POST, The URL, Async True/False)
  // xhr.open('GET', url, true);
  
  // When request is received
  // Process it here
  // xhr.onload = function() {
  
      // Parse API data into JSON
      // const data = JSON.parse(this.response);
      
      // Log the response
      // console.log(data);
      
      // Loop over each object in data array
      // for (let i in data) {
      
          // Log the repo name
          // console.log('Repo:', data[i].name);
          
          // Log the repo description
          // console.log('Description:', data[i].description);
          
          // Log the repo url
          // console.log('URL:', data[i].html_url);
          
          // Add a separator between each repo
  //         console.log('=========================')
      
  //     }

  // }
  
  // Send the request to the server
  // xhr.send();


  // Call function passing in 'facebook' as GitHub username
// requestUserRepos('facebook');

// export default App;

// export default requestUserRepos;


  
const API_KEY = process.env.REACT_APP_API_KEY;
function App() {
  console.log(API_KEY);
  const [user, setUser] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [pageNum, setPageNum] = useState(1);
  const [issuesId, setIssuesId] = useState(21209);

  const getIssues = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues?page=${pageNum}&per_page=20`;
    let res = await fetch(url);
    let data = await res.json();
    // let res = await octokit.request("GET /issues");
    console.log("data: ", data);
  };
  const getComments = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues/21209/comments`;
    let res = await fetch(url);
    let data = await res.json();
    // let res = await octokit.request("GET /issues");
    console.log("data: ", data);
  };
  useEffect(() => {
    getIssues();
  }, []);
  return (
    <div>
      <Nav_Header />
    </div>
  );
}
export default App;
