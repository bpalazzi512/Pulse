// user.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { Registration } from './registration.entity';
import { RegistrationUserDto } from './registration-user.dto';
import { v5 as uuidv5 } from 'uuid';
import { EmailService } from './email.service';
import { JwtStrategy } from './jwt.strategy';

const NAMESPACE_UUID = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'; // Or any other valid UUID

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Registration)
        private readonly registrationRepository: Repository<Registration>,

        private readonly jwtService: JwtService,

        private readonly emailService: EmailService,
        private readonly jwtStrategy: JwtStrategy

        ) {}

async createRegistration(registration : RegistrationUserDto): Promise<Registration> {
    const { email } = registration;

    if (await this.userRepository.findOne({ where: { email } })) {
        throw new ConflictException('User already exists');
    }

    if (await this.registrationRepository.findOne({ where: { email } })) {
        await this.registrationRepository.delete({ email });
    }
    
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    const registrationObject = this.registrationRepository.create({
        "email": email,
        "token": uuidv5(Date.now().toString() + email, NAMESPACE_UUID),
        "expiration": expiration // 1 hour
    });
   
    this.emailService.sendEmail(email, 'Pulse Registration', 'Please click the link to register ', `<a href='${process.env.FRONTEND_URL}/createpassword/${registrationObject.token}'>Click here to register</a>`);
    return this.registrationRepository.save(registrationObject);
}

async getRegistrationInfo(token : string) {
    const registration = await this.registrationRepository.findOne({ where: { token } });
    if (!registration) {
        throw new ConflictException('Registration not found');
    }

    return registration;
}

    

async register(registerUserDto: UserDto): Promise<Omit<User, "password">> {
    const { email, password } = registerUserDto;

    // Check if user already exists
    const user = await this.userRepository.findOne({ where: { email } });
    const registration = await this.registrationRepository.findOne({ where: { email } });

    if (!registration) {
        throw new ConflictException('Registration not found');
    }

    if (user) {
        throw new ConflictException('User already exists');
    }
    

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, process.env.NUM_ROUNDS);
    console.log("registering with email: " + email )

    const userObject = this.userRepository.create({
        email,
        password: hashedPassword
    });

    await this.registrationRepository.delete({ email });

    // Create and save the user
    let savedUser =  await this.userRepository.save(userObject) as Omit<User, "password">;
    savedUser  = { email: savedUser.email, id: savedUser.id, is_admin: savedUser.is_admin };
    return savedUser;
}


  async login(userDto: UserDto) {
    const { email, password } = userDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new ConflictException('Invalid information');
    }

    const userObject = { email: user.email, id: user.id, is_admin: user.is_admin };


    //verify that it works here 
    const payload = userObject // Customize as needed
    return {
        user: payload,
        access_token: this.jwtService.sign(payload, { 
            header: {
                alg: 'HS256', // Specify the algorithm explicitly
                // Do not include `typ`
              },
        }),
    };
  }


}
