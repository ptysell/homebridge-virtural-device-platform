import { PlatformAccessory, CharacteristicValue } from 'homebridge';
import { VDPHomebridgePlatform } from './platform';
import { VDPRoomAccessory } from './platformAccessoryRoom';
export declare class VDPAreaAccessory {
    private readonly platform;
    private readonly accessory;
    private readonly room;
    readonly name: string | unknown;
    private uuid;
    private manufacturer;
    private model;
    private serialNumber;
    private service;
    accessoryState: {
        On: boolean;
    };
    constructor(platform: VDPHomebridgePlatform, accessory: PlatformAccessory, room: VDPRoomAccessory);
    setOn(value: CharacteristicValue): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
}
//# sourceMappingURL=platformAccessoryArea.d.ts.map