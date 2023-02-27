import { CharacteristicValue, PlatformAccessory, Service } from 'homebridge';
import { VDPHomebridgePlatform } from '../../platform';
import { IVDPAccessoryCharacteristics, VDPAccessory } from '../vdphomekit/accessories/accessory/VDPAccessory';
import { VDPObservable } from '../vdphomekit/system/observable';
export declare const DEVICE_MODEL: string;
export interface VDPAccessoryCharacteristicsSwitch extends IVDPAccessoryCharacteristics {
    On: boolean;
    getOn(): CharacteristicValue;
    setOn(value: CharacteristicValue): void;
    name: string;
}
export declare class VDPAccessoryCloset extends VDPAccessory implements VDPAccessoryCharacteristicsSwitch {
    protected readonly platform: VDPHomebridgePlatform;
    protected readonly accessory: PlatformAccessory;
    protected _hbPlatformAccessoryService: Service;
    On: boolean;
    constructor(platform: VDPHomebridgePlatform, accessory: PlatformAccessory);
    getOn(): CharacteristicValue;
    setOn(value: CharacteristicValue): void;
    update(observable: VDPObservable, key?: string, message?: string): void;
}
//# sourceMappingURL=VDPAccessoryCloset.d.ts.map