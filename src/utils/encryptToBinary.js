// convert a Unicode string to a string in which
// each 16-bit unit occupies only one byte
export const toBinary = (string) => {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  const charCodes = new Uint8Array(codeUnits.buffer);
  let result = "";
  for (let i = 0; i < charCodes.byteLength; i++) {
    result += String.fromCharCode(charCodes[i]);
  }
  // console.log(window.btoa(result));
  return window.btoa(result);
};
