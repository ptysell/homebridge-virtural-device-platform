"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPRoom = void 0;
const VDPAccessory_1 = require("../accessories/accessory/VDPAccessory");
const VDPHomeContainer_1 = require("./VDPHomeContainer");
class VDPRoom extends VDPHomeContainer_1.VDPHomeContainer {
    update(observable, key, message) {
        if (observable instanceof VDPRoom) {
            this.HBPlatform.log.error('[VDPContainerRoom](Observer.Update)|' + key + '|' + message + '|' + this.name);
        }
        else if (observable instanceof VDPAccessory_1.VDPAccessory) {
            this.HBPlatform.log.error('[VDPAccessory](Observer.Update)|' + key + '|' + message + '|' + this.name);
        }
    }
}
exports.VDPRoom = VDPRoom;
//# sourceMappingURL=VDPRoom.js.map