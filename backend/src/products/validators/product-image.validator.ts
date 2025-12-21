import { FileValidator } from '@nestjs/common';

export class ProductImageTypeValidator extends FileValidator {
  constructor() {
    super({});
  }

  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    return allowedTypes.includes(file.mimetype);
  }

  buildErrorMessage(file: Express.Multer.File): string {
    return `${file.mimetype} is not accepted! Only jpg/png allowed`;
  }
}
