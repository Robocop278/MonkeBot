/// <reference types="node" />
import * as fs from 'fs';
export declare const readFilePromise: typeof fs.readFile.__promisify__;
export declare function readJsonPromise(pathToFile: string): Promise<any>;
