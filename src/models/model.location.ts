import { Expose, instanceToPlain, plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';

export class Location {
  @Expose({ name: 'id' }) id: string = '';
  @Expose() name: string = '';
  @Expose() pastor: string = '';
  @Expose() email: string = '';
  @Expose() phone: string = '';
  @Expose() address: string = '';
  @Expose() imageUrl: string = '';

  @Expose() @Type(() => Date) timestampCreated?: Date | null = null;

  static fromJson(json: any): Location {
    return plainToInstance(Location, json, { exposeDefaultValues: true, excludeExtraneousValues: true });
  }

  static toJson(order: Location): any {
    return instanceToPlain(order);
  }
}
