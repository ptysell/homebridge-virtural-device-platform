"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDPRoom = void 0;
const VDPContainer_1 = require("./VDPContainer");
class VDPRoom extends VDPContainer_1.VDPHomeContainer {
    constructor(withName, platform) {
        super(withName, platform);
        this.withName = withName;
        this.platform = platform;
        this.sender = 'VDPRoom';
    }
    update(observable, sender, action, state, message) {
        this.HBPlatform.log.error('----------------');
        this.HBPlatform.log.error('[' + sender + '](Observer.Update)|' + action + '|' + state + '|' + message);
        // if (observable instanceof VDPHomeContainer) {
        //     this.HBPlatform.log.error('[VDPContainerRoom](Observer.Update)|' + action + '|' + state + '|' + message);
        // } else if (observable instanceof VDPAccessory) {
        //     this.HBPlatform.log.error('[VDPAccessory](Observer.Update)|' + key + '|' + message + '|' + this.name);
        // }
        this.notify('TEST ACTION', 'TEST STATE', 'TEST MESSAGE');
    }
}
exports.VDPRoom = VDPRoom;
//# sourceMappingURL=VDPContainerRoom.js.map