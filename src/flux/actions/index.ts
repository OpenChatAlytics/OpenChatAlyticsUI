
export const NOOP = 'NOOP';
export function noop() {
  return {
    type: NOOP
  };
}