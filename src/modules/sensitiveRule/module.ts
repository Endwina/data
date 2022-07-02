import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SensitiveRuleservice } from './service';
import { SensitiveRulesResolver } from './resolver';
import { ClassificationTemplateService } from '../classificationTemplate/service';

@Module({
  providers: [
    PrismaService,
    SensitiveRuleservice,
    ClassificationTemplateService,
    SensitiveRulesResolver,
  ],
})
export class SensitiveRuleModule {}
