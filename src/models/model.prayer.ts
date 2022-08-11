import { Expose, instanceToPlain, plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';

export class Prayer {
  @Expose({ name: 'id' }) id: string = '';
  @Expose() name: string = '';
  @Expose() email: string = '';
  @Expose() phone: string = '';
  @Expose() message: string = '';
  @Expose() reply: string = '';
  @Expose() userId: string = '';
  @Expose() @Type(() => Date) timestampCreated?: Date | null = null;

  static fromJson(json: any): Prayer {
    return plainToInstance(Prayer, json, { exposeDefaultValues: true, excludeExtraneousValues: true });
  }

  static toJson(order: Prayer): any {
    return instanceToPlain(order);
  }
}
