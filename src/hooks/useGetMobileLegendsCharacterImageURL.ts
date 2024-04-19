import { useState, useEffect } from 'react';
import { getUrl, list } from 'aws-amplify/storage';
import { MobileLegendsCharacter } from '../API';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplifyconfiguration.json';

Amplify.configure(amplifyconfig);


const useGetMobileLegendsCharacterImageURL = async (character: MobileLegendsCharacter) => {


    let getUrlResult = await getUrl({
        key: "heroes/icons/"+character.id,
        options: {
          accessLevel: 'guest'  
        },
    });

    let iconImage = getUrlResult.url.href.toString()

    getUrlResult = await getUrl({
      key: "heroes/cards/"+character.id,
      options: {
        accessLevel: 'guest'  
      },
    });

    let cardImage = getUrlResult.url.href.toString()

    return [iconImage, cardImage]

};

export default useGetMobileLegendsCharacterImageURL;