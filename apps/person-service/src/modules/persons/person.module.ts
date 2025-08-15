
import { PrismaModule } from "libs/common/prisma/prisma.module";
import { PersonsController } from "./persons.controller";
import { PersonService } from "./persons.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [PrismaModule],
    controllers: [PersonsController],
    providers: [PersonService]
})
export class PersonsModule {}