/// <reference types="node" />
declare module vdp.system.uuid {
    type Binary = Buffer | NodeJS.TypedArray | DataView;
    export type BinaryLike = string | Binary;
    export const BASE_UUID = "-0000-1000-8000-0026BB765291";
    export function generate(data: BinaryLike): string;
    export function isValid(UUID: string): boolean;
    /**
     * Returns the identity of the passed argument.
     *
     * @param buf - The string argument which is returned
     * @deprecated Most certainly the API you are using this function with changed from returning a Buffer to returning
     *  the actual uuid string. You can safely remove the call to unparse. Most certainly this call to unparse
     *  is located in you CameraSource which you converted from the old style CameraSource API to the new CameraControllers.
     */
    export function unparse(buf: string): string;
    /**
     * Parses the uuid as a string from the given Buffer.
     * The parser will use the first 8 bytes.
     *
     * @param buf - The buffer to read from.
     */
    export function unparse(buf: Buffer): string;
    /**
     * Parses the uuid as a string from the given Buffer at the specified offset.
     * @param buf - The buffer to read from.
     * @param offset - The offset in the buffer to start reading from.
     */
    export function unparse(buf: Buffer, offset: number): string;
    export function write(uuid: string): Buffer;
    export function write(uuid: string, buf: Buffer, offset: number): void;
    export function toShortForm(uuid: string, base?: string): string;
    export function toLongForm(uuid: string, base?: string): string;
    export {};
}
//# sourceMappingURL=uniqueidentifier.d.ts.map