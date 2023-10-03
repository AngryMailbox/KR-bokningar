// encoding.js
import iconv from 'iconv-lite';
import { Buffer } from "@craftzdog/react-native-buffer";

const convertISO88591toUTF8 = (iso88591Bytes) => (
    iconv.decode(Buffer.from(iso88591Bytes), 'iso-8859-1')
);

export default convertISO88591toUTF8;
