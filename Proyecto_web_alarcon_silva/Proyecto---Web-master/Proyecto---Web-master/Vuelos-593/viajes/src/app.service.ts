import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Proyecto de Andre y Jonathan';
  }
}
