import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { idText } from "@ts-morph/common/lib/typescript";
import { RuleTester } from "eslint";
import { PrismaService } from "src/prisma.service";
import { SensitiveRuleService } from "./service";
// import { SensitiveRule, SensitiveRuleResult,
//         IndustryDetail, IndustryDetailResult} from "src/graphql.schema";
import {TransferDate } from 'src/utils/TransferDate'
import { createSensitiveRuleInput, updateSensitiveRuleInput } from "./dto/dto";
import { industry_type, sensitive_rules } from ".prisma/client";


@Resolver('SensitiveRules')
export class SensitiveRuleResolver {
    constructor(
        private sensitiveRuleService: SensitiveRuleService,
    ){}

    @Query('industryDetails')
    async getByOutId(
        @Args('id')
        id:number,
        @Args('industryId')
        industryId:number,
        @Args('industryTypeName')
        industryTypeName,
        @Args('skip')
        skip:number,
        @Args('take')
        take:number,
    ){
        const getModel = await this.sensitiveRuleService.findOut(
            {
                id,
                industry_id:industryId,
                industry_type_name:industryTypeName,
            },
            {
                skip,
                take,
            });
        const industryDetails = getModel.data.map((item: industry_type) => ({
            ...item,
            industryId: item.industry_id,
            industryTypeName: item.industry_type_name,
            timestamp: item.timestamp
                ? TransferDate.dateFormat(item.timestamp)
                : null,
        }));
        const total = getModel.total;
        const industryDetailResult = {
            data: industryDetails,
            total: total,
        };
        return industryDetailResult;
    }

    @Query('sensitiveRules')
    async findByOutId(
        @Args('id')
        id,
        @Args('name')
        name,
        @Args('industryTypeId')
        industryTypeId,
        @Args('rule')
        rule,
        @Args('skip')
        skip,
        @Args('take')
        take,
    ){
        const getModel = await this.sensitiveRuleService.findOutById({
            id,
            name,
            industry_type_id: industryTypeId,
            rule,
        },
        {
            skip,
            take,
        });

        const sensitiveRules = getModel.data.map((item: sensitive_rules) => ({
            ...item,
            industryTypeId: item.industry_type_id,
            timestamp: item.timestamp
                ? TransferDate.dateFormat(item.timestamp)
                : null,
        }));

        const total = getModel.total;
        const sensitiveRuleReesult = {
            data: sensitiveRules,
            total: total,
        };
        return sensitiveRuleReesult;
    }

    @Mutation('createSensitiveRule')
    async createOne(
        @Args('name')
        name,
        @Args('industryTypeId')
        industryTypeId,
        @Args('rule')
        rule,
    ){
        const createOneIn = await this.sensitiveRuleService.createOne({
            name: name,
            industry_type_id: industryTypeId,
            rule: rule,
            timestamp: TransferDate.parseISOLocal(),
        });

        const createResult = {
            ...createOneIn,
            name: createOneIn.name,
            industryTypeId: createOneIn.industry_type_id,
            rule: createOneIn.rule,
            timestamp: TransferDate.dateFormat(createOneIn.timestamp),
        };
        return createResult;
    }

    @Mutation('updateSensitiveRule')
    async updateOne(
        @Args('id')
        id,
        @Args('updateSensitiveRuleInput')
        data: updateSensitiveRuleInput,
    ){
        const updateOneInstance = await this.sensitiveRuleService.updateOne(
            {
                id,
            },
            {
                name: data.name,
                industry_type_id: data.industryTypeId,
                rule: data.rule,
                timestamp: TransferDate.parseISOLocal(),
            }
        )

        const updateResult = {
            ...updateOneInstance,
            name: updateOneInstance.name,
            industryTypeId: updateOneInstance.industry_type_id,
            rule: updateOneInstance.rule,
            timestamp: TransferDate.dateFormat(updateOneInstance.timestamp),
        }
        return updateResult;
    }

    @Mutation('deleteSensitiveRule')
    async deleteOne(
        @Args('id')
        id,
    ){
        const deleteOneInstance = await this.sensitiveRuleService.deleteOne(
            {id,}
        );

        const deleteResule = {
            ...deleteOneInstance,
            id: deleteOneInstance.id,
            name: deleteOneInstance.name,
            indstryTypeId: deleteOneInstance.industry_type_id,
            rule: deleteOneInstance.rule,
            timestamp: TransferDate.dateFormat(deleteOneInstance.timestamp),
        };
        return deleteResule;
    }


}