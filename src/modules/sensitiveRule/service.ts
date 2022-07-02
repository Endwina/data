import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, sensitive_rules as sensitiveRules } from '@prisma/client';

/**
 * 敏感规则的service
 *
 * @export
 * @class SensitiveRuleservice
 */
@Injectable()
export class SensitiveRuleservice {
  constructor(private prisma: PrismaService) {}

  /**
   * 根据id查找sensitive_rules表内记录
   *
   * @param {Prisma.sensitive_rulesWhereUniqueInput} input
   * @return {*}  {(Promise<sensitiveRules | null>)}
   * @memberof SensitiveRuleservice
   */
  async findById(
    input: Prisma.sensitive_rulesWhereUniqueInput,
  ): Promise<sensitiveRules | null> {
    return await this.prisma.sensitive_rules.findUnique({
      where: input,
    });
  }

  /**
   * 根据字段条件按分页查找sensitive_rules表内记录
   *
   * @param {Prisma.sensitive_rulesWhereInput} input
   * @param {{ skip: number; take: number }} [pagination]
   * @return {*}  {(Promise<{ data: sensitiveRules[] | []; total: number }>)}
   * @memberof SensitiveRuleservice
   */
  async findByOutId(
    input: Prisma.sensitive_rulesWhereInput,
    pagination?: { skip: number; take: number },
  ): Promise<{ data: sensitiveRules[] | []; total: number }> {
    const data = await this.prisma.sensitive_rules.findMany({
      where: input,
      skip: pagination.skip,
      take: pagination.take,
    });
    const total = await this.prisma.sensitive_rules.count({
      where: input,
    });
    return { data, total };
  }

  /**
   * 在sensitive_rules表内插入一条记录
   *
   * @param {Prisma.sensitive_rulesCreateInput} data
   * @return {*}  {Promise<sensitiveRules>}
   * @memberof SensitiveRuleservice
   */
  async createOne(
    data: Prisma.sensitive_rulesCreateInput,
  ): Promise<sensitiveRules> {
    return await this.prisma.sensitive_rules.create({
      data,
    });
  }

  /**
   * 在sensitive_rules表内插入多条记录，返回插入数量
   *
   * @param {Prisma.sensitive_rulesCreateInput[]} data
   * @return {*}  {Promise<Prisma.BatchPayload>}
   * @memberof SensitiveRuleservice
   */
  async createMany(
    data: Prisma.sensitive_rulesCreateInput[],
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.sensitive_rules.createMany({
      data,
    });
  }

  /**
   * 删除sensitive_rules表内指定条件的一条记录
   *
   * @param {Prisma.sensitive_rulesWhereUniqueInput} input
   * @return {*}  {Promise<sensitiveRules>}
   * @memberof SensitiveRuleservice
   */
  async deleteOne(
    input: Prisma.sensitive_rulesWhereUniqueInput,
  ): Promise<sensitiveRules> {
    return await this.prisma.sensitive_rules.delete({
      where: input,
    });
  }

  /**
   * 删除sensitive_rules表内指定条件的多条记录
   *
   * @param {Prisma.sensitive_rulesWhereInput} input
   * @return {*}  {Promise<Prisma.BatchPayload>}
   * @memberof SensitiveRuleservice
   */
  async deleteMany(
    input: Prisma.sensitive_rulesWhereInput,
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.sensitive_rules.deleteMany({
      where: input,
    });
  }

  /**
   * 更新sensitive_rules表内指定条件的一条记录
   *
   * @param {Prisma.sensitive_rulesWhereUniqueInput} input
   * @param {Prisma.sensitive_rulesUpdateInput} data
   * @return {*}  {Promise<sensitiveRules>}
   * @memberof SensitiveRuleservice
   */
  async updateOne(
    input: Prisma.sensitive_rulesWhereUniqueInput,
    data: Prisma.sensitive_rulesUpdateInput,
  ): Promise<sensitiveRules> {
    return await this.prisma.sensitive_rules.update({
      where: input,
      data,
    });
  }

  /**
   * 更新sensitive_rules表内指定条件的多条记录
   *
   * @param {Prisma.sensitive_rulesWhereInput} input
   * @param {Prisma.sensitive_rulesUpdateInput[]} data
   * @return {*}  {Promise<Prisma.BatchPayload>}
   * @memberof SensitiveRuleservice
   */
  async updateMany(
    input: Prisma.sensitive_rulesWhereInput,
    data: Prisma.sensitive_rulesUpdateInput[],
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.sensitive_rules.updateMany({
      where: input,
      data,
    });
  }
}
