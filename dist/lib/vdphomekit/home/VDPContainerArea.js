"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPArea = void 0;
const VDPAccessory_1 = require("../accessories/accessory/VDPAccessory");
const VDPContainer_1 = require("./VDPContainer");
class VDPArea extends VDPContainer_1.VDPHomeContainer {
    update(observable, key, message) {
        this.HBPlatform.log.error('----------------');
        if (observable instanceof VDPContainer_1.VDPHomeContainer) {
            this.HBPlatform.log.error('[VDPContainerRoom](Observer.Update)|' + key + '|' + message + '|' + this.name);
        }
        else if (observable instanceof VDPAccessory_1.VDPAccessory) {
            this.HBPlatform.log.error('[VDPAccessory](Observer.Update)|' + key + '|' + message + '|' + this.name);
        }
        this.notify('TEST ACTION', 'TEST STATE', 'TEST MESSAGE');
        this.HBPlatform.log.error('[' + observable.constructor.name + '](Observer.Update)|' + key + '|' + message + '|' + this.name);
    }
}
exports.VDPArea = VDPArea;
//# sourceMappingURL=VDPContainerArea.js.map