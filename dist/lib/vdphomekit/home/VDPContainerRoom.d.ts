import { VDPHomebridgePlatform } from "../../../platform";
import { VDPObservable } from "../system/observable";
import { VDPHomeContainer } from "./VDPContainer";
export declare class VDPRoom extends VDPHomeContainer {
    protected readonly withName: string;
    protected readonly platform: VDPHomebridgePlatform;
    constructor(withName: string, platform: VDPHomebridgePlatform);
    update(observable: VDPObservable, sender: string, action: string, state: string, message: string): void;
}
//# sourceMappingURL=VDPContainerRoom.d.ts.map