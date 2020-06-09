import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  AfterLoad,
} from 'typeorm';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { Owner } from '../owner/owner.entity';
import { DiscountService } from '../../utils/discount.util';

@Entity('car')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Manufacturer,
    (manufacturer: Manufacturer) => manufacturer.cars,
  )
  manufacturer: Manufacturer;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'int8', nullable: false })
  firstRegistrationDate: number;

  @OneToMany(
    () => Owner,
    (owner: Owner) => owner.car,
    { cascade: true, eager: true },
  )
  owners: Owner[];

  @AfterLoad()
  getDiscount(): void {
    const discountService: DiscountService = new DiscountService();
    const discount: number = discountService.getDiscount(
      this.firstRegistrationDate,
    );
    this.price = this.price - (this.price * discount) / 100;
  }
}
