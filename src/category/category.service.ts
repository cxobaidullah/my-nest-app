import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {

    getCategories()  {
        return ['Electronics', 'Books', 'Clothing', 'Home & Kitchen', 'Sports & Outdoors'];
    }
}
