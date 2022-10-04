import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { SensitiveRuleResolver } from "./resolver";
import { SensitiveRuleService } from "./service";


@Module({
    providers:[SensitiveRuleService, PrismaService, SensitiveRuleResolver],
})
export class SensitiveRuleModule{}