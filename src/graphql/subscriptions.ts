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
    rangeType
    damageType
    resource
    hairColor
    species
    imageUrl
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
    rangeType
    damageType
    resource
    hairColor
    species
    imageUrl
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
    rangeType
    damageType
    resource
    hairColor
    species
    imageUrl
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMobileLegendsCharacterSubscriptionVariables,
  APITypes.OnDeleteMobileLegendsCharacterSubscription
>;
export const onCreateChat = /* GraphQL */ `subscription OnCreateChat(
  $id: String
  $text: String
  $createdAt: String
  $owner: String
) {
  onCreateChat(id: $id, text: $text, createdAt: $createdAt, owner: $owner) {
    id
    text
    createdAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChatSubscriptionVariables,
  APITypes.OnCreateChatSubscription
>;
export const onUpdateChat = /* GraphQL */ `subscription OnUpdateChat(
  $id: String
  $text: String
  $createdAt: String
  $owner: String
) {
  onUpdateChat(id: $id, text: $text, createdAt: $createdAt, owner: $owner) {
    id
    text
    createdAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChatSubscriptionVariables,
  APITypes.OnUpdateChatSubscription
>;
export const onDeleteChat = /* GraphQL */ `subscription OnDeleteChat(
  $id: String
  $text: String
  $createdAt: String
  $owner: String
) {
  onDeleteChat(id: $id, text: $text, createdAt: $createdAt, owner: $owner) {
    id
    text
    createdAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteChatSubscriptionVariables,
  APITypes.OnDeleteChatSubscription
>;
