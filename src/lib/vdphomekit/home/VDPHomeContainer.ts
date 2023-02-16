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
	private set observers(observers: VDPObserver[]) { this._observers = observers} 

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
		protected readonly containerName: string,
        protected readonly platform: VDPHomebridgePlatform,
	){

		this._observers = [];

		this._name = containerName;
		this._uniqueIdentifier = platform.api.hap.uuid.generate(this.name);

		const existingTestRoomAccessory = this.HBPlatform.accessories.find(accessory => accessory.UUID === this.uniqueIdentifier);

        if (existingTestRoomAccessory) {
        	this.HBPlatform.log.debug('Restoring ROOM ACCESSORY form Cache:' + existingTestRoomAccessory.displayName);
            this._accessory = new VDPAccessorySwitch(this.HBPlatform, existingTestRoomAccessory);
	    } else {
            this.HBPlatform.log.debug('Adding New ROOM ACCESSORY:' + this.name);
            const accessory = new this.HBPlatform.api.platformAccessory(this.name, this.uniqueIdentifier);
            this._accessory = new VDPAccessorySwitch(this.HBPlatform, accessory);
            this.HBPlatform.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
        }


		this.attach(this.accessory, '', '');

		this._accessories = [];
		this._containers = [];

		this._hbPlatform = platform;

	}

	public addAccessory(accessory: VDPAccessory) {

		this.HBPlatform.log.warn('Adding ACCESSORY to ROOM |' + accessory.name + ' | ' + this.name)

		const isExist = this.accessories.includes(accessory);
        if (isExist) {
            return;
        }

        this.accessories.push(accessory);
		this.attach(accessory, '', '<addAccessory>')
	
	}

	public removeAccessory(accessory: VDPAccessory) {

		const accessoryIndex = this.accessories.indexOf(accessory);
        if (accessoryIndex === -1) {
            return;
        }

        this.accessories.splice(accessoryIndex, 1);
		this.detach(accessory, '', '')
	
	}

	public addContainer(container: VDPHomeContainer) {

		const isExist = this.containers.includes(container);
        if (isExist) {
            return;
        }
		
        this.containers.push(container);
		this.attach(container, '', '<addContainer>')
	
	}

	public removeContainer(container: VDPHomeContainer) {

		const containerIndex = this.containers.indexOf(container);
        if (containerIndex === -1) {
            return;
        }

        this.accessories.splice(containerIndex, 1);
		this.detach(container, '', '')
	
	}

	public attach ( observer: VDPObserver, key?: string, message?: string ): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return;
        }
        this.observers.push(observer);
    }

    public detach ( observer: VDPObserver, key?: string, message?: string ): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return;
        }

        this.observers.splice(observerIndex, 1);
    }

    public notify( key?: string, message?: string ): void {
        for (const observer of this.observers) {
            observer.update(this, key, message);
        }
    }

    abstract update(observable: VDPObservable, key?: string, message?: string): void;
}

