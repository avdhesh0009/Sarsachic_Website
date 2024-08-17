import React, { useState, useEffect, useContext } from 'react';
import AvatarEditor from 'react-avatar-edit';
import useAxiosPublic from '../hooks/useAxios';
import { WebContext } from '../providers/WebProvider';
import editiconImg from '../images/editicon.jpg';

const ProfileImageUpload = () => {
  const [preview, setPreview] = useState(null);
  const [src, setSrc] = useState(null);
  const [isEditing, setIsEditing] = useState(true); // Add state to control editing
  const [originalSrc, setOriginalSrc] = useState(null); // Store the original image URL
  const axios = useAxiosPublic();
  const { setUser, user } = useContext(WebContext);

  useEffect(() => {
    // Fetch the user data including the profile image URL when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/image-url/${user.user._id}`);
        console.log(response.data.data);
        setSrc(response.data.data);
        setOriginalSrc(response.data.data); // Store the original image URL
        setIsEditing(false); // Disable editing if an image is already uploaded
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 5242880) {
      alert("File is greater than 5mb!");
      elem.target.value = "";
    }
  };

  const handleUpload = async () => {
    if (preview) {
      const response = await fetch(preview);
      const blob = await response.blob();
      const file = new File([blob], "profile.png", { type: "image/png" });
      const formData = new FormData();
      formData.append('profile-image', file);

      const result = await axios.post(`/users/upload-profile-image/${user.user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSrc(result.data.data.profileImage);
      setOriginalSrc(result.data.data.profileImage); // Update the original image URL after successful upload
      setIsEditing(false); // Disable editing after successful upload
    }
  };

  const editProfileImage = () => {
    setIsEditing(true);
    setPreview(null); // Clear the preview when editing starts again
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setSrc(originalSrc); // Revert to the original image URL
    setPreview(null); // Clear the preview
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h3>Profile Image</h3>
        {isEditing ? (
          <AvatarEditor
            width={250}
            height={250}
            onCrop={onCrop}
            onClose={onClose}
            onBeforeFileLoad={onBeforeFileLoad}
            src={src}
            label="Upload"
          />
        ) : (
          <img
            src={src}
            alt="Profile"
            style={{
              borderRadius: '50%',
              width: '150px',
              height: '150px',
              objectFit: 'cover',
            }}
          />
        )}
        {preview && isEditing && (
          <div style={{ marginTop: '20px' }}>
            <img
              src={preview}
              alt="Profile Preview"
              style={{
                borderRadius: '50%',
                width: '150px',
                height: '150px',
                objectFit: 'cover',
              }}
            />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        )}
      </div>
      {!isEditing && (
        <button onClick={editProfileImage}>
          Edit Image
        </button>
      )}
    </div>
  );
};

export default ProfileImageUpload;
