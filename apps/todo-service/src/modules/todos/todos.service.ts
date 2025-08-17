import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.todo.findMany();
  }

}