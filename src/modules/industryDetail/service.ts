import { Injectable } from "@nestjs/common";
import { Prisma,
        industry_type as IndustryType} from "@prisma/client";
import { PrismaService } from "src/prisma.service";



@Injectable()
export class IndustryDetailService{
    constructor(private readonly prisma:PrismaService){}

    async findOut(
        input: Prisma.industry_typeWhereInput,
        pagination?: {skip: number; take: number },
    ):Promise<{data: IndustryType[] | []; total: number }> {
        const data = await this.prisma.industry_type.findMany({
            where: input,
            orderBy: [
                {
                    id: 'desc',
                },
            ],
            skip: pagination.skip,
            take: pagination.take,            
        });
        const total = await this.prisma.industry_type.count({
            where: input,
        });
        return {data,total};
    }
}