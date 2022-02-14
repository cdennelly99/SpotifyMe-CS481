import React, { Component, useEffect, useState } from 'react';
import { Button, Paper, Grid, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import AuthorizeUser from '../../containers/AuthenticationContainer/authorizeUser';
import { spotifyGreen, spotifyGreenDark } from '../Button';
import ICard from '../ItemCard';
import { SpotifyApiContext } from 'react-spotify-api';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import Cookies from 'js-cookie';
import 'react-spotify-auth/dist/index.css'; // if using the included styles
import './styles.css';
export default function LandingPage() {
  const navigator = useNavigate();

  // Indicates when the page is fully loaded to avoid
  // spotify - text from being null
  const [loaded, setLoaded] = useState(0);

  const landingColor = '#1ed760';
  const landingColorDark = '#106b30';

	// Sets the shadow of the landing page
	const setShadow = () => {
		let text = document.getElementById("spotify-text");
		let colorValue = 0x106b30;
		let shadow = "";
		for (let i = 0; i < 500; i++) {
			colorValue += 0x004000;
			shadow +=
				(shadow ? "," : "") +
				i * 1 +
				"px " +
				i * 1 +
				`px 0 #${colorValue.toString(16)}`;
		}
		text.style.textShadow = shadow;
	};

  // Used for setting the shadow on the spotify logo
  useEffect(() => {
    if (document.readyState === 'complete' && loaded !== 2) {
      setShadow();
      setLoaded(2);
    } else if (loaded === 1) {
      setLoaded(0);
    } else if (loaded === 0) {
      setLoaded(1);
    }
  }, [loaded]);

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Background area (left) */}
      <Grid
        item
        sm={4}
        md={7}
        style={{
          backgroundColor: landingColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          id="spotify-text"
          variant="h3"
          style={{ color: '#fff', fontWeight: '900', fontSize: '95px' }}
        >
          SpotifyMe
        </Typography>
      </Grid>
      {/* Sign in area (right)*/}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: spotifyGreenDark,
          background: `linear-gradient(${spotifyGreenDark}, #000)`,
          boxShadow: '0px 0px 10px #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ICard
          nohome="true"
          style={{
            width: '75%',
          }}
          cstyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'speace-evenly',
            flexWrap: 'wrap',
            flexShrink: '8',
          }}
        >
          <Icon
            className="item"
            icon="mdi:spotify"
            color={spotifyGreen}
            width="50px"
            height="50px"
          />
          <Typography className="item" variant="h4">
            Sign in through Spotify®
          </Typography>
          <AuthorizeUser className="item" />
        </ICard>
      </Grid>
    </Grid>
  );
}