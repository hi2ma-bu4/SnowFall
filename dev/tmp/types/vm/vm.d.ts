import { CompiledFunction, SnowFallSettings } from "../const/types";
export declare class SnowFallVM {
    private settings;
    private frames;
    private frame;
    private stack;
    private globals;
    constructor(entryFunction: CompiledFunction, settings: SnowFallSettings);
    private readByte;
    private readShort;
    private readConstant;
    run(): any;
}
