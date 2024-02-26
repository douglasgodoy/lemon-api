import { ElectricityBill, ValidatorResponse } from 'src/utils/types';
import BaseValidator from './BaseValidator';

class TariffModalityValidator extends BaseValidator {
  validate(data: ElectricityBill, messages?: string[]): ValidatorResponse {
    const allowedTariffModality = ['convencional', 'branca'];
    if (
      !allowedTariffModality.includes(data.modalidadeTarifaria.toLowerCase())
    ) {
      return {
        ok: false,
        message: [...(messages || []), 'Modalidade tarifária não aceita'],
      };
    }

    return {
      ok: messages?.length ? false : true,
      message: messages,
    };
  }
}

export default TariffModalityValidator;
