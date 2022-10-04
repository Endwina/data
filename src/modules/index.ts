import { IndustryInfoModule } from './industryInfo/module';
import { SensitiveRuleModule } from './sensitiveRule/module';

/** 框架需要加载的模块，在此处注册后会自动导入 */
const modules = [SensitiveRuleModule,IndustryInfoModule];

export default modules;