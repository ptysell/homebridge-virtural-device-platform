import { VDPObservable } from "../system/observable";
import { VDPHomeContainer } from "./VDPHomeContainer";

export class VDPRoom extends VDPHomeContainer{


 public update(observable: VDPObservable, key?: string, message?: string ): void {
        if (observable instanceof VDPRoom) {
            this.HBPlatform.log.error('[VDPContainerRoom](Observer.Update)|' + key + '|' + message + '|' + this.name);
        }
    }
	
}