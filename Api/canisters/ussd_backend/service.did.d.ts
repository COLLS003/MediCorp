import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type List = [] | [[string, List]];
export interface Medicine {
  'status' : number,
  'usages' : List,
  'expiryDate' : string,
  'code' : number,
  'name' : string,
  'manufacturedDate' : string,
}
export type MedicineID = number;
export interface _SERVICE {
  'createMedicine' : ActorMethod<[Medicine], MedicineID>,
  'read' : ActorMethod<[number], [] | [Medicine]>,
  'validate' : ActorMethod<[string], string>,
}
