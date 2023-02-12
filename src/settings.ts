import { PlatformConfig } from 'homebridge';

export const PLATFORM_NAME = 'virtual-device-platform';
export const PLUGIN_NAME = 'homebridge-virtual-device-platform';

type VDPConfiguration = {
        VDPHome? : string;
    };

export type VDP_CONFIGURATION = PlatformConfig & VDPConfiguration;
