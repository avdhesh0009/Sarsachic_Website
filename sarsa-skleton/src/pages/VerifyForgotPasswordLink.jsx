import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxios';

const VerifyForgotPasswordLink = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const axios = useAxiosPublic();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`/users/reset-password/${userId}/${token}`);
        // console.log(response);
        if (response.data && response.data.success) {
          setMessage('Password Link Verification successful! Redirecting to Change Password Page...');
            setTimeout(() => {
              navigate(`/forget-password/new-password/${userId}/${token}`);
            }, 5000);
        }else{
          setMessage('Password Link Verification failed. Please try again.');
        }
      }
      catch(error){
        setMessage('An error occurred during password link verification. Please try again later.');
      }
      finally{
        setIsLoading(false);
        console.log('Password Link Verification process finished.');
      }
    };
    verifyUser();
  }, []);

  return (
      <div className="verification-container">
        {isLoading ? (
          <p>Verifying Password Link...</p>
        ) : (
          <p className='text-black'>{message}</p>
        )}
      </div>
  );
};

export default VerifyForgotPasswordLink;
