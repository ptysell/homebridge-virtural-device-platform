import { PlatformAccessory, CharacteristicValue } from 'homebridge';
import { VDPHomebridgePlatform } from './platform';
import { VDPPlatformAccessory } from './platformAccessory';
import { VDPRoomAccessory } from './platformAccessoryRoom';
export declare const DEVICE_MODEL = "Area Accessory Switch";
export declare class VDPAreaAccessory {
    private readonly platform;
    private readonly accessory;
    private readonly room;
    name: string;
    private uuid;
    platformAccessories: VDPPlatformAccessory[];
    private manufacturer;
    private model;
    private serialNumber;
    private service;
    accessoryState: {
        On: boolean;
    };
    constructor(platform: VDPHomebridgePlatform, accessory: PlatformAccessory, room: VDPRoomAccessory);
    addAccessory(accessory: VDPPlatformAccessory): void;
    setOn(value: CharacteristicValue): Promise<void>;
    turnOn(): Promise<void>;
    turnOff(): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
}
//# sourceMappingURL=platformAccessoryArea.d.ts.map