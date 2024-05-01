import { MobileLegendsCharacter } from "../../API";

// return duplicate heroes array index
const getRandomHeroes = (characters: MobileLegendsCharacter[]) => {
  const randomHeroes: MobileLegendsCharacter[] = [];
  const totalHeroes = characters.length;

  while (randomHeroes.length < 12) {
    const randomIndex = Math.floor(Math.random() * totalHeroes);

    const randomHero = characters[randomIndex];

    if (!randomHeroes.includes(randomHero)) {
      randomHeroes.push(randomHero);
      randomHeroes.push(randomHero);
    }
  }

  return randomHeroes;
};

// card array init and shuffling
export const initCardArray = (characters: MobileLegendsCharacter[]) => {
  const array = getRandomHeroes(characters);

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    index == 1 ? cropFaceImage(element.imageUrl[0]):"";
  }

  return array.sort(() => Math.random() - 0.5);
};

// crop character image
const cropFaceImage = (imageUrl) => {
  const img = new Image();
  img.src = imageUrl;
  img.crossOrigin = "anonymous";

  var croppedImageUrl = "";

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 128;
    canvas.height = 128;

    const x = Math.floor(Math.random() * (img.width - 8)); // Adjust as needed for cropping size
    const y = Math.floor(Math.random() * (img.height - 8)); // Adjust as needed for cropping size

    ctx.drawImage(img, x, y, 8, 8, 0, 0, 8, 8);

    croppedImageUrl = canvas.toDataURL(); // Get the cropped image as a data URL

    // Use croppedImageUrl as needed, such as displaying it or saving it
    console.log(croppedImageUrl);
  };

  return croppedImageUrl;
};
