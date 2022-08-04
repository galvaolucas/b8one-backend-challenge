import { injectable, inject } from 'tsyringe';
import Products from '../../infra/typeorm/entities/Products';
import IProductsRepository from '../../repositories/IProductsRepository';


interface IRequest {
  description: string;
  price: number;
  discount: number;
}

@injectable()
class UpdateProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    id: string,
    {
      description,
      price,
      discount,
    }: IRequest,
  ): Promise<Products | null> {
    const checkfProductExists = await this.productsRepository.findById(id);

    if(checkfProductExists) {
      console.log('Wasnt possible to find the product!');
    }

    const updatedProduct = await this.productsRepository.update(id, {
      description,
      price,
      discount,
    });

    return updatedProduct;
  }
}

export default UpdateProductsUseCase;
