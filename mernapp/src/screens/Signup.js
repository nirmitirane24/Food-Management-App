import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            })
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert('Enter Valid Credentiatls')

        }
        // Handle the response from the server
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className='main-container'>
                <div className='container-signup'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={credentials.name} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" name='email' value={credentials.email} onChange={handleChange} id="exampleInputEmail1" />
                            <div id="emailHelp" className="form-text" ></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputaddress" className="form-label">Address</label>
                            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={handleChange} id="exampleInputEmail1" />
                            <div id="addressHelp" className="form-text" ></div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to='/login' className='signup-link'>Already an user</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
