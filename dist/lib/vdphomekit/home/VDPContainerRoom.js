"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPRoom = void 0;
const VDPAccessory_1 = require("../accessories/accessory/VDPAccessory");
const VDPContainer_1 = require("./VDPContainer");
class VDPRoom extends VDPContainer_1.VDPHomeContainer {
    update(observable, key, message) {
        this.HBPlatform.log.error('----------------');
        if (observable instanceof VDPContainer_1.VDPHomeContainer) {
            this.HBPlatform.log.error('[VDPContainerRoom](Observer.Update)|' + key + '|' + message + '|' + this.name);
        }
        else if (observable instanceof VDPAccessory_1.VDPAccessory) {
            this.HBPlatform.log.error('[VDPAccessory](Observer.Update)|' + key + '|' + message + '|' + this.name);
        }
        this.notify(this.name, '<NOTIFY TEST>');
        this.HBPlatform.log.error('[' + observable.constructor.name + '](Observer.Update)|' + key + '|' + message + '|' + this.name);
    }
}
exports.VDPRoom = VDPRoom;
//# sourceMappingURL=VDPContainerRoom.js.map