import { VDPHome } from "../home/VDPHome";
export class VDPHomeManager {

    private _homes: VDPHome[];
	public get homes() { return this._homes; }
	private set homes(homes: VDPHome[]) { this._homes = homes; }

	private _delegate;
	public get delegate() { return this._delegate; }
	public set delegate(delegate) { this._delegate = delegate; }

	private _observers;
	public get observers() { return this._observers; }
	private set observers(observers) { this._observers = observers; }


	constructor(

	) {
	
		this._homes = [];
		
	}

	public addHome(withName: string) {
		try {

		} catch (error) {
			
		} finally {
			this.addHomeCompletionHandler();
		}
	}

	private addHomeCompletionHandler(){}

	public removeHome() {
		try {

		} catch (error) {
			
		} finally {
			this.removeHomeCompletionHandler();
		}
	}

	private removeHomeCompletionHandler(){}

}