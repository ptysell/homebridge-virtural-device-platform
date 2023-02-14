"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPPlatformAccessory = exports.accessoryType = void 0;
var accessoryType;
(function (accessoryType) {
    accessoryType["Room"] = "room";
    accessoryType["Area"] = "area";
    accessoryType["Accessory"] = "accessory";
})(accessoryType = exports.accessoryType || (exports.accessoryType = {}));
/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
class VDPPlatformAccessory {
    constructor(platform, accessory, accessoryType, roomUUID, areaUUID, accessoryUUID) {
        this.platform = platform;
        this.accessory = accessory;
        this.accessoryType = accessoryType;
        /**
       * These are just used to create a working example
       * You should implement your own code to track the state of your accessory
       */
        this.accessoryState = {
            On: false,
        };
        this.name = accessory.displayName;
        this.roomUUID = roomUUID;
        this.areaUUID = areaUUID;
        this.accessoryUUID = accessoryUUID;
        this.type = accessoryType;
        this.accessory.getService(this.platform.Service.AccessoryInformation)
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
            .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
            .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');
        this.service = this.accessory.getService(this.platform.Service.Switch) || this.accessory.addService(this.platform.Service.Switch);
        this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);
        this.service.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this)) // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this)); // GET - bind to the `getOn` method below
    }
    async setOn(value) {
        //Accessory Set Value
        //const setOn = value as boolean;
        this.accessoryState.On = value;
        this.platform.log.debug('Set Characteristic On ->', value);
    }
    async getOn() {
        // implement your own code to check if the device is on
        const isOn = this.accessoryState.On;
        this.platform.log.debug('Get Characteristic On ->', isOn);
        // if you need to return an error to show the device as "Not Responding" in the Home app:
        // throw new this.platform.api.hap.HapStatusError(this.platform.api.hap.HAPStatus.SERVICE_COMMUNICATION_FAILURE);
        return isOn;
    }
}
exports.VDPPlatformAccessory = VDPPlatformAccessory;
//# sourceMappingURL=platformAccessory.js.map