import React, { useState, useEffect } from 'react';
import './CartNew.css';
import { useNavigate, useLocation } from 'react-router-dom';

const CheckoutSteps = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  // Determine the current step based on the URL
  const determineStepFromPath = (path) => {
    if (path === '/shipping') return 2;
    if (path === '/payment') return 3;
    return 1; // Default to step 1 (Cart)
  };

  // Set initial state based on the current path
  const [currentStep, setCurrentStep] = useState(() => determineStepFromPath(location.pathname));

  useEffect(() => {
    // Update step when the location changes
    setCurrentStep(determineStepFromPath(location.pathname));
  }, [location]);

  // Step navigation
  const nextStep = () => {
    if (currentStep === 1) {
      navigate('/shipping');
      setCurrentStep(2);
    } else if (currentStep === 2) {
      navigate('/payment');
      setCurrentStep(3);
    }
  };

  // Navigate to previous step
  const previousStep = () => {
    if (currentStep === 2) {
      navigate('/cart1');
      setCurrentStep(1);
    } else if (currentStep === 3) {
      navigate('/shipping');
      setCurrentStep(2);
    }
  };

  return (
    <div>
      <div className="checkout-steps-container">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>MY BAG</div>
        <div className="progress-line">
          <div className={`progress ${currentStep >= 2 ? 'progress-active' : ''}`}></div>
        </div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>ADDRESS</div>
        <div className="progress-line">
          <div className={`progress ${currentStep >= 3 ? 'progress-active' : ''}`}></div>
        </div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>PAYMENT</div>
      </div>
      <div className="button-group">
        <button onClick={previousStep} className="prev-step-btn" disabled={currentStep === 1}>
          Previous Step
        </button>
        <button onClick={nextStep} className="next-step-btn" disabled={currentStep === 3}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default CheckoutSteps;
