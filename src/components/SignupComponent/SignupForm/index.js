import React, { useState } from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser } from "../../../slices/userSlice";


function SignupForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = async () => {
        console.log("handle Signup")
        setLoading(true);
        if (password == confirmPassword && password.length >= 8) {
            try {
                // creating user's account
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = userCredential.user;
                console.log("user", user);
                // saving user's details
                await setDoc(doc(db, "Users", user.uid), {
                    name: fullName,
                    email: user.email,
                    uid: user.uid,
                    // profilepic: fileUrl,
                });

                // save data in redux, call the redux action
                dispatch(
                    setUser({
                        name: fullName,
                        email: user.email,
                        uid: user.uid,
                    })
                );
                toast.success(("User has been created !"))
                setLoading(false);
                navigate("/profile")
            } catch (e) {
                console.log("error", e)
                toast.error(e.message)
                setLoading(false);
            }
        } else {
            //throw an error
            if (password != confirmPassword) {
                toast.error("Password and Confirm password should match")
            } else if (password.length < 8) {
                toast.error("Password must contain 8 characters")
            }
            setLoading(false)
        }
    };

    return (
        <>
            <InputComponent
                state={fullName}
                setState={setFullName}
                placeholder="Full Name"
                type="text"
                required={true}
            />

            <InputComponent
                state={email}
                setState={setEmail}
                placeholder="Email"
                type="text"
                required={true}
            />

            <InputComponent
                state={password}
                setState={setPassword}
                placeholder="Password"
                type="password"
                required={true}
            />

            <InputComponent
                state={confirmPassword}
                setState={setConfirmPassword}
                placeholder="Confirm Password"
                type="password"
                required={true}
            />

            <Button text={loading ? "Loading..." : "Signup"} 
            disabled={loading} 
            onClick={handleSignup} />
        </>
    )
}

export default SignupForm
