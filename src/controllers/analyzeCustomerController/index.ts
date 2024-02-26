import { Request, Response } from 'express';
import {
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE,
  SUCCESS_HTTP_RESPONSE,
} from 'src/utils/http';
import { DataResponse, ElectricityBill } from 'src/utils/types';
import {
  consumerClassValidator,
  minCustomerConsumptionValidator,
  tariffModalityValidator,
} from 'src/validators';
import { calculateCO2Economy } from './utils';

export default async function analyzeCustomerController(
  req: Request,
  res: Response,
) {
  try {
    const body = req.body as ElectricityBill;

    consumerClassValidator
      .setNext(minCustomerConsumptionValidator)
      .setNext(tariffModalityValidator);

    const validatorResponse = consumerClassValidator.validate(body);

    let response: DataResponse = {
      elegivel: validatorResponse.ok,
    };

    if (validatorResponse.ok) {
      const economy = calculateCO2Economy(body.historicoDeConsumo);
      response.economiaAnualDeCO2 = economy.toFixed(2);
    } else {
      response.razoesDeInelegibilidade = validatorResponse.message;
    }

    return SUCCESS_HTTP_RESPONSE(res, response);
  } catch (error) {
    console.error(error);
    return INTERNAL_SERVER_ERROR_HTTP_RESPONSE(res);
  }
}
