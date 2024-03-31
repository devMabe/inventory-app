import { Store } from '../entity/store.entity';
import { IStore } from '../model/store.model';

export class StorePresenter extends Store {
  constructor(data: IStore) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.phoneNumber = data.phoneNumber;
    this.email = data.email;
    this.user = {
      id: data.user.id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      docNumber: data.user.docNumber,
      docType: data.user.docType,
    } as any;
  }
}
