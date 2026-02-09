import { type AppEvents, type ListenerFunction } from './types';

export class Mediator {
  private static instance = new Mediator();
  private listeners = new Map<AppEvents, Array<ListenerFunction>>();

  private constructor() {}
  static getInstance(): Mediator {
    return this.instance;
  }

  subscribe(event: AppEvents, callback: ListenerFunction): void {
    if (!this.listeners.has(event)) {
      const listFunction: Array<ListenerFunction> = [callback];
      this.listeners.set(event, listFunction);
    }

    const listeners = this.listeners.get(event);
    listeners?.push(callback);
  }
  notify(event: AppEvents, parameter?: unknown): boolean {
    const listeners = this.listeners.get(event);
    if (listeners) {
      for (const listener of listeners) {
        listener(parameter);
      }
      return true;
    }
    return false;
  }
}
