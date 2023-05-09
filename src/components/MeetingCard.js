import styles from '../styles/MeetingCard.module.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
const accessKey = '0BVAx-9QfLrmDyAtejVtxvcWvdLmcQVYJuNQ7kb5vCM';
const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;

//Get random Image from Unsplash
const RandomImage = () => {
    const [imageUrl, setImageUrl] = useState('');
    async function getRandomImage() {
        const response = await fetch(url);
        const data = await response.json();
        setImageUrl(data.urls.regular);
    }
    useEffect(() => {
        //getRandomImage();
    }, []);
    return imageUrl;
}

const MeetingCard = (props) => {
    return (
        <Card sx={{ maxWidth: 345 }} className={styles.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="20"
                    image={RandomImage() || "https://cdn.dribbble.com/users/5112438/screenshots/12089220/577b7346d402f367-photo_4x.jpg"}
                    alt="bild" />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.startTime} – {props.endTime}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MeetingCard;