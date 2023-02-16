import { VDPAccessory } from "../accessories/accessory/VDPAccessory";
import { VDPObservable } from "../system/observable";
import { VDPHomeContainer } from "./VDPHomeContainer";

export class VDPRoom extends VDPHomeContainer{


 public update(observable: VDPObservable, key?: string, message?: string ): void {
        if (observable instanceof VDPHomeContainer) {
            this.HBPlatform.log.error('[VDPContainerRoom](Observer.Update)|' + key + '|' + message + '|' + this.name);
        } else if (observable instanceof VDPAccessory) {
            this.HBPlatform.log.error('[VDPAccessory](Observer.Update)|' + key + '|' + message + '|' + this.name);


		}

		this.HBPlatform.log.error('[' + observable.constructor.name + '](Observer.Update)|' + key + '|' + message + '|' + this.name);

    }
	
}