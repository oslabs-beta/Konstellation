import React, { useEffect, useState } from 'react';
import '../styles/home.scss';

export enum LoadingScreenType {
  percentage,
  cyclingStops,
}

type LoadingScreenProps = {
  type: LoadingScreenType;
};

/**
 * Reusable component which renders a loading screen
 * @param type determines the type of loading screen which will render
 * @remarks Percentage calculation is mocked and for demonstration purposes only
 */
const loadingScreen = ({
  type = LoadingScreenType.cyclingStops,
}: LoadingScreenProps) => {
  if (type === LoadingScreenType.percentage) {
    const [progressPercent, setProgressPercent] = useState(0);

    useEffect(() => {
      console.log(progressPercent);
      const updateProgress = () =>
        setProgressPercent(
          Math.min(
            100,
            progressPercent + Math.max(0, Math.floor(Math.random() * 24))
          )
        );
      if (progressPercent < 96) {
        setTimeout(updateProgress, 100);
      }
    }, [progressPercent]);
    return (
      <>
        <div id="loading-screen">
          <div className="spinner-container" id="message-screen">
            <div className="loading-spinner" />
            <div id="message-screen">{progressPercent}%</div>
          </div>
        </div>
      </>
    );
  } else {
    const [currentProgress, setCurrentProgress] = useState('Loading');

    const updateProgress = () =>
      setCurrentProgress(
        currentProgress.indexOf('...') === -1
          ? currentProgress + '.'
          : currentProgress.replace('...', '')
      );
    setTimeout(updateProgress, 150);

    return (
      <>
        <div id="loading-screen">
          <div className="spinner-container" id="message-screen">
            <div className="loading-spinner" />
            <div id="message-screen">{currentProgress}</div>
          </div>
        </div>
      </>
    );
  }
};

export default loadingScreen;
