// Capitalizes the first letter of each word
export const properCase = (words) => {
  let properWord = "";
  properWord += words[0].toUpperCase();
  for (let i = 1; i < words.length; i++) {
    if (words[i - 1] === " " || words[i - 1] === "-") {
      properWord += words[i].toUpperCase();
    } else {
      properWord += words[i];
    }
  }
  return properWord;
};
