import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export default class CreateTodoRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
