import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
export class UpdateMovieDto extends PartialType(CreateMovieDto) {} // PartialType -> 만든 Dto 기반으로 작성하면 될듯. 얘는 patch같이 부분적으로만 필요할때 씀.
// 아래처럼 정의한것과 똑같음

// export class UpdateMovieDto {
//     @IsString()
//     readonly title?: string;

//     @IsNumber()
//     readonly year?: number;

//     @IsOptional()
//     @IsString({ each: true })
//     readonly genres?: string[];
//   }
