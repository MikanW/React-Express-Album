import React, { createContext, useState, useContext } from 'react';

const PhotoListContext = createContext();

export const usePhotoList = () => useContext(PhotoListContext);

export const PhotoListProvider = ({ children }) => {
    const [photos, setPhotos] = useState([]);

    const addPhoto = (files) => {
        let newPhotos = [];
        let currentId = 0;
        for (let file of files) {
            const newPhoto = {
                id: photos.length + currentId,
                file: file,
                url: URL.createObjectURL(file),
                tag: "",
                location: "",
            };
            newPhotos.push(newPhoto);
            currentId += 1;
        }
        setPhotos([...photos, ...newPhotos]);
    };

    const removePhoto = (photoId) => {
        setPhotos(photos.filter(image => image.id !== photoId));
    };

    const removeAllPhotos = () => {
        setPhotos([]);
    };


    const updatePhotoProps = (photoId, updates) => {
        const newPhotos = photos.map(photo => {
            if (photo.id === photoId) {
                console.log({ ...photo, ...updates })
                return { ...photo, ...updates }
            } else {
                return photo;
            }
        })
        setPhotos(newPhotos);
    }

    return (
        <PhotoListContext.Provider value={{ photos, addPhoto, removePhoto, removeAllPhotos, updatePhotoProps }}>
            {children}
        </PhotoListContext.Provider>
    );
};
