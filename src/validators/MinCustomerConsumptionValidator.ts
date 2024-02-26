import { ElectricityBill, ValidatorResponse } from 'src/utils/types';
import BaseValidator from './BaseValidator';

class MinCustomerConsumptionValidator extends BaseValidator {
  validate(data: ElectricityBill, messages?: string[]): ValidatorResponse {
    const minByClass = {
      monofasico: 400,
      bifasico: 500,
      trifasico: 750,
    };

    const calculateAverage = data.historicoDeConsumo.reduce(
      (prev, curr, index) => {
        if (index + 1 === data.historicoDeConsumo.length) {
          return (curr + prev) / data.historicoDeConsumo.length;
        }
        return curr + prev;
      },
      0,
    );

    if (calculateAverage < minByClass[data.tipoDeConexao]) {
      return super.validate(data, [
        ...(messages || []),
        'Cliente não atingiu o mínimo de consumo necessário',
      ]);
    }
    return super.validate(data, messages);
  }
}

export default MinCustomerConsumptionValidator;
