
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateSensitiveRuleInput {
    uuid?: Nullable<string>;
    name?: Nullable<string>;
    sensitiveLevelId?: Nullable<number>;
    recognitionModelId?: Nullable<number>;
    classificationTemplateId?: Nullable<number>;
    sensitiveClassificationId?: Nullable<string>;
    status?: Nullable<number>;
    scanRange?: Nullable<JSON>;
}

export interface CreateSensitiveRuleInputs {
    sensitiveRules: Nullable<CreateSensitiveRuleInput>[];
}

export interface SensitiveRule {
    id?: Nullable<number>;
    uuid?: Nullable<string>;
    name?: Nullable<string>;
    sensitiveLevelId?: Nullable<number>;
    recognitionModelId?: Nullable<number>;
    classificationTemplateId?: Nullable<number>;
    sensitiveClassificationId?: Nullable<string>;
    status?: Nullable<number>;
    scanRange?: Nullable<JSON>;
    createTime?: Nullable<number>;
    updateTime?: Nullable<number>;
}

export interface SensitiveRuleResult {
    data?: Nullable<Nullable<SensitiveRule>[]>;
    total?: Nullable<number>;
}

export interface CreatManyPayload {
    count?: Nullable<number>;
}

export interface IQuery {
    sensitiveRule(id?: Nullable<number>): Nullable<SensitiveRule> | Promise<Nullable<SensitiveRule>>;
    sensitiveRules(id?: Nullable<number>, uuid?: Nullable<string>, name?: Nullable<string>, sensitiveLevelId?: Nullable<number>, recognitionModelId?: Nullable<number>, classificationTemplateId?: Nullable<number>, sensitiveClassificationId?: Nullable<string>, status?: Nullable<number>, scanRange?: Nullable<JSON>, skip?: Nullable<number>, take?: Nullable<number>): Nullable<SensitiveRuleResult> | Promise<Nullable<SensitiveRuleResult>>;
}

export interface IMutation {
    createSensitiveRule(createSensitiveRuleInput?: Nullable<CreateSensitiveRuleInput>): Nullable<SensitiveRule> | Promise<Nullable<SensitiveRule>>;
    createSensitiveRules(createSensitiveRuleInputs?: Nullable<CreateSensitiveRuleInputs>): Nullable<CreatManyPayload> | Promise<Nullable<CreatManyPayload>>;
    deleteSensitiveRule(id?: Nullable<number>): Nullable<SensitiveRule> | Promise<Nullable<SensitiveRule>>;
    updateSensitiveRule(id?: Nullable<number>, createSensitiveRuleInput?: Nullable<CreateSensitiveRuleInput>): Nullable<SensitiveRule> | Promise<Nullable<SensitiveRule>>;
}

export type JSON = any;
type Nullable<T> = T | null;
