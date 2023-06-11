import { parseString } from 'xml2js';

export function convertXmlToJson(xmlString) {
    let jsonObj = {};
    parseString(xmlString, { explicitCharkey: true, explicitArray: false, charset: "ISO-8859-1" }, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        jsonObj = result;
    });
    return jsonObj;
}