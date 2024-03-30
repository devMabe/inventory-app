import { User } from '../entity/user.entity';
import { IUser } from '../model/user.model';

export class UserPresenter extends User {
  constructor(user: IUser) {
    super();
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.docNumber = user.docNumber;
    this.docType = user.docType;
    this.isActive = user.isActive;
  }
}
