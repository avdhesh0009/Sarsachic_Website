import React, { useEffect, useState } from 'react';
import './Shipping.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { OrderContext } from '../../providers/OrderProvider';
import useAxiosPublic from '../../hooks/useAxios';
import CheckoutSteps from './CheckoutSteps';

function Shipping() {
    const { total, deliveryCharge, discount } = useContext(OrderContext);
    const axios = useAxiosPublic();

    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [flat, setFlat] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [defaultAddress, setDefaultAddress] = useState(false); // New state for default address checkbox
    const [isSubmitting, setIsSubmitting] = useState(false); // For loading state during form submission
    const [addresses, setAddresses] = useState([]);

    const submitAddress = async () => {
       
        if (!name || !mobileNumber || !flat || !city || !state || !postalCode || !country) {
            alert("Please fill all fields or Reselect City, State options");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await axios.post('/shipping/save-address', {
                name, mobileNumber, flat, street, city, state, postalCode, country, defaultAddress
            });
            console.log(response.data);

            // Clear form after successful submission
            setName('');
            setMobileNumber('');
            setFlat('');
            setStreet('');
            setCity('');
            setState('');
            setPostalCode('');
            setCountry('');
            setDefaultAddress(false);

            // Reload saved addresses after submission
            getAddress();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getAddress = async () => {
        try {
            const response = await axios.get('/shipping/get-all-addresses');
            console.log(response.data.data);
            setAddresses(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAddress();
    }, [axios]);

    return (
        <div>
            <CheckoutSteps />
            <div>
                <h1 className="paymenthead">Saved Addresses</h1>
                <div className="address-grid">
                    {addresses.map((address) => (
                        <div key={address._id} className="address-card">
                            <p><strong>Name:</strong> {address.name}</p>
                            <p><strong>Mobile Number:</strong> {address.mobileNumber}</p>
                            <p><strong>Flat:</strong> {address.flat}</p>
                            <p><strong>Street:</strong> {address.street}</p>
                            <p><strong>City:</strong> {address.city}</p>
                            <p><strong>State:</strong> {address.state}</p>
                            <p><strong>Postal Code:</strong> {address.postalCode}</p>
                            <p><strong>Country:</strong> {address.country}</p>
                            <button className="deliverhere"><span>Deliver Here</span></button>
                        </div>
                    ))}
                </div>
            </div>
            <form className="paymentform">
                <h3>Select delivery address</h3>
                <p id="delopt">If the address you'd like to use is listed above, click the "Deliver to this address" button. Otherwise, you can enter a new delivery address.</p>
                <div className="newadd">
                    <h2>Add a new Address</h2>
                    <div className="nametop">
                        <label htmlFor="name">Name</label>
                        <div>
                            <input type="text" name="name" id="nameA"
                                value={name}
                                onChange={ev => setName(ev.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mobno">
                        <label htmlFor="number">Mobile Number</label>
                        <div>
                            <input type="number" name="number" id="numberA"
                                value={mobileNumber}
                                onChange={ev => setMobileNumber(ev.target.value)}
                            />
                        </div>
                    </div>
                    <div className="houseflat">
                        <label htmlFor="flat">Flat, House no, Building, colony, Apartment</label>
                        <div>
                            <input type="text" name="flat" id="flat"
                                value={flat}
                                onChange={ev => setFlat(ev.target.value)}
                            />
                        </div>
                    </div>
                    <div className="areacolony">
                        <label htmlFor="street">Area, colony, street, sector, village</label>
                        <div>
                            <input type="text" name="street" id="street"
                                value={street}
                                onChange={ev => setStreet(ev.target.value)}
                            />
                        </div>
                    </div>
                    <div className="selectcity">
                        <label htmlFor="city">City</label> <br />
                        <select name="city" id="city" value={city} onChange={ev => setCity(ev.target.value)}>
                            <option value="New Delhi">New Delhi</option>
                            <option value="UP">UP</option>
                            <option value="Haryana">Haryana</option>
                        </select>
                    </div>
                    <div className="pincode">
                        <label htmlFor="postalCode">Pin Code</label>
                        <div>
                            <input type="number" name="postalCode" id="postalCode"
                                value={postalCode} onChange={ev => setPostalCode(ev.target.value)}
                            />
                        </div>
                    </div>
                    <div className="pincode">
                        <label htmlFor="country">Country</label>
                        <div>
                            <input type="text" name="country" id="country"
                                value={country} onChange={ev => setCountry(ev.target.value)}
                            />
                        </div>
                    </div>
                    <div className="selectcity">
                        <label htmlFor="state">Select State</label> <br />
                        <select name="state" id="state" value={state} onChange={ev => setState(ev.target.value)}>
                            <option value="Delhi">Delhi</option>
                            <option value="Noida">Noida</option>
                            <option value="Gurugram">Gurugram</option>
                        </select>
                    </div>
                    <div className="newdefaultcheckbox">
                        Use as my default address <input type="checkbox" className='chkbox' checked={defaultAddress} onChange={(e) => setDefaultAddress(e.target.checked)} />
                    </div>
                    <div className="btn">
                        <button className="continue" type="button" onClick={submitAddress} disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Address'}
                        </button>
                        <button className="continuebt"><Link to='/payment'><span>Continue</span></Link></button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Shipping;
