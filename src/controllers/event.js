import { fetchAllEvents, fetchOneEvent } from '../models/event';

export const getAllEvents = (ctx) => {
  ctx.body = { events: fetchAllEvents() };
};

export const getSensorEvents = (ctx) => {
  ctx.body = { event: fetchOneEvent(ctx.params.id) };
};
