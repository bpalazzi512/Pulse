import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Set up the Nodemailer transporter using your email service credentials
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE, // You can use other services like 'smtp', 'Mailgun', 'SendGrid', etc.
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
      },
    });
  }

  // Method to send an email
  async sendEmail(to: string, subject: string, text: string, html: string) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to, // recipient address
        subject, // Subject line
        text, // plain text body
        html, // HTML body
      });
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }
}
