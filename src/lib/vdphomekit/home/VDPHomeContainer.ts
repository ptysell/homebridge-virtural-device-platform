import { access } from "fs";
import { VDPAccessoryOutlet } from "../../accessories/VDPAccessoryOutlet";
import { VDPAccessory } from "../../accessory/VDPAccessory";
import { VDPObservable } from "../system/observable";
import { VDPObserver } from "../system/observer";

export abstract class VDPHomeContainer implements VDPObserver, VDPObservable {

	private _observers: VDPObserver[];
	private get observers(): VDPObserver[] { return this._observers; }
	private set observers(observers: VDPObserver[]) { this._observers = observers} 

    private _name: string;
	public get name(): string { return this._name; }
	private set name(name: string) { this._name = name; }

	private _uniqueIdentifier: string;
	public get uniqueIdentifier(): string { return this._uniqueIdentifier}
	private set uniqueIdentifier(uniqueIdentifier: string) { this._uniqueIdentifier = uniqueIdentifier }

	private _accessory: VDPAccessory | unknown;
	public get accessory(): VDPAccessory | unknown { return this._accessory; }
	private set accessory(accessory: VDPAccessory | unknown) { this._accessory = accessory }

	private _accessories: VDPAccessory[];
	public get accessories(): VDPAccessory[] { return this._accessories; }
	private set accessories(accessories: VDPAccessory[]) { this._accessories = accessories; }

	private _containers: VDPHomeContainer[];
	public get containers(): VDPHomeContainer[] { return this._containers }
	private set containers(containers: VDPHomeContainer[]) { this._containers = containers; }


	constructor(
		name: string,
	){

		this._observers = [];
		this._name = name;
		this._uniqueIdentifier = 'NOT IMPLEMENTED';
		this._accessory = null;
		this._accessories = [];
		this._containers = [];

	}

	abstract update(observable: VDPObservable): void;
	abstract attach(observer: VDPObserver): void;
	abstract detach(observer: VDPObserver): void;
	abstract notify(): void;
}

