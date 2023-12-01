// product.validators.ts

import { AbstractControl, ValidationErrors } from '@angular/forms';

export class MyValidators {

  static priceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value !== null && (isNaN(value) || value <= 0)) {
      return { invalidPrice: true };
    } else {
      return null;
    }
  }

  static imageUrlValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

    if (value !== null && !urlPattern.test(value)) {
      return { invalidImageUrl: true };
    } else {
      return null;
    }
  }
}

//
// //product.validators.ts
// import {AbstractControl, ValidationErrors} from '@angular/forms';
// export class MyValidators {
//
//
//   static priceValidator(control: AbstractControl): Promise<ValidationErrors | null> {
//     return new Promise((resolve) => {
//       const value = control.value;
//       console.log("Price Validator: value is", value);
//
//       if (value <= 0 || isNaN(value)) {
//         console.log("Price Validator: Invalid price");
//         resolve({ invalidPrice: true });
//       } else {
//         console.log("Price Validator: Valid price");
//         resolve(null);
//       }
//     });
//   }
//
//
//
//   static imageUrlValidator(control: AbstractControl): Promise<ValidationErrors | null> {
//     return new Promise((resolve) => {
//       const value = control.value;
//       console.log("Image URL Validator: value is", value);
//       const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
//
//
//       if (value !== null && !urlPattern.test(value)) {
//         resolve({ invalidImageUrl: true });
//         console.log("Image URL Validator: Invalid URL");
//       } else {
//         resolve(null);
//         console.log("Image URL Validator: valid URL");
//       }
//     });
//   }
// }
