/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateMobileLegendsCharacter = /* GraphQL */ `subscription OnCreateMobileLegendsCharacter(
  $filter: ModelSubscriptionMobileLegendsCharacterFilterInput
) {
  onCreateMobileLegendsCharacter(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMobileLegendsCharacterSubscriptionVariables,
  APITypes.OnCreateMobileLegendsCharacterSubscription
>;
export const onUpdateMobileLegendsCharacter = /* GraphQL */ `subscription OnUpdateMobileLegendsCharacter(
  $filter: ModelSubscriptionMobileLegendsCharacterFilterInput
) {
  onUpdateMobileLegendsCharacter(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMobileLegendsCharacterSubscriptionVariables,
  APITypes.OnUpdateMobileLegendsCharacterSubscription
>;
export const onDeleteMobileLegendsCharacter = /* GraphQL */ `subscription OnDeleteMobileLegendsCharacter(
  $filter: ModelSubscriptionMobileLegendsCharacterFilterInput
) {
  onDeleteMobileLegendsCharacter(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMobileLegendsCharacterSubscriptionVariables,
  APITypes.OnDeleteMobileLegendsCharacterSubscription
>;
