import {
  fetchAllEvents,
  fetchSensorEvents,
} from '../models/event';
import { fetchOneSensor } from '../models/sensor';

export const getAllEvents = async (ctx) => {
  const events = await fetchAllEvents();
  ctx.body = events.toJSON();
};

export const getSensorEvents = async (ctx) => {
  const sensorUuid = ctx.params.uuid;
  const sensor = await fetchOneSensor(sensorUuid);
  ctx.assert(sensor, 400, `Sensor ${sensorUuid} not found.`);

  const events = await fetchSensorEvents(sensorUuid);
  ctx.body = events.toJSON();
};
