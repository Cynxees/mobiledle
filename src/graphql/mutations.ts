/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createMobileLegendsCharacter = /* GraphQL */ `mutation CreateMobileLegendsCharacter(
  $input: CreateMobileLegendsCharacterInput!
  $condition: ModelMobileLegendsCharacterConditionInput
) {
  createMobileLegendsCharacter(input: $input, condition: $condition) {
    id
    name
    alias
    gender
    role
    specialty
    lane
    region
    goldPrice
    ticketPrice
    diamondPrice
    year
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMobileLegendsCharacterMutationVariables,
  APITypes.CreateMobileLegendsCharacterMutation
>;
export const updateMobileLegendsCharacter = /* GraphQL */ `mutation UpdateMobileLegendsCharacter(
  $input: UpdateMobileLegendsCharacterInput!
  $condition: ModelMobileLegendsCharacterConditionInput
) {
  updateMobileLegendsCharacter(input: $input, condition: $condition) {
    id
    name
    alias
    gender
    role
    specialty
    lane
    region
    goldPrice
    ticketPrice
    diamondPrice
    year
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMobileLegendsCharacterMutationVariables,
  APITypes.UpdateMobileLegendsCharacterMutation
>;
export const deleteMobileLegendsCharacter = /* GraphQL */ `mutation DeleteMobileLegendsCharacter(
  $input: DeleteMobileLegendsCharacterInput!
  $condition: ModelMobileLegendsCharacterConditionInput
) {
  deleteMobileLegendsCharacter(input: $input, condition: $condition) {
    id
    name
    alias
    gender
    role
    specialty
    lane
    region
    goldPrice
    ticketPrice
    diamondPrice
    year
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMobileLegendsCharacterMutationVariables,
  APITypes.DeleteMobileLegendsCharacterMutation
>;
