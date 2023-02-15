import { IObserver } from './IObserver';
export interface IObservable {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(): void;
}
//# sourceMappingURL=IObservable.d.ts.map