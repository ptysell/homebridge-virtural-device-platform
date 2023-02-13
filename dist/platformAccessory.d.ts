import { PlatformAccessory, CharacteristicValue } from 'homebridge';
import { VDPHomebridgePlatform } from './platform';
export declare enum accessoryType {
    Room = "room",
    Area = "area",
    Accessory = "accessory"
}
/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export declare class VDPPlatformAccessory {
    private readonly platform;
    private readonly accessory;
    private readonly accessoryType;
    private roomUUID;
    private areaUUID;
    private accessoryUUID;
    type: accessoryType;
    private service;
    /**
   * These are just used to create a working example
   * You should implement your own code to track the state of your accessory
   */
    accessoryStates: {
        On: boolean;
    };
    constructor(platform: VDPHomebridgePlatform, accessory: PlatformAccessory, accessoryType: accessoryType, roomUUID?: string, areaUUID?: string, accessoryUUID?: string);
    setOn(value: CharacteristicValue): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
}
//# sourceMappingURL=platformAccessory.d.ts.map