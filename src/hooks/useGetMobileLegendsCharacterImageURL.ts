import { useState, useEffect } from 'react';
import { getUrl, list } from 'aws-amplify/storage';
import { MobileLegendsCharacter } from '../API';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplifyconfiguration.json';

Amplify.configure(amplifyconfig);


const useGetMobileLegendsCharacterImageURL = async (character: MobileLegendsCharacter) => {

    const getUrlResult = await getUrl({
        key: "heroes/icons/"+character.id,
        options: {
          accessLevel: 'guest' , 
          validateObjectExistence: false, 
          expiresIn: 20 
        },
    });

    return getUrlResult.url.href.toString()

};

export default useGetMobileLegendsCharacterImageURL;
