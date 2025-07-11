// src/pages/auth/GoogleRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 1000); // give time for cookie to set and Redux to pick it up

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <h2 className="text-xl text-blue-600">Signing you in...</h2>
    </div>
  );
};

export default GoogleRedirect;
