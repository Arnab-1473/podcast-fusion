import React, { useState } from 'react'
import Header from '../components/common/Header';
import SignupForm from '../components/SignupComponent/SignupForm';
import LoginForm from '../components/SignupComponent/LoginForm';

function SignupPage() {

  const [flag, setFlag] = useState(false);

  const handleSignup = () => {
    console.log("handle Signup")
  }

  return (
    <div>
      <Header />
      <div className='input-wrapper'>
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}

        {!flag ? <SignupForm /> : <LoginForm />}

        {!flag ? (
          <p style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
            Already have an account? Login.
          </p>
        ) : (
          <p style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
            Dont have an account? Signup.
          </p>
        )}

      </div>
    </div>
  );
}

export default SignupPage
