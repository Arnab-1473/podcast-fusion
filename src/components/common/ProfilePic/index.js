import React, { useEffect, useState } from 'react'
import "./styles.css"
import { Avatar } from '@mui/material'
import Button from '../Button'
import FileInput from '../Input/FileInput';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../../../firebase';

function ProfilePic() {
    const [profileImage, setProfileImage] = useState(null);
    const [url, setUrl] = useState(null)

    useEffect(() => {
        // Load the profile image URL from storage (localStorage)
        const storedImageUrl = localStorage.getItem('profileImageUrl');
        if (storedImageUrl) {
            setUrl(storedImageUrl);
        }
    }, []);

    const profileImageHandle = (file) => {
        setProfileImage(file);
    }
    // console.log("profile pic",profilePic);
    const handleSubmit = async () => {
        try {
            const profileImageRef = ref(
                storage,
                `profile-image/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(profileImageRef, profileImage);
            const imageUrl = await getDownloadURL(profileImageRef);
            setUrl(imageUrl);
            setProfileImage(null);

            // Save the profile image URL to storage (localStorage)
            localStorage.setItem('profileImageUrl', imageUrl);

            toast.success("Profile picture uploaded")
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    return (
        <div className='profile-wrapper'>
            <Avatar
                alt="Remy Sharp"
                src={url}
                sx={{ width: 150, height: 150 }}
                className='avatar'
            />

            <FileInput
                accept={"image/*"}
                id="profile-image-input"
                fileHandleFnc={profileImageHandle}
                text={"Banner Image Upload"}
            />
            <Button text={"Upload Profile Photo"} onClick={handleSubmit}
                width={"15%"} />
        </div>
    )
}

export default ProfilePic
