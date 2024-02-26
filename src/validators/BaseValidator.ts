import { Validator, ValidatorResponse } from 'src/utils/types';

class BaseValidator implements Validator {
  private nextValidator: Validator | null = null;

  setNext(validator: Validator): Validator {
    this.nextValidator = validator;
    return validator;
  }

  validate(data: any, message?: string[]): ValidatorResponse {
    const result = this.nextValidator!.validate(data, message);
    return {
      ok: result.ok,
      message: result.message,
    };
  }
}

export default BaseValidator;
