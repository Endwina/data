import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Prisma, sensitive_rules } from '@prisma/client';
import { SensitiveRule, SensitiveRuleResult } from 'src/graphql.schema';
import { SensitiveRuleservice } from './service';
import { CreateSensitiveRuleDto } from './dto/dto';
import { ClassTreeTools } from 'src/utils/ClassTreeTools';
import { ClassificationTemplateService } from '../classificationTemplate/service';

/**
 * 敏感规则的Resolver
 *
 * @export
 * @class SensitiveRulesResolver
 */
@Resolver('SensitiveRules')
export class SensitiveRulesResolver {
  constructor(
    private sensitiveRulesService: SensitiveRuleservice,
    private classificationTemplateService: ClassificationTemplateService,
  ) {}

  /**
   * 按id查询一条敏感规则，
   * 返回敏感规则
   * @param {number} id
   * @return {*}  {Promise<SensitiveRule>}
   * @memberof SensitiveRulesResolver
   */
  @Query('sensitiveRule')
  async getById(
    @Args('id')
    id: number,
  ): Promise<SensitiveRule> {
    const getModel = await this.sensitiveRulesService.findById({
      id,
    });
    const SensitiveRule = {
      ...getModel,
      sensitiveLevelId: getModel.sensitive_level_id,
      recognitionModelId: getModel.recognition_model_id,
      sensitiveClassificationId: getModel.sensitive_classification_id,
      classificationTemplateId: getModel.classification_template_id,
      scanRange: getModel.scan_range,
    };
    return SensitiveRule;
  }

  /**
   * 按分页查询符合条件的敏感规则，
   * 返回分页指定数量及符合条件的敏感规则总数
   * @param {*} id
   * @param {*} name
   * @param {*} sensitiveLevelId
   * @param {*} recognitionModelId
   * @param {*} classificationTemplateId
   * @param {*} sensitiveClassificationId
   * @param {*} status
   * @param {*} skip
   * @param {*} take
   * @return {*}  {Promise<SensitiveRuleResult>}
   * @memberof SensitiveRulesResolver
   */
  @Query('sensitiveRules')
  async getByOutId(
    @Args('id')
    id,
    @Args('name')
    name,
    @Args('sensitiveLevelId')
    sensitiveLevelId,
    @Args('recognitionModelId')
    recognitionModelId,
    @Args('classificationTemplateId')
    classificationTemplateId,
    @Args('sensitiveClassificationId')
    sensitiveClassificationId,
    @Args('status')
    status,
    @Args('skip')
    skip,
    @Args('take')
    take,
  ): Promise<SensitiveRuleResult> {
    const getModel = await this.sensitiveRulesService.findByOutId(
      {
        id,
        name,
        sensitive_level_id: sensitiveLevelId,
        recognition_model_id: recognitionModelId,
        classification_template_id: classificationTemplateId,
        sensitive_classification_id: sensitiveClassificationId,
        status,
      },
      { skip, take },
    );
    const sensitiveRules = getModel.data.map((item: sensitive_rules) => ({
      ...item,
      sensitiveLevelId: item.sensitive_level_id,
      recognitionModelId: item.recognition_model_id,
      sensitiveClassificationId: item.sensitive_classification_id,
      classificationTemplateId: item.classification_template_id,
      scanRange: item.scan_range,
    }));
    const total = getModel.total;
    const sensitiveRulesResult = {
      data: sensitiveRules,
      total,
    };
    return sensitiveRulesResult;
  }

  /**
   * 创建一个敏感规则，
   * 返回创建后的敏感规则
   * @param {CreateSensitiveRuleDto} args
   * @return {*}  {Promise<SensitiveRule>}
   * @memberof SensitiveRulesResolver
   */
  @Mutation('createSensitiveRule')
  async createOne(
    @Args('createSensitiveRuleInput')
    args: CreateSensitiveRuleDto,
  ): Promise<SensitiveRule> {
    const createOneInstance = await this.sensitiveRulesService.createOne({
      uuid: args.uuid,
      name: args.name,
      status: args.status,
      sensitive_level_id: args.sensitiveLevelId,
      recognition_model_id: args.recognitionModelId,
      classification_template_id: args.classificationTemplateId,
      sensitive_classification_id: args.sensitiveClassificationId,
      scan_range: args.scanRange,
      create_time: Math.round(new Date().getTime() / 1000),
      update_time: Math.round(new Date().getTime() / 1000),
    });
    const getClassificationTemplate =
      await this.classificationTemplateService.findById({
        id: args.classificationTemplateId,
      });
    const getNewJson = ClassTreeTools.dealWithNode(
      getClassificationTemplate.content,
      (element) => {
        if (element['key'] === args.sensitiveClassificationId) {
          if (!element['children']) {
            element['children'] = [];
          }
          element['children'].push(args);
        }
        return element;
      },
    );
    await this.classificationTemplateService.updateOne(
      {
        id: args.classificationTemplateId,
      },
      { content: getNewJson },
    );
    const createResult = {
      ...createOneInstance,
      sensitiveLevelId: createOneInstance.sensitive_level_id,
      recognitionModelId: createOneInstance.recognition_model_id,
      sensitiveClassificationId: createOneInstance.sensitive_classification_id,
      classificationTemplateId: createOneInstance.classification_template_id,
      scanRange: createOneInstance.scan_range,
    };
    return createResult;
  }

