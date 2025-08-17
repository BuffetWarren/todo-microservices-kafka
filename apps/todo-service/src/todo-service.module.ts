import { Module } from '@nestjs/common';
import { TodoServiceController } from './todo-service.controller';
import { TodoServiceService } from './todo-service.service';
import { ConfigModule } from '@nestjs/config';
import { TodosController } from './modules/todos/todos.controller';
import { PrismaService, TodoService } from './modules';

@Module({
  imports: [ConfigModule.forRoot({
        isGlobal: true,
      })],
  controllers: [TodoServiceController,TodosController],
  providers: [PrismaService, TodoServiceService, TodoService],
})
export class TodoServiceModule {}
