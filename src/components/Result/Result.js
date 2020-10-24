import React, { useState } from 'react';

import classes from './Result.module.css';
import OnImagesLoaded from 'react-on-images-loaded';

const Result = (props) => {
  const [showImages, setShowImages] = useState(false);
  let backgroundImage;

  if (
    props.description === 'broken clouds' ||
    props.description === 'overcast clouds' ||
    props.description === 'haze'
  ) {
    backgroundImage = {
      backgroundImage: 'linear-gradient(to top,white,var(--divider-color)',
    };
  }

  return (
    <OnImagesLoaded
      onLoaded={() => setShowImages(true)}
      onTimeout={() => setShowImages(true)}
      timeout={7000}
    >
      <div style={{ opacity: showImages ? 1 : 0 }}>
        <div
          className={classes.Result}
          style={backgroundImage}
          key={props.index}
        >
          <div className={classes.Heading}>
            <img src={props.flag} alt="flag" />
            <div className={classes.Location}>
              <div className={classes.City}>
                {props.location}, {props.country}
              </div>
              <div className={classes.Temperature}>{props.temperature}</div>
            </div>
            <img src={props.icon} alt="icon" />
          </div>
          <div className={classes.Description}>{props.description}</div>
          <div className={classes.Details}>
            <div>
              <div className={classes.Detail}>Visibility</div>
              <div className={classes.Numbers}>{props.visibility}</div>
            </div>
            <div>
              <div className={classes.Detail}>Wind</div>
              <div className={classes.Numbers}>{props.wind}</div>
            </div>

            <div>
              <div className={classes.Detail}> Sunrise </div>
              <div className={classes.Numbers}>{props.sunRise}</div>
            </div>

            <div>
              <div className={classes.Detail}>Humidity </div>
              <div className={classes.Numbers}>{props.humidity}</div>
            </div>

            <div>
              <div className={classes.Detail}>Cloudiness </div>
              <div className={classes.Numbers}>{props.cloudiness}</div>
            </div>

            <div>
              <div className={classes.Detail}>Sunset </div>
              <div className={classes.Numbers}>{props.sunSet}</div>
            </div>
          </div>
        </div>
      </div>
    </OnImagesLoaded>
  );
};

export default Result;
