"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPAreaAccessory = void 0;
class VDPAreaAccessory {
    constructor(platform, accessory, room) {
        this.platform = platform;
        this.accessory = accessory;
        this.room = room;
        this.manufacturer = 'Virtual device Platform';
        this.model = 'Room Accessory';
        this.accessoryState = {
            On: false,
        };
        this.name = accessory.displayName;
        this.uuid = accessory.UUID;
        this.serialNumber = accessory.UUID;
        this.accessory.getService(this.platform.Service.AccessoryInformation)
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
            .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
            .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');
        this.service = this.accessory.getService(this.platform.Service.Switch) || this.accessory.addService(this.platform.Service.Switch);
        this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);
        this.service.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this)) // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this)); // GET - bind to the `getOn` method below
    }
    async setOn(value) {
        //Accessory Set Value
        const setOn = value;
        // implement your own code to turn your device on/off
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
exports.VDPAreaAccessory = VDPAreaAccessory;
//# sourceMappingURL=platformAccessoryArea.js.map