import EventEmitter from "node:events";

export const ee = new EventEmitter();

export const Events = {
  NEW_APPLICATION: "new-application",
};
