import { CharacteristicValue, PlatformAccessory, Service } from 'homebridge';
import { VDPHomebridgePlatform } from '../../platform';
import { IVDPAccessoryCharacteristics, VDPAccessory } from '../vdphomekit/accessories/accessory/VDPAccessory';
import { VDPObservable } from '../vdphomekit/system/observable';
export declare const DEVICE_MODEL: string;
export interface VDPAccessoryCharacteristicsOutlet extends IVDPAccessoryCharacteristics {
    On: boolean;
    getOn(): Promise<CharacteristicValue>;
    setOn(value: CharacteristicValue): void;
    Name?: string;
}
export declare class VDPAccessoryOutlet extends VDPAccessory implements VDPAccessoryCharacteristicsOutlet {
    protected readonly platform: VDPHomebridgePlatform;
    protected readonly accessory: PlatformAccessory;
    protected _hbPlatformAccessoryService: Service;
    On: boolean;
    constructor(platform: VDPHomebridgePlatform, accessory: PlatformAccessory);
    getOn(): Promise<CharacteristicValue>;
    setOn(value: CharacteristicValue): Promise<void>;
    update(observable: VDPObservable, key?: string, message?: string): void;
}
//# sourceMappingURL=VDPAccessoryOutlet.d.ts.map