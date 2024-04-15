import { Category } from '../entity/category.entity';
import { ICategory } from '../model/category.model';

export class CategoryPresenter extends Category {
  constructor(category: ICategory) {
    super();
    this.id = category.id;
    this.name = category.name;
    this.store = {
      id: category.store.id,
      name: category.store.name,
    } as any;
    this.items = category.items;
  }
}
