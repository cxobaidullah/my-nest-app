import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Hello from NestJS with TypeScript 6.0.3, NodeNext module system, and ES2023 target!';
  }
}
