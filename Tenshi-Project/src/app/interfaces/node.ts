import { Port } from './port';

export interface Node {
    id?:string,
    info?:string,
    temp?:string,
    port?:Port[]
}
