import { SensitiveRule } from "src/graphql.schema";

export class createSensitiveRuleInput implements SensitiveRule{
    name: string;
    industryTypeId: number;
    rule: string;
}

export class updateSensitiveRuleInput {
    name: string;
    industryTypeId: number;
    rule: string;
}