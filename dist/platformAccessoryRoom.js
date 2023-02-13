"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPRoomAccessory = exports.DEVICE_MODEL = void 0;
const settings_1 = require("./settings");
exports.DEVICE_MODEL = 'Room Accessory Switch';
class VDPRoomAccessory {
    constructor(platform, accessory) {
        this.platform = platform;
        this.accessory = accessory;
        this.manufacturer = settings_1.DEVICE_MANUFACTURER;
        this.model = exports.DEVICE_MODEL;
        this.accessoryState = {
            On: false,
        };
        this.name = accessory.displayName;
        this.uuid = accessory.UUID;
        this.areaAccessories = [];
        this.serialNumber = accessory.UUID;
        this.accessory.getService(this.platform.Service.AccessoryInformation)
            .setCharacteristic(this.platform.Characteristic.Manufacturer, this.manufacturer)
            .setCharacteristic(this.platform.Characteristic.Model, this.model)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, this.serialNumber);
        this.service = this.accessory.getService(this.platform.Service.Switch) || this.accessory.addService(this.platform.Service.Switch);
        this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);
        this.service.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this)) // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this)); // GET - bind to the `getOn` method below
    }
    addArea(area) {
        this.platform.log.debug('Adding New Area Accessory:' + area.name + ' to Room ' + this.name);
        // const accessory = new this.platform.api.platformAccessory(name, uuid);
        // const vdpAccessory = new VDPAreaAccessory(this.platform, accessory, this);
        // this.platform.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
        this.areaAccessories.push(area);
    }
    async setOn(value) {
        const setOn = value;
        let setOnChild = true;
        this.platform.log.debug('Attempting to set ' + this.name + ' from ', this.accessoryState.On + ' to ' + setOn);
        if (setOn) {
            await this.turnOn();
        }
        else {
            await this.turnOff();
        }
        for (const area of this.areaAccessories) {
            if (await area.getOn()) {
                this.platform.log.debug('Area ' + area.name + ' is on');
                setOnChild = false;
            }
        }
        if (setOnChild) {
            this.platform.log.debug('All Areas are off, turing on.......');
            for (const area of this.areaAccessories) {
                area.setOn(setOn);
            }
        }
        this.accessoryState.On = setOn;
        this.platform.log.debug('Set Characteristic On ->', value);
    }
    async turnOn() {
        this.platform.log.debug('Attempting to turn ON accessory for Room ' + this.name + '........');
        this.platform.log.debug('Checking Area Status for ' + this.areaAccessories.length + ' areas......');
        if (this.areaAccessories.filter(searchObj => searchObj.accessoryState.On === true).length === 0) {
            this.platform.log.debug('All Areas are OFF, turning ON......');
            for (const area of this.areaAccessories) {
                this.platform.log.debug('Attempting to turn ON accessory for AREA ' + area.name + '........');
                area.setOn(true);
            }
        }
        this.accessoryState.On = true;
        this.platform.log.debug('Set Characteristic On for Room  ->', this.accessoryState.On);
    }
    async turnOff() {
        this.platform.log.debug('Attempting to turn OFF accessory for Room ' + this.name + '........');
        for (const area of this.areaAccessories) {
            this.platform.log.debug('Attempting to turn ON accessory for AREA ' + area.name + '........');
            area.setOn(false);
        }
        this.accessoryState.On = false;
        this.platform.log.debug('Set Characteristic On for Room  ->', this.accessoryState.On);
    }
    async getOn() {
        const isOn = this.accessoryState.On;
        this.platform.log.debug('Get Characteristic On ->', isOn);
        return isOn;
    }
}
exports.VDPRoomAccessory = VDPRoomAccessory;
//# sourceMappingURL=platformAccessoryRoom.js.map