import { VDPHome } from "../home/VDPHome";
export declare class VDPHomeManager {
    private _homes;
    get homes(): VDPHome[];
    private set homes(value);
    private _delegate;
    get delegate(): any;
    set delegate(delegate: any);
    private _observers;
    get observers(): any;
    private set observers(value);
    constructor();
    addHome(withName: string): void;
    private addHomeCompletionHandler;
    removeHome(): void;
    private removeHomeCompletionHandler;
}
//# sourceMappingURL=VDPHomeManager.d.ts.map