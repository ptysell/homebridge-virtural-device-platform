import { randomUUID } from "crypto";
import { access } from "fs";
import { PlatformAccessory } from "homebridge";
import { VDPHomebridgePlatform } from "../../../platform";
import { PLATFORM_NAME, PLUGIN_NAME } from "../../../settings";
import { VDPAccessoryOutlet } from "../../accessories/VDPAccessoryOutlet";
import { VDPAccessorySwitch } from "../../accessories/VDPAccessorySwitch";
import { VDPAccessory } from "../accessories/accessory/VDPAccessory";
import { VDPObservable } from "../system/observable";
import { VDPObserver } from "../system/observer";

export abstract class VDPHomeContainer implements VDPObserver, VDPObservable {

	private _observers: VDPObserver[];
	protected get observers(): VDPObserver[] { return this._observers; }
	protected set observers(observers: VDPObserver[]) { this._observers = observers} 

	protected _sender: string;
	public get sender(): string { return this._sender; }
	protected set sender(sender: string) { this._sender = sender; }

    private _name: string;
	public get name(): string { return this._name; }
	protected set name(name: string) { this._name = name; }

	private _uniqueIdentifier: string;
	public get uniqueIdentifier(): string { return this._uniqueIdentifier}
	protected set uniqueIdentifier(uniqueIdentifier: string) { this._uniqueIdentifier = uniqueIdentifier }

	private _accessory: VDPAccessory;
	public get accessory(): VDPAccessory { return this._accessory; }
	protected set accessory(accessory: VDPAccessory ) { this._accessory = accessory }

	private _accessories: VDPAccessory[];
	public get accessories(): VDPAccessory[] { return this._accessories; }
	protected set accessories(accessories: VDPAccessory[]) { this._accessories = accessories; }

	private _containers: VDPHomeContainer[];
	public get containers(): VDPHomeContainer[] { return this._containers; }
	protected set containers(containers: VDPHomeContainer[]) { this._containers = containers; }

	private _hbPlatform: VDPHomebridgePlatform;
	public get HBPlatform(): VDPHomebridgePlatform { return this._hbPlatform; }
	protected set HBPlatform(platform: VDPHomebridgePlatform) { this._hbPlatform = platform }


	constructor(
		protected readonly withName: string,
        protected readonly platform: VDPHomebridgePlatform,
	){

		this._observers = [];
		this._sender = '';

		this._name = withName;
		this._uniqueIdentifier = platform.api.hap.uuid.generate(this.name);

		this._accessories = [];
		this._containers = [];

		this._hbPlatform = platform;

		const existingTestRoomAccessory = this.HBPlatform.accessories.find(accessory => accessory.UUID === this.uniqueIdentifier);

        if (existingTestRoomAccessory) {
            this._accessory = new VDPAccessorySwitch(this.HBPlatform, existingTestRoomAccessory);
	    } else {
            const accessory = new this.HBPlatform.api.platformAccessory(this.name, this.uniqueIdentifier);
            this._accessory = new VDPAccessorySwitch(this.HBPlatform, accessory);
            this.HBPlatform.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
        }

		this.attach(this.accessory);

	}

	public addAccessory(accessory: VDPAccessory) {

		const isExist = this.accessories.includes(accessory);
        if (isExist) {
            throw new Error('');
        }

        this.accessories.push(accessory);
		this.attach(accessory);

	}

	public removeAccessory(accessory: VDPAccessory) {

		const accessoryIndex = this.accessories.indexOf(accessory);
        if (accessoryIndex === -1) {
            throw new Error('');
        }

        this.accessories.splice(accessoryIndex, 1);
		this.detach(accessory)
	
	}

	public addContainer(container: VDPHomeContainer) {

		const isExist = this.containers.includes(container);
        if (isExist) {
            throw new Error('');
        }
		
        this.containers.push(container);
		this.attach(container);
	
	}

	public removeContainer(container: VDPHomeContainer) {

		const containerIndex = this.containers.indexOf(container);
        if (containerIndex === -1) {
            throw new Error('');
        }

        this.accessories.splice(containerIndex, 1);
		this.detach(container)
	
	}

	public attach (observer: VDPObserver): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
			throw new Error('attach error');
        }
        this.observers.push(observer);
    }

    public detach (observer: VDPObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            throw new Error('');
        }

        this.observers.splice(observerIndex, 1);
    }

    public notify(action: string, state: string, message: string ): void {
        for (const observer of this.observers) {
            observer.update(this, this.sender, action, state, message);
        }
    }

    abstract update(observable: VDPObservable, sender: string, action: string, state: string, message: string): void;
}

