import React, { useEffect, useState } from 'react'
import './Shipping.css'
import { Link } from 'react-router-dom'
import home from '../../images/home.jpg'
import wallet from '../../images/wallet-1.jpg'
import list from '../../images/list.jpg'
import CashCard from '../CashCard'
import { useContext } from 'react'
import { OrderContext } from '../../providers/orderProvider'
import useAxiosPublic from '../../hooks/useAxios'

function Shipping() {
    const {total,deliveryCharge,discount} = useContext(OrderContext);
    const axios = useAxiosPublic();

    const [name,setName]=useState('');
    const [mobileNumber,setMobileNumber]=useState('');
    const [flat,setFlat]=useState('');
    const [street,setStreet]=useState('');
    const [city,setCity]=useState('');
    const [state,setState]=useState('');
    const [postalCode,setPostalCode]=useState('');
    const [country,setCountry]=useState('');

    const [addresses,setAddresses] = useState([]);

    const submitAddress = async () =>{
        try {
            const response = await axios.post('/shipping/save-address',{
                name,
                mobileNumber,flat,street,
                city,state,postalCode,
                country
            })
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        const getAddress = async () =>{
            try{
                const response = await axios.get('/shipping/get-all-addresses');
                console.log(response.data.data);
                setAddresses(response.data.data);
            }
            catch(error){
                console.log(error);
            }
        }
        getAddress();
    },[axios])
    return (
        <div>
            <div>
            <h1>Saved Addresses</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile Number</th>
                    <th>Flat</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Postal Code</th>
                    <th>Country</th>
                </tr>
                </thead>
                <tbody>
                {addresses.map((address) => (
                    <tr key={address._id}>
                    <td>{address.name}</td>
                    <td>{address.mobileNumber}</td>
                    <td>{address.flat}</td>
                    <td>{address.street}</td>
                    <td>{address.city}</td>
                    <td>{address.state}</td>
                    <td>{address.postalCode}</td>
                    <td>{address.country}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            <p class="paymenthead">Shipping Address</p>
            <div className="addressdisplay">
                <ul className='ad'>
                    <li><img src={home} alt="Error" className="home-icon" /></li>
                    <li>--------------------------------------</li>
                    <li><img src={wallet} alt="Error" className="wallet-icon" /></li>
                    <li>--------------------------------------</li>
                    <li><img src={list} alt="Error" className="notepad-icon" /></li>
                </ul>

            </div>
            <CashCard props={{total,deliveryCharge,discount}}/>
            <form action="" class="paymentform" />
            <h3>Select delivery address</h3>
            <p id="delopt">In this address you'd like to display below? If so click the corresponding "Deliver to this
                address" button. Or you can enter a new delivery address</p>
            <div class="robertfox"></div>
            <button class="deliverhere"><span>Deliver Here</span></button>
            <div class="newadd">
                <h2>Add a new Address</h2>
                <div class="nametop">
                    <label for="name">Name</label>
                    <div>
                        <input type="text" name="myname" id="name" 
                        value={name}
                        onChange={ev=>setName(ev.target.value)}
                        />
                    </div>
                </div>
                <div class="mobno">
                    <label for="number">Mobile Number</label>
                    <div>
                        <input type="number" name="myname" id="number" 
                        value={mobileNumber}
                        onChange={ev=>setMobileNumber(ev.target.value)}
                        />
                    </div>
                </div>
                <div class="houseflat">
                    <label for="name">Flat, House no, Building, colony, Apartment</label>
                    <div>
                        <input type="text" name="myname" id="name" 
                        value={flat}
                        onChange={ev=>setFlat(ev.target.value)}
                        />
                    </div>
                </div>
                <div class="areacolony">

                    <label for="name">Area, colony, street, sector, village</label>
                    <div>
                        <input type="text" name="myname" id="name" 
                        value={street}
                        onChange={ev=>setStreet(ev.target.value)}
                        />
                    </div>
                </div>
                <div class="selectcity">
                    <label for="selectcity1">City</label>
                    <select name="city" id="selectcity1" value={city} onChange={ev=>setCity(ev.target.value)}>
                        <option value="New Delhi">New Delhi</option>
                        <option value="UP">UP</option>
                        <option value="Haryana">Haryana</option>

                    </select>
                </div>
                <div class="pincode">
                    <label for="number">Pin Code</label>
                    <div>
                        <input type="number" name="myname" id="number" 
                        value={postalCode} onChange={ev=>setPostalCode(ev.target.value)}
                        />
                    </div>

                </div>
                <div class="pincode">
                    <label for="text">Country</label>
                    <div>
                        <input type="text" name="myname" id="name" 
                        value={country} onChange={ev=>setCountry(ev.target.value)}
                        />
                    </div>

                </div>
                <div class="selectcity">
                    <label for="selectcity1">Select State</label>
                    <select name="city" id="selectcity1" value={state} onChange={ev=>setState(ev.target.value)}>
                        <option value="Delhi">Delhi</option>
                        <option value="Noida">Noida</option>
                        <option value="Gurugram">Gurugram</option>

                    </select>
                </div>
                <div class="newdefaultcheckbox"><input type="checkbox" /> Use as my default address</div>
                <button class="continue" onClick={submitAddress}>Save Address</button>
                <button class="continue" ><Link to='/payment'><span>Continue</span></Link></button>
            </div>
        </div>

    )
}

export default Shipping