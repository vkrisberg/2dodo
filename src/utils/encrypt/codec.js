import sjcl from 'sjcl';

/**
 * Convert from bits to base64 string
 * @param bits
 * @returns {*|string}
 */
const base64Encode = (bits) => {
  return sjcl.codec.base64.fromBits(bits);
};

/**
 * Convert from base64 string to bits
 * @param plaintext
 * @returns {*|bitArray}
 */
const base64Decode = (plaintext) => {
  return sjcl.codec.base64.toBits(plaintext);
};

/**
 * Convert from json object to string
 * @param object
 * @returns {*|String}
 */
const jsonEncode = (object) => {
  return sjcl.json.encode(object);
};

/**
 * Convert from string to json object
 * @param plaintext
 * @returns {*|Object}
 */
const jsonDecode = (plaintext) => {
  return sjcl.json.decode(plaintext);
};

/**
 * Convert from bits to utf8 string
 * @param bits
 * @returns {*}
 */
const utf8Encode = (bits) => {
  return sjcl.codec.utf8String.fromBits(bits);
};

/**
 * Convert from utf8 string to bits
 * @param plaintext
 * @returns {*}
 */
const utf8Decode = (plaintext) => {
  return sjcl.codec.utf8String.toBits(plaintext);
};

/**
 * Convert from bits to hex string
 * @param bits
 * @returns {*}
 */
const hexEncode = (bits) => {
  return sjcl.codec.hex.fromBits(bits);
};

/**
 * Convert from hex string to bits
 * @param plaintext
 * @returns {*}
 */
const hexDecode = (plaintext) => {
  return sjcl.codec.hex.toBits(plaintext);
};

export default {
  base64Encode,
  base64Decode,
  jsonEncode,
  jsonDecode,
  utf8Encode,
  utf8Decode,
  hexEncode,
  hexDecode,
};
