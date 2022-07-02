import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SensitiveRuleservice } from './service';
import { SensitiveRulesResolver } from './resolver';

@Module({
  providers: [PrismaService, SensitiveRuleservice, SensitiveRulesResolver],
})
export class SensitiveRuleModule {}
