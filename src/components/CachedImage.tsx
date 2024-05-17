import { getUrl } from 'aws-amplify/storage';
import React, { useState, useEffect } from 'react';

const urlCache = {};

const CachedImage = ({ imgKey, className, style={} }) => {
    const [imageUrl, setImageUrl] = useState(urlCache[imgKey] || null);

    useEffect(() => {
        const fetchImageUrl = async () => {
            if (!urlCache[imgKey]) {
                try {
                    const url = await getUrl({
                        key: imgKey,
                        options: {
                            accessLevel: 'guest',
                            expiresIn: 60*60*24
                        }
                    })
                    urlCache[imgKey] = url.url.href;
                    setImageUrl(url.url.href);
                } catch (error) {
                    console.error('Error fetching image URL:', error);
                }
            } else {
                setImageUrl(urlCache[imgKey]);
            }
        };

        fetchImageUrl();
    }, [imgKey]);

    return imageUrl ? <img src={imageUrl} className={className} style={style} alt="" draggable='false' /> : '';
};

export default CachedImage;
