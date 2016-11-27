import { Action } from 'redux';

export const NOOP_INIT = 'NOOP_INIT';
export const NOOP_SUCCESS = 'NOOP_SUCCESS';
export function noop() {
  return {
    type: NOOP_INIT,
  };
}

export const NOTIFY_INIT = 'NOTIFY_INIT';
export function notifyInit(container) {
  return {
    container,
    type: NOTIFY_INIT,
  };
}