import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(private httpService: HttpService) {}

  async forwardRequest(url: string, method: string, data?: any) {
    const { data: response } = await firstValueFrom(
      this.httpService.request({ url, method, data })
    );
    return response;
  }
}