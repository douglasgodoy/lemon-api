import { ElectricityBill, ValidatorResponse } from 'src/utils/types';
import BaseValidator from './BaseValidator';

class ConsumerClassValidator extends BaseValidator {
  validate(data: ElectricityBill, messages?: string[]): ValidatorResponse {
    const allowedClasses = ['comercial', 'residencial', 'industrial'];

    if (!allowedClasses.includes(data.classeDeConsumo.toLowerCase())) {
      return super.validate(data, [
        ...(messages || []),
        'Classe de consumo não aceita',
      ]);
    }
    return super.validate(data);
  }
}

export default ConsumerClassValidator;
