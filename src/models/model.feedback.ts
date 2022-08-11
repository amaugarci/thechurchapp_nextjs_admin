import { Expose, instanceToPlain, plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';

export class Feedback {
  @Expose({ name: 'id' }) id: string = '';
  @Expose() name: string = '';
  @Expose() email: string = '';
  @Expose() phone: string = '';
  @Expose() message: string = '';
  @Expose() userId: string = '';
  @Expose() @Type(() => Date) timestampCreated?: Date | null = null;

  static fromJson(json: any): Feedback {
    return plainToInstance(Feedback, json, { exposeDefaultValues: true, excludeExtraneousValues: true });
  }

  static toJson(order: Feedback): any {
    return instanceToPlain(order);
  }
}
