// encoding.js

const convertISO88591toUTF8 = (iso88591Bytes) => {
    var iconv = require('iconv-lite');
    var Buffer = require("@craftzdog/react-native-buffer").Buffer;

    // Convert from an encoded string to JS string.
    str = iconv.decode(Buffer.from(iso88591Bytes), 'iso-8859-1');

    return str;
};

export default convertISO88591toUTF8;
