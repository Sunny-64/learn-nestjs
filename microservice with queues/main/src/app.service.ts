import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly users : any[] = []

  constructor(@Inject('COMMUNICATION') private readonly communicationClient : ClientProxy){}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserData : CreateUserDto){
    this.users.push(createUserData); 
    this.communicationClient.emit('user_created', new CreateUserEvent(createUserData.email))
    return {message : "user created"}
  }

}
