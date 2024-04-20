/* tslint:disable */
 
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
    rangeType
    damageType
    resource
    hairColor
    species
    imageUrl
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
    rangeType
    damageType
    resource
    hairColor
    species
    imageUrl
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
    rangeType
    damageType
    resource
    hairColor
    species
    imageUrl
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMobileLegendsCharacterMutationVariables,
  APITypes.DeleteMobileLegendsCharacterMutation
>;
export const createChat = /* GraphQL */ `mutation CreateChat($input: CreateChatInput!) {
  createChat(input: $input) {
    id
    text
    createdAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChatMutationVariables,
  APITypes.CreateChatMutation
>;
export const updateChat = /* GraphQL */ `mutation UpdateChat($input: UpdateChatInput!) {
  updateChat(input: $input) {
    id
    text
    createdAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChatMutationVariables,
  APITypes.UpdateChatMutation
>;
export const deleteChat = /* GraphQL */ `mutation DeleteChat($input: DeleteChatInput!) {
  deleteChat(input: $input) {
    id
    text
    createdAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatMutationVariables,
  APITypes.DeleteChatMutation
>;
