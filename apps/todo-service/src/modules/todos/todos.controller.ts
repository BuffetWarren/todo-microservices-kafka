import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { TodoService } from "./todos.service";
import { SearchQueryDto } from "./dto/search-query.dto";



@Controller()
export class TodosController {
    constructor(private todoService: TodoService) { }


    // @Post('search-all')
    //     @HttpCode(HttpStatus.OK)
    //     fetchAll(@Body() query: SearchQueryDto) {
    //         return this.todoService.fetchAll(query);
    //     }
    
    
    //     @Post('search')
    //     async searchPersons(@Body() query: SearchQueryDto) {
    //         return await this.todoService.searchPaginated(query);
    //     }

}