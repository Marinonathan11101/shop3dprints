
import Nav from "../routes/nav/nav.component";
import Footer from "./footer";
import { useState, useEffect, createElement } from "react";
import {jwtDecode} from 'jwt-decode';

const select = document.getElementById("dropdown");
console.log(select);


const getUserFromDataBase = async () => {
    const authToken = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(authToken); // Decode the token
    const userId = decodedToken.userId;
    
    console.log(userId);


    try{
        const response = await fetch(`https://shop3dprints.onrender.com/api/users/${userId}`, {
            method: 'GET',
        });
        

        if (response.ok)
        {
            const data = await response.json();
            return data;
        }
        else{
            console.error('Failed to fetch user at the id');
        }

    } catch (error) {
        console.error('Error:', error);

    }



}

const GenerateOptions = (user) => {

    const userHistory = user.history;
    console.log(userHistory);

    if (userHistory.length === 0)
    {
        
    }

    else{
        for(let i = 0; i < userHistory; i++)
        {
            const option = document.createElement("option");
            option.value = userHistory[i].name;
            option.textContent = userHistory[i].name;
            select.appendChild(option);
        }
    }
   
}





const ReviewPage = () => {

    useEffect(() => {
         
            GenerateOptions(getUserFromDataBase())
  
    }, []);


    return (
        <div className="PageContainer">
            <div className="ReviewPageContainer">
                <Nav />
                <div className="reviewFormContainer">
                    <form >
                        <label htmlFor="dropdown">Choose an option:</label>
                        <select
                            id="dropdown"
                        >
                        </select>

                        <button type="submit">Submit</button>
                    </form>
                </div>


            </div>
            <Footer />
        </div>
    );
};

export default ReviewPage;