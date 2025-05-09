import React from 'react';
import { useMsal } from '@azure/msal-react';

function SignInButton() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect().catch(e => {
      console.error("Erreur de login MSAL :", e);
    });
  };

  return (
    <button onClick={handleLogin}>
      Se connecter avec Microsoft
    </button>
  );
}

export default SignInButton;
