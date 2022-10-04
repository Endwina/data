import { Args, Query, Resolver } from "@nestjs/graphql";
import { IndustryInfoService } from "./service";
// import {IndustryInfoResult } from "src/graphql.schema";
import { industry_info } from ".prisma/client";
import { TransferDate } from "src/utils/TransferDate";

@Resolver('IndustryInfo')
export class IndustryInfoResolver{
    constructor(
        private industryInfoService: IndustryInfoService,
    ){}


    @Query('industryInfos')
    async getById(
        @Args('id') 
        id,
        @Args('industryName') industryName,
        @Args('skip') skip,
        @Args('take') take,
    ){
        const getModel = await this.industryInfoService.findByOutId({
            id,
            industry_name: industryName,
        },
        {
            skip,
            take,
        });
        const industryInfos = getModel.data.map((item: industry_info) => ({
            ...getModel,
            timestamp: item.timestamp
                ? TransferDate.dateFormat(item.timestamp)
                : null    
        }));
        const total = getModel.total;
        const industryInfoResult ={
            data: industryInfos,
            total: total,
        };
        return industryInfoResult;

    }

}