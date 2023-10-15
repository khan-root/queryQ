import { colors } from "./data";


export function titleNameAlpha (title){
    const firstLetter = title.charAt(0).toUpperCase();
    const colorObj = colors.find(obj => obj[firstLetter]);

  if (colorObj) {
    const { bg: bgColor } = colorObj[firstLetter];
    return {
      firstLetter,
      bgColor,
    };
  }

  return {
    firstLetter,
    bgColor: '#000', // Replace with your default color
  };
}