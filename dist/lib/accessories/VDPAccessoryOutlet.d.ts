import { CharacteristicValue } from 'homebridge';
import { IVDPAccessoryCharacteristics, IVDPAccessoryState, VDPAccessory } from '../accessory/VDPAccessory';
import { IObservable } from '../observer/IObservable';
import { IObserver } from '../observer/IObserver';
export interface IVDPAccessoryCharacteristicsOutlet extends IVDPAccessoryCharacteristics {
    On: boolean;
    Name?: string;
}
export interface IVDPAccessoryStateOutlet extends IVDPAccessoryState {
    On: boolean;
}
export declare class VDPAccessoryOutlet extends VDPAccessory {
    protected observers: IObserver[];
    protected DEVICE_MODEL: string;
    protected _accessoryCharacteristics: IVDPAccessoryCharacteristicsOutlet;
    protected _accessoryState: IVDPAccessoryStateOutlet;
    protected setServices(): void;
    protected setCharacteristics(): void;
    getOn(): Promise<CharacteristicValue>;
    setOn(value: CharacteristicValue): Promise<void>;
    update(observable: IObservable): void;
}
//# sourceMappingURL=VDPAccessoryOutlet.d.ts.map