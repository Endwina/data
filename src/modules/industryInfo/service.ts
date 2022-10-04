import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma , industry_info as IndustryInfo} from '.prisma/client';

@Injectable()
export class IndustryInfoService{
    constructor(private prisma: PrismaService) {}

    async findById(
        input:Prisma.industry_infoWhereUniqueInput,
    ): Promise<IndustryInfo | null>{
        return await this.prisma.industry_info.findUnique({
            where:input,
        });
    }

    async findByOutId(
        input: Prisma.industry_infoWhereInput,
        pagination?:{skip: number; take: number},
    ): Promise<{ data: IndustryInfo[] | []; total: number}> {
        const data = await this.prisma.industry_info.findMany({
            where: input,
            skip: pagination.skip,
            take: pagination.take,
        });
        const total = await this.prisma.industry_info.count({
            where: input,
        });
        return {data, total};
    }

    async createOne(
        data: Prisma.industry_infoCreateInput,
    ): Promise<IndustryInfo> {
        return await this.prisma.industry_info.create({
            data,
        });
    }

    async deleteOne(
        input: Prisma.industry_infoWhereUniqueInput,
    ): Promise<IndustryInfo> {
        return await this.prisma.industry_info.delete({
            where:input,
        });
    }
}