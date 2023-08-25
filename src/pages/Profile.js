import React from 'react'
import { useSelector } from 'react-redux'
import Header from "../components/common/Header"
import Button from '../components/common/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';
import ProfilePic from '../components/common/ProfilePic';

function ProfilePage() {
  const user = useSelector((state) => state.user.user);
  console.log("My user", user);

  if (!user) {
    return <Loader />
  }

  // logging out a user
  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success("Successfully Logged Out!!")
    }).catch((error) => {
      // An error happened.
      toast.error("User Logged out!!")
    });
  }

  // If the user is logged in, show their profile page:
  return (
    <div>
      <Header />
      {/* <h1>{user?.name}</h1> */}
      {/* <h1>{user.email} </h1> */}
      {/* <h1>{user.uid} </h1>  */}
      <br/>
      <ProfilePic />
      <br/>
      <Button text={"Logout"} onClick={handleLogout} />
      <div>
        
      </div>
    </div>
  )
}

export default ProfilePage
