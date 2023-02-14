import { PlatformAccessory, CharacteristicValue } from 'homebridge';
import { VDPHomebridgePlatform } from './platform';
import { VDPAreaAccessory } from './platformAccessoryArea';
export declare const DEVICE_MODEL = "Room Accessory Switch";
export declare class VDPRoomAccessory {
    private readonly platform;
    private readonly accessory;
    name: string;
    private uuid;
    areaAccessories: VDPAreaAccessory[];
    private manufacturer;
    private model;
    private serialNumber;
    private service;
    accessoryState: {
        On: boolean;
    };
    constructor(platform: VDPHomebridgePlatform, accessory: PlatformAccessory);
    addArea(area: VDPAreaAccessory): void;
    setOn(value: CharacteristicValue): Promise<void>;
    turnOn(): Promise<void>;
    turnOff(): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
}
//# sourceMappingURL=platformAccessoryRoom.d.ts.map