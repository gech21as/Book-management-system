// Minimal shim to satisfy TypeScript when @types/multer is not installed.
declare module 'multer' {
  import { Request } from 'express';

  export interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination?: string;
    filename?: string;
    path?: string;
    buffer?: Buffer;
  }

  export type FileFilterCallback = (error: Error | null, acceptFile?: boolean) => void;

  export interface Multer {
    single(fieldName: string): any;
  }

  function multer(options?: any): Multer;

  export default multer;
}
