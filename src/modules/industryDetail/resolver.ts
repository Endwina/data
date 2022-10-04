// import { Query } from "@nestjs/common";
// import { Args, Resolver } from "@nestjs/graphql";
// import { industry_type } from "@prisma/client";
// import { TransferDate } from "src/utils/TransferDate";
// import { IndustryDetailService } from "./service";
// import { IndustryDetailResult } from "src/graphql.schema";

// @Resolver('IndustryDetail')
// export class IndustryDetailResolver{
//     constructor(private industryDetailService:IndustryDetailService ){}

//     @Query('industryDetails')
//     async getByOutId(
//         @Args('id')
//         id:number,
//         @Args('industryId')
//         industryId:number,
//         @Args('industryTypeName')
//         industryTypeName,
//         @Args('skip')
//         skip:number,
//         @Args('take')
//         take:number,
//     ): Promise<IndustryDetailResult>{
//         const getModel = await this.industryDetailService.findOut(
//             {
//                 id,
//                 industry_id:industryId,
//                 industry_type_name:industryTypeName,
//             },
//             {
//                 skip,
//                 take,
//             });
//         const industryDetails = getModel.data.map((item: industry_type) => ({
//             ...item,
//             industryId: item.industry_id,
//             industryTypeName: item.industry_type_name,
//             timestamp: item.timestamp
//                 ? TransferDate.dateFormat(item.timestamp)
//                 : null,
//         }));
//         const total = getModel.total;
//         const industryDetailResult = {
//             data: industryDetails,
//             total: total,
//         };
//         return industryDetailResult;
//     }
// }