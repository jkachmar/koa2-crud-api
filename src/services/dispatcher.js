import mailDispatcher from './mailer';

// Helper function that checks whether the sensor has changed state
const dispatcher = (val, sensor, flag) => {
  let newState = sensor[flag];
  if (val === 1) {
    newState = 'good';
  } else if (sensor[flag] !== 'low') {
    newState = 'low';
    mailDispatcher[flag](sensor.location);
  }
  return newState;
};

export default dispatcher;
