import { CharacteristicValue } from 'homebridge';
import { IVDPAccessoryCharacteristics, IVDPAccessoryState, VDPAccessory } from '../accessory/VDPAccessory';
import { VDPObservable } from '../vdphomekit/system/observable';
import { VDPObserver } from '../vdphomekit/system/observer';
export interface IVDPAccessoryCharacteristicsOutlet extends IVDPAccessoryCharacteristics {
    On: boolean;
    Name?: string;
}
export interface IVDPAccessoryStateOutlet extends IVDPAccessoryState {
    On: boolean;
}
export declare class VDPAccessoryOutlet extends VDPAccessory {
    protected DEVICE_MODEL: string;
    protected observers: VDPObserver[];
    protected _accessoryCharacteristics: IVDPAccessoryCharacteristicsOutlet;
    protected _accessoryState: IVDPAccessoryStateOutlet;
    protected initialize(): void;
    protected setAccessoryInformation(): void;
    protected setServices(): void;
    protected setCharacteristics(): void;
    getOn(): Promise<CharacteristicValue>;
    setOn(value: CharacteristicValue): Promise<void>;
    update(observable: VDPObservable): void;
}
//# sourceMappingURL=VDPAccessoryOutlet.d.ts.map