// utils/eventBus.ts

/**
 * Application-wide event bus utilities.
 * 
 * Provides mechanisms to emit and listen for strongly-typed custom events
 * across the application.
 */

/**
 * Enum representing the types of application events.
 * @enum {string}
 */
export const AppEvents = {
  PROJECTS_UPDATED: "projectsUpdated",
  PROJECT_DELETED: "projectDeleted",
  PROJECT_SELECTED: "projectSelected",
  USER_UPDATED: "userUpdated",
  SIDEBAR_TOGGLE: "sidebarToggle",
  // Extend with more events as needed
} as const;

export type AppEvents = (typeof AppEvents)[keyof typeof AppEvents];

/**
 * Mapping of event names to their corresponding payload types.
 * @interface
 */
export interface EventPayloads {
  [AppEvents.PROJECTS_UPDATED]: void;
  [AppEvents.PROJECT_DELETED]: { projectId: number };
  [AppEvents.PROJECT_SELECTED]: { projectId: number };
  [AppEvents.USER_UPDATED]: { userId: string };
  [AppEvents.SIDEBAR_TOGGLE]: { isOpen: boolean };
}

/**
 * Emits a custom event via the window object.
 *
 * @template K
 * @param {K} eventName - The event type to emit.
 * @param {EventPayloads[K]} [payload] - The data payload for the event.
 * @returns {void}
 */
export const emit = <K extends AppEvents>(
  eventName: K,
  payload?: EventPayloads[K]
): void => {
  const event = new CustomEvent(eventName, { detail: payload });
  window.dispatchEvent(event);
  console.log(`Event emitted: ${eventName}`, payload);
};

/**
 * Adds a listener for a specific custom event.
 *
 * @template K
 * @param {K} eventName - The event type to listen for.
 * @param {(payload: EventPayloads[K]) => void} handler - The function to handle the event.
 * @returns {() => void} Cleanup function to remove the event listener.
 */
export const on = <K extends AppEvents>(
  eventName: K,
  handler: (payload: EventPayloads[K]) => void
): (() => void) => {
  const listener = (event: Event) => {
    const customEvent = event as CustomEvent<EventPayloads[K]>;
    handler(customEvent.detail);
  };

  window.addEventListener(eventName, listener);

  // Returns a cleanup function to remove this listener.
  return () => {
    window.removeEventListener(eventName, listener);
  };
};

/**
 * Adds a one-time listener for a specific custom event.
 *
 * @template K
 * @param {K} eventName - The event type to listen for.
 * @param {(payload: EventPayloads[K]) => void} handler - The function to handle the event.
 * @returns {void}
 */
export const once = <K extends AppEvents>(
  eventName: K,
  handler: (payload: EventPayloads[K]) => void
): void => {
  const listener = (event: Event) => {
    const customEvent = event as CustomEvent<EventPayloads[K]>;
    handler(customEvent.detail);
    window.removeEventListener(eventName, listener);
  };

  window.addEventListener(eventName, listener);
};

/**
 * Symbolically removes all listeners for a specific event.
 * 
 * Note: JavaScript does not provide a way to remove all listeners of a type.
 * Use the cleanup function returned by `on()` to remove individual listeners.
 *
 * @param {AppEvents} eventName - The event type to symbolically "remove listeners" for.
 * @returns {void}
 */
export const off = (eventName: AppEvents): void => {
  console.warn(
    `Removing listeners for ${eventName} - use cleanup function from on() instead`
  );
};

/**
 * Event bus utility object for application-wide event emission and listening.
 */
export const eventBus = {
  emit,
  on,
  once,
  off,
};
