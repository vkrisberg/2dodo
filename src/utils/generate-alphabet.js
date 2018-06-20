export default function (start, end) {
  let alphabet = [];
  let startLetter = start.charCodeAt(0);
  const endLetter = end.charCodeAt(0);

  for (; startLetter <= endLetter; ++startLetter) {
    alphabet.push(String.fromCharCode(startLetter).toUpperCase());
  }

  return alphabet;
}
