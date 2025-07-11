const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGoogleLogin = () => {
  const loginWithGoogle = (role) => {
    if (!role || (role !== 'doctor' && role !== 'patient')) {
      alert('Please select a valid role before Google login');
      return;
    }

    // 👇 Pass role as state (this is what Google OAuth expects)
    window.location.href = `${BASE_URL}/api/auth/google?state=${role}`;
  };

  return { loginWithGoogle };
};

export default useGoogleLogin;
