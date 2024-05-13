import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./home";
import Filter from './Filter';
import Details from './Details';
import Header from './Header';
import Dashboard from './Dashboard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Router = () => {

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:5500/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/JSON",
                    "Content-Type": "application/JSON",
                    "Access-Control-Allow-Credentials": true
                }
            })
            .then((response) => {
                if(response.status === 200) return response.json();
                throw new Error ("Authentication Failed");
            })
            .then((resObject) => {
                setUser(resObject.user);
            })
            .catch((err) => {
                console.log(err);
            })
        };
        getUser();

       



    }, []);
     
    useEffect(() => {
    if(localStorage.getItem("token"))
    {
        axios.post("http://localhost:5500/user",{
            token:JSON.parse(localStorage.getItem("token"))
        }).then((response) => {
      console.log(response.data)
      setUser(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    },[])


    return(
        <BrowserRouter>
            <Header user = {user} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filter" element={<Filter />} />
                <Route path="/details" element={<Details />} />
                <Route path="/dashboard" element={<Dashboard user={user} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;