import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../common/Input';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FileInput from "../common/Input/FileInput"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, auth, db } from "../../firebase"
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);

    if (title && desc && displayImage && bannerImage) {
      // upload files -> get downloadable links
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);

        const bannerImageUrl = await getDownloadURL(bannerImageRef);
        // console.log("banner Image url", bannerImageUrl)

        // for display image
        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);

        const displayImageUrl = await getDownloadURL(displayImageRef);
        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        toast.success("Podcast Created!!")
        setLoading(false);

      } catch (e) {
        toast.error(e.message)
        setLoading(false);
      }


      //  console.log(uploaded);
      toast.success("File Uploaded")

    } else {
      toast.error("Please enter all values")
      setLoading(false);
    }
  }


  const bannerImageHandle = (file) => {
    setBannerImage(file)
  }

  const displayeImageHandle = (file) => {
    setDisplayImage(file)
  }

  return (
    <>
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
      />

      <FileInput
        accept={"image/*"}
        id="display-image-input"
        fileHandleFnc={displayeImageHandle}
        text={"Display Image Upload"}
      />

      <FileInput
        accept={"image/*"}
        id="banner-image-input"
        fileHandleFnc={bannerImageHandle}
        text={"Banner Image Upload"}
      />

      <Button text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />

    </>
  )
}

export default CreatePodcastForm
