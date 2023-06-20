import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendAdminRegistrationCode(email: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Admin Registration Code For LocalTravel',
      template: './adminRegistrationMail',
      context: {
        code: code,
      },
    });
  }

  async sendCreatedRouteNotification(
    username: string,
    routeName: string,
    routeShortDescription: string,
    toArray: string[],
  ) {
    await this.mailerService.sendMail({
      to: toArray,
      subject: `${username} created new route at LocalTravel`,
      template: './createdRouteNotification',
      context: {
        username: username,
        routeName: routeName,
        routeShortDescription: routeShortDescription,
      },
    });
  }
}
