// node -e "console.log(require('crypto').randomBytes(64).toString('hex'))";

// const crypto = require('crypto');
import crypto from 'crypto';

// Generate a 64-byte secret key and convert it to hexadecimal
const secretKey = crypto.randomBytes(64).toString('hex');

console.log(secretKey);  // Output the secret key
