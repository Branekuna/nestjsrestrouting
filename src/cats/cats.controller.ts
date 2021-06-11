import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { VerbottenException } from 'src/util/Errors/forbidden.exception';
import { ValidationPipe } from 'src/util/Pipes/validation.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dto';
import { Cat } from './entities/cat.entity';

@ApiTags('Users')
@Controller()
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiCreatedResponse({ type: Cat })
  @Post()
  async create(@Body(new ValidationPipe()) newCat: CreateCatDto) {
    return this.catsService.create(newCat);
  }

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get('/error')
  giveError(): void {
    console.log('Throw error route');
    //throw new HttpException('Custom Erorr', HttpStatus.BAD_REQUEST);
    throw new VerbottenException('Custom Error');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
