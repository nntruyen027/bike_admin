import React, { useState, } from 'react';
import { SaveButton, } from '~/components';
import PropTypes from 'prop-types';
import './index.css';

function UpdateAvatar({ avatar, updateAvatar, setShow, }) {
  const [avatarSrc, setAvatarSrc,] = useState(
    `${process.env.REACT_APP_HOST_IMAGE_IP}${avatar}`
  );
  const defaultAvatarSrc = `${process.env.PUBLIC_URL}/assets/images/default_avatar.jpg`;
  const [file, setFile,] = useState(null);
  const handleImageClick = () => {
    setAvatarSrc(defaultAvatarSrc);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
      reader.onerror = () => {
        setAvatarSrc(defaultAvatarSrc);
      };
      setFile(file);
    }
  };

  return (
    <div id={'update-avatar-component'}>
      <div>
        <img
          src={avatarSrc}
          onError={(e) => (e.target.src = defaultAvatarSrc)}
          onClick={handleImageClick}
          alt='Avatar'
        />
      </div>
      <input type='file' accept='image/*' onChange={handleFileChange} />
      <div>
        <SaveButton
          onClick={() => {
            updateAvatar({
              avatar: file,
            });
            setShow();
          }}
        />
      </div>
    </div>
  );
}

UpdateAvatar.propTypes = {
  avatar: PropTypes.string,
  updateAvatar: PropTypes.func,
  setShow: PropTypes.func,
};

export default UpdateAvatar;
