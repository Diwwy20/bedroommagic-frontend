import React, { createContext, useState, useContext } from 'react';

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photoData, setPhotoData] = useState({ imageSource: '', base64: '' });

  const clearPhotoData = () => {
    setPhotoData({ imageSource: '', base64: '' });
  };

  return (
    <PhotoContext.Provider value={{ photoData, setPhotoData, clearPhotoData }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => useContext(PhotoContext);