import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
// import { IndustryDetailResolver } from "./resolver";
import { IndustryDetailService } from "./service";


@Module({
    providers: [PrismaService, IndustryDetailService,],
})
export class IndustryDetailModule{}
