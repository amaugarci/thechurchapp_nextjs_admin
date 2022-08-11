import { Expose, instanceToPlain, plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';

export class Notification {
  @Expose({ name: 'id' }) id: string = '';
  @Expose() title: string = '';
  @Expose() body: string = '';
  @Expose() @Type(() => Date) timestampCreated?: Date | null = null;

  static fromJson(json: any): Notification {
    return plainToInstance(Notification, json, { exposeDefaultValues: true, excludeExtraneousValues: true });
  }

  static toJson(order: Notification): any {
    return instanceToPlain(order);
  }
}