  /**
   * 创建多个敏感规则，
   * 返回创建的数量
   * @param {{
   *       sensitiveRules: CreateSensitiveRuleDto[];
   *     }} args
   * @return {*}  {Promise<Prisma.BatchPayload>}
   * @memberof SensitiveRulesResolver
   */
  @Mutation('createSensitiveRules')
  async createMany(
    @Args('createSensitiveRuleInputs')
    args: {
      sensitiveRules: CreateSensitiveRuleDto[];
    },
  ): Promise<Prisma.BatchPayload> {
    const data = args.sensitiveRules.map((item) => ({
      uuid: item.uuid,
      name: item.name,
      status: item.status,
      sensitive_level_id: item.sensitiveLevelId,
      recognition_model_id: item.recognitionModelId,
      classification_template_id: item.classificationTemplateId,
      sensitive_classification_id: item.sensitiveClassificationId,
      scan_range: item.scanRange,
      create_time: Math.round(new Date().getTime() / 1000),
      update_time: Math.round(new Date().getTime() / 1000),
    }));
    const createManyNumber = await this.sensitiveRulesService.createMany(data);
    const getClassificationTemplate =
      await this.classificationTemplateService.findById({
        id: args.sensitiveRules[0].classificationTemplateId,
      });
    const getNewJson = ClassTreeTools.dealWithNode(
      getClassificationTemplate.content,
      (element) => {
        args.sensitiveRules.forEach((item) => {
          if (element['key'] === item.sensitiveClassificationId) {
            if (!element['children']) {
              element['children'] = [];
            }
            element['children'].push(item);
          }
        });
        return element;
      },
    );
    await this.classificationTemplateService.updateOne(
      {
        id: args.sensitiveRules[0].classificationTemplateId,
      },
      { content: getNewJson },
    );
    return createManyNumber;
  }

  /**
   * 删除指定id的敏感规则，
   * 返回删除后的敏感规则
   * @param {number} id
   * @return {*}  {Promise<SensitiveRule>}
   * @memberof SensitiveRulesResolver
   */
  @Mutation('deleteSensitiveRule')
  async deleteOne(
    @Args('id')
    id: number,
  ): Promise<SensitiveRule> {
    const deleteOneInstance = await await this.sensitiveRulesService.deleteOne({
      id,
    });
    const deleteResult = {
      uuid: deleteOneInstance.uuid,
      name: deleteOneInstance.name,
      sensitiveLevelId: deleteOneInstance.sensitive_level_id,
      recognitionModelId: deleteOneInstance.recognition_model_id,
      classificationTemplateId: deleteOneInstance.classification_template_id,
      sensitiveClassificationId: deleteOneInstance.sensitive_classification_id,
      status: deleteOneInstance.status,
      scanRange: deleteOneInstance.scan_range,
      createTime: deleteOneInstance.create_time,
      updateTime: deleteOneInstance.update_time,
    };
    const getClassificationTemplate =
      await this.classificationTemplateService.findById({
        id: deleteResult.classificationTemplateId,
      });
    const getNewJson = ClassTreeTools.dealWithNode(
      getClassificationTemplate.content,
      (element) => {
        return element['key'] === deleteResult.sensitiveClassificationId
          ? (element['children'] as any[]).filter((value) => {
              value['uuid'] !== deleteOneInstance.uuid;
            })
          : element;
      },
    );
    await this.classificationTemplateService.updateOne(
      {
        id: deleteResult.classificationTemplateId,
      },
      { content: getNewJson },
    );
    return deleteResult;
  }

  /**
   * 更新指定id的敏感规则，
   * 返回更新后的敏感规则
   * @param {number} id
   * @param {CreateSensitiveRuleDto} data
   * @return {*}  {Promise<SensitiveRule>}
   * @memberof SensitiveRulesResolver
   */
  @Mutation('updateSensitiveRule')
  async updateOne(
    @Args('id')
    id: number,
    @Args('createSensitiveRuleInput')
    data: CreateSensitiveRuleDto,
  ): Promise<SensitiveRule> {
    const updateOneInstance = await this.sensitiveRulesService.updateOne(
      {
        id,
      },
      {
        name: data.name,
        sensitive_level_id: data.sensitiveLevelId,
        recognition_model_id: data.recognitionModelId,
        sensitive_classification_id: data.sensitiveClassificationId,
        status: data.status,
        scan_range: data.scanRange,
        update_time: Math.round(new Date().getTime() / 1000),
      },
    );
    const updateResult = {
      id: updateOneInstance.id,
      name: updateOneInstance.name,
      sensitiveLevelId: updateOneInstance.sensitive_level_id,
      recognitionModelId: updateOneInstance.recognition_model_id,
      classificationTemplateId: updateOneInstance.classification_template_id,
      sensitiveClassificationId: updateOneInstance.sensitive_classification_id,
      status: updateOneInstance.status,
      scanRange: updateOneInstance.scan_range,
    };
    const getClassificationTemplate =
      await this.classificationTemplateService.findById({
        id: updateResult.classificationTemplateId,
      });
    const getNewJson = ClassTreeTools.dealWithNode(
      getClassificationTemplate.content,
      (element) => {
        if (element['key'] === updateResult.sensitiveClassificationId) {
          const elementIndex = (element['children'] as any[]).findIndex(
            (item) => item['id'] === id,
          );
          (element['children'] as any[])[elementIndex] = updateResult;
        }
        return element;
      },
    );
    await this.classificationTemplateService.updateOne(
      {
        id: updateResult.classificationTemplateId,
      },
      { content: getNewJson },
    );
    return updateOneInstance;
  }
}
