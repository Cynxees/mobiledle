import { MobileLegendsCharacter } from '../types/MobileLegendsCharacter';

const useFetchMobileLegendsCharacters = (inputName: String) => {
  

    var characterResults : Array<MobileLegendsCharacter> = new Array<MobileLegendsCharacter>();



    var tempCharacter : MobileLegendsCharacter = new MobileLegendsCharacter("konauoeoatol")
    var tempCharacter2 : MobileLegendsCharacter = new MobileLegendsCharacter("kontoluaoeua")

    characterResults.push(tempCharacter)
    characterResults.push(tempCharacter2)
    characterResults.push(tempCharacter)
    characterResults.push(tempCharacter2)




    return characterResults;
    

};

export default useFetchMobileLegendsCharacters;
