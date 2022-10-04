import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { IndustryInfoResolver } from "./resolver";
import { IndustryInfoService } from "./service";

@Module({
    providers:[PrismaService, IndustryInfoService, IndustryInfoResolver],
})
export class IndustryInfoModule{}