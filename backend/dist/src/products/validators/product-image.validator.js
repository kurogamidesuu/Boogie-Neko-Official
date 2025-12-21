"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImageTypeValidator = void 0;
const common_1 = require("@nestjs/common");
class ProductImageTypeValidator extends common_1.FileValidator {
    constructor() {
        super({});
    }
    isValid(file) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        return allowedTypes.includes(file.mimetype);
    }
    buildErrorMessage(file) {
        return `${file.mimetype} is not accepted! Only jpg/png allowed`;
    }
}
exports.ProductImageTypeValidator = ProductImageTypeValidator;
//# sourceMappingURL=product-image.validator.js.map