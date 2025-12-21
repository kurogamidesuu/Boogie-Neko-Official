import { FileValidator } from '@nestjs/common';
export declare class ProductImageTypeValidator extends FileValidator {
    constructor();
    isValid(file: Express.Multer.File): boolean | Promise<boolean>;
    buildErrorMessage(file: Express.Multer.File): string;
}
