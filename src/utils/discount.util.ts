import config from '../config';

const discount: number = parseInt(config.DISCOUNT, 10);
const startMonth: number = parseInt(config.START_MONTH, 10);
const endMonth: number = parseInt(config.END_MONTH, 10);
const oneMonth: number = config.ONE_MONTH;

export class DiscountService {
  public getDiscount(firstRegistrationDate: number): number {
    const timeInterval: number = Date.now() - firstRegistrationDate;
    let discountValue = 0;
    // check period between 12 and 18 months
    if (
      timeInterval > oneMonth * startMonth &&
      timeInterval < oneMonth * endMonth
    ) {
      discountValue = discount;
    }
    return discountValue;
  }
}
