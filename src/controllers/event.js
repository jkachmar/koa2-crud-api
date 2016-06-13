import {
  fetchAllEvents,
  fetchSensorEvents,
} from '../models/event';
import { fetchOneSensor } from '../models/sensor';

// Gets all sensor events from database, responds with a JSON body
export const getAllEvents = async (ctx) => {
  const events = await fetchAllEvents();
  ctx.body = events.toJSON();
};

// Gets events for a specific sensor, responds with a JSON body or 400 code
export const getSensorEvents = async (ctx) => {
  const sensorUuid = ctx.params.uuid;
  const sensor = await fetchOneSensor(sensorUuid);
  ctx.assert(sensor, 400, `Sensor ${sensorUuid} not found.`);

  const events = await fetchSensorEvents(sensorUuid);
  ctx.body = events.toJSON();
};
