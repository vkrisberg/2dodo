import sjcl from 'sjcl';

/**
 * Calculate SHA-256 hash
 * @param data
 * @returns {bitArray}
 */
const sha256 = (data) => {
  return sjcl.hash.sha256.hash(data);
};

const hexSha256 = (data) => {
  return sjcl.codec.hex.fromBits(
    sha256(data)
  );
};

export default {
  sha256,
  hexSha256,
};
