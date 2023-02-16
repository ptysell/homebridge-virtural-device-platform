"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPAccessorySwitch = exports.DEVICE_MODEL = void 0;
const settings_1 = require("../../settings");
const VDPAccessory_1 = require("../vdphomekit/accessories/accessory/VDPAccessory");
exports.DEVICE_MODEL = 'VDP Outlet Accessory';
class VDPAccessorySwitch extends VDPAccessory_1.VDPAccessory {
    constructor(platform, accessory) {
        super(platform, accessory);
        this.platform = platform;
        this.accessory = accessory;
        this.accessoryInformation.Manufacturer = settings_1.DEVICE_MANUFACTURER;
        this.accessoryInformation.Model = exports.DEVICE_MODEL;
        this.accessoryInformation.SerialNumber = this.uniqueIdentifier;
        this.HBPlatformAccessory.getService(this.HBPlatform.Service.AccessoryInformation)
            .setCharacteristic(this.HBPlatform.Characteristic.Manufacturer, this.accessoryInformation.Manufacturer)
            .setCharacteristic(this.HBPlatform.Characteristic.Model, this.accessoryInformation.Model)
            .setCharacteristic(this.HBPlatform.Characteristic.SerialNumber, this.accessoryInformation.SerialNumber);
        this.On = false;
        this._hbPlatformAccessoryService = this.HBPlatformAccessory.getService(this.HBPlatform.Service.Switch) ||
            this.HBPlatformAccessory.addService(this.HBPlatform.Service.Switch);
        this.HBPlatformAccessoryService.setCharacteristic(this.platform.Characteristic.Name, this.name);
        this.HBPlatformAccessoryService.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this)) // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this)); // GET - bind to the `getOn` method below
    }
    async getOn() {
        return this.On;
    }
    async setOn(value) {
        this.On = value;
        this.notify('VDPAccessorySwitch:' + this.name, '<setOn>');
    }
    update(observable, key, message) {
        if (observable instanceof VDPAccessory_1.VDPAccessory) {
            this.HBPlatform.log.error('[VDPAccessorySwitch](Observer.Update)|' + key + '|' + message + '|' + this.name);
        }
    }
}
exports.VDPAccessorySwitch = VDPAccessorySwitch;
//# sourceMappingURL=VDPAccessorySwitch.js.map