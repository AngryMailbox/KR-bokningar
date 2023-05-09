import React, { useState, useEffect } from 'react';
import { convertXmlToJson } from './Converter';
import KONF from './KONF.XML';
import styles from './styles/App.module.css';
import Bookings from './components/Bookings';
import utf8 from 'utf8';
import Iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import Ongoing from './components/Ongoing';

function App() {
  const [bookings, setBookings] = useState([]);
  const [value, setValue] = useState(new Date());
  let currentTime = value.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  const [isActive, setIsActive] = useState(true);


  useEffect(() => {
    const interval = setInterval(
      () => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const fetchXmlData = async () => {
      const response = await fetch(KONF, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/xml',
          'Charset': 'iso-8859-1'
        }
      });
      let xmlString = await response.text();

      let decoded = decodeWindows1252ToUTF8(xmlString);
      decoded = decoded.split("encoding=\"ISO-8859-1\"").join("encoding=\"UTF-8\"");
      xmlString = decoded;

      console.log(decoded);
      const json = convertXmlToJson(xmlString);
      const bookings = json?.X8162_Aktivitetsstudio_?.RADER?.RAD;
      setBookings(bookings);
    };
    fetchXmlData();
  }, []);


  return (
    <div className={styles.App}>
      <div className={styles.left}>
        <h1 className={styles.clock}>{currentTime}</h1>
        <h2>Kommande bokningar</h2>
        <Bookings bookings={bookings} />
      </div>
      <div className={styles.right}>
        <Ongoing bookings={bookings} active={isActive} />
      </div>
    </div>
  );
}

const iconv = require('iconv-lite');

function decodeWindows1252ToUTF8(str) {
  const utf8String = iconv.decode(Buffer.from(str, 'binary'), 'win1252');
  return utf8String;
}

export default App;