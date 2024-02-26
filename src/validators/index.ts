import ConsumerClassValidator from './ConsumerClassValidator';
import MinCustomerConsumptionValidator from './MinCustomerConsumptionValidator';
import TariffModalityValidator from './TariffModalityValidator';

const consumerClassValidator = new ConsumerClassValidator();
const minCustomerConsumptionValidator = new MinCustomerConsumptionValidator();
const tariffModalityValidator = new TariffModalityValidator();

export {
  consumerClassValidator,
  minCustomerConsumptionValidator,
  tariffModalityValidator,
};
