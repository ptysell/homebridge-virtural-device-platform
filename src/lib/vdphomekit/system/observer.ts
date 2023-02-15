import { VDPObservable } from "./observable";

export interface VDPObserver {

    update(observable: VDPObservable): void;

}

export type ObserverCallback = (newValue: any) => void;

export class Observer {
  constructor(private _subject: string, private _callback?: ObserverCallback) {
  }

  get subject() {
    return this._subject;
  }

  private _newValue: any;

  get newValue() {
    return this._newValue;
  }

  set newValue(newValue: any) {
    this._newValue = newValue;

    this.notify();
  }

  notify = () => {
    console.log('👁 Observer called for:', this._subject, ', new value:', this._newValue);

    if (this._callback) {
      this._callback(this._newValue);
    }
  };
}

export class Observers {
  private _observers: Array<Observer> = [];

  subscribe = (observer: Observer) => {
    if (!this._observers.includes(observer)) {
      this._observers.push(observer);
    }
  };

  unsubscribe = (observer: Observer) => {
    this._observers.filter((value) => {
      if (value === observer) {
        return false;
      }

      return true;
    });
  };

  notify = (subject: string, newValue: any) => {
    this._observers.map(observer => {
      if (observer.subject == subject) {
        observer.newValue = newValue;
      }
    });
  };
}
