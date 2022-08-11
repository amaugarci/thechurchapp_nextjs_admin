import { Expose, instanceToPlain, plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';

export class Event {
  @Expose({ name: 'id' }) id: string = '';
  @Expose() name: string = '';
  @Expose() description: string = '';
  @Expose() location: string = '';
  @Expose() imageUrl: string = '';
  @Expose() link: string = '';

  @Expose() @Type(() => Date) timestampCreated?: Date | null = null;
  @Expose() @Type(() => Date) eventDate?: Date | null = null;
  @Expose() @Type(() => Date) eventTime?: Date | null = null;
  @Expose() @Type(() => Date) eventDateTime?: Date | null = null;

  static fromJson(json: any): Event {
    return plainToInstance(Event, json, { exposeDefaultValues: true, excludeExtraneousValues: true });
  }

  static toJson(order: Event): any {
    return instanceToPlain(order);
  }
}
