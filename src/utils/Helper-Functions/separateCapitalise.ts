/**
 * Turn text such as "not-recommended" into "Not Recommended"
 */
export default function separateCapitalise(inputStr: string): string {
  const words = inputStr.split(/[ -]/); //"/[ -]/"regex that allows for two separators
  const outputWords = [];
  for (const word of words) {
    const wordArr = word.split("");
    wordArr[0] = wordArr[0].toUpperCase();
    outputWords.push(wordArr.join(""));
  }
  const outputStr = outputWords.join(" ");
  return outputStr;
}
