import { IObservable } from './IObservable';

export interface IObserver {

    update(observable: IObservable): void;

}