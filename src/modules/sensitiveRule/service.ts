import { Injectable } from "@nestjs/common";
import { Prisma, sensitive_rules as SensitiveRule,
        industry_type as IndustryType} from ".prisma/client";
import { PrismaService } from "src/prisma.service";


@Injectable()
export class SensitiveRuleService { 
    constructor(private readonly prsima:PrismaService){}

    async createOne(data: Prisma.sensitive_rulesCreateInput):Promise<SensitiveRule>{
        return this.prsima.sensitive_rules.create({
            data,
        });
    }

    async deleteOne (input: Prisma.sensitive_rulesWhereUniqueInput):Promise<SensitiveRule>{
        return this.prsima.sensitive_rules.delete({
            where: input,
        });
    }

    async updateOne (
        input: Prisma.sensitive_rulesWhereUniqueInput,
        data: Prisma.sensitive_rulesCreateInput
    ):Promise<SensitiveRule>{
        return await this.prsima.sensitive_rules.update({
            where: input,
            data,
        });
    }

    async findOutById (
        input: Prisma.sensitive_rulesWhereInput,
        pagination?: {skip: number; take: number},
    ):Promise<{data: SensitiveRule[] | []; total: number}> {
        const data = await this.prsima.sensitive_rules.findMany({
            where: input,
            orderBy: [
                {
                    id: 'desc',
                },
            ],
            skip: pagination.skip,
            take: pagination.take,
        });
        const total = await this.prsima.sensitive_rules.count({
            where: input,
        });
        return {data, total};
    }

    async findOut(
        input: Prisma.industry_typeWhereInput,
        pagination?: {skip: number; take: number },
    ):Promise<{data: IndustryType[] | []; total: number }> {
        const data = await this.prsima.industry_type.findMany({
            where: input,
            orderBy: [
                {
                    id: 'desc',
                },
            ],
            skip: pagination.skip,
            take: pagination.take,            
        });
        const total = await this.prsima.industry_type.count({
            where: input,
        });
        return {data,total};
    }
} 