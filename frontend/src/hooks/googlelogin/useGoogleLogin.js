const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const useGoogleLogin = () => {
  const loginWithGoogle = (role) => {
    if (!role || (role !== 'doctor' && role !== 'patient')) {
      alert('Please select a valid role before Google login');
      return;
    }

    // Redirect to your backend OAuth route
    window.location.href = `${BASE_URL}/api/auth/google?role=${role}`;
  };

  return { loginWithGoogle };
};

export default useGoogleLogin;
