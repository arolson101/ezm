///<reference path='../typings/tsd.d.ts'/>
///<reference path='../node_modules/filist/filist.d.ts'/>
///<reference path='../node_modules/updraft/dist/updraft.d.ts'/>

declare function require(module: string): any;

interface StringHashFcn {
	(input: string): number;
}
