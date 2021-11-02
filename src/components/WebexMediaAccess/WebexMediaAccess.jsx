import React, {JSX, useContext} from 'react';
import PropTypes from 'prop-types';
import Icon from '../generic/Icon/Icon';
import {Button} from '../generic';
import webexComponentClasses from '../helpers';
import {useMeeting} from '../hooks';
import {AdapterContext} from '../hooks/contexts';

const SCREENS = {
  camera: {
    icon: 'camera-bold',
    title: 'Allow access to camera',
    message: 'when your browser asks to let Webex use your camera for this video call',
    buttonLabel: 'Proceed without camera',
    buttonAction: 'ignoreVideoAccessPrompt',
  },
  microphone: {
    icon: 'microphone-bold',
    title: 'Allow access to microphone',
    message: 'when your browser asks to let Webex use your microphone for this video call',
    buttonLabel: 'Proceed without audio',
    buttonAction: 'ignoreAudioAccessPrompt',
  },
};

/**
 * Webex Media Access component displays a prompt explaining necessary access to media.
 *
 * @param {object} props Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {JSX.Element} [props.logo]  Logo
 * @param {string} props.media State of media controls
 * @param {string} props.meetingID  ID of the meeting
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 *
 */
export default function WebexMediaAccess({
  className,
  logo,
  media,
  meetingID,
  style,
}) {
  const screen = SCREENS[media];
  const [cssClasses, sc] = webexComponentClasses('media-access', className);
  const adapter = useContext(AdapterContext);
  const {ID} = useMeeting(meetingID);

  return (
    <div className={cssClasses} style={style}>
      {logo && <div className={sc('logo-container')}>{logo}</div>}
      <Icon name={screen.icon} size={48} />
      <h2 className={sc('title')}>{screen.title}</h2>
      <p className={sc('body')}>
        Select
        {' '}
        <span className={sc('allow')}>Allow</span>
        {' '}
        {screen.message}
      </p>
      <Button
        type="default"
        size={40}
        onClick={() => adapter.meetingsAdapter[screen.buttonAction](ID)}
      >
        {screen.buttonLabel}
      </Button>
    </div>
  );
}

WebexMediaAccess.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.node,
  media: PropTypes.oneOf(['camera', 'microphone']),
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexMediaAccess.defaultProps = {
  className: '',
  logo: undefined,
  media: 'camera',
  style: undefined,
};
