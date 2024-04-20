/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getMobileLegendsCharacter = /* GraphQL */ `query GetMobileLegendsCharacter($id: ID!) {
  getMobileLegendsCharacter(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetMobileLegendsCharacterQueryVariables,
  APITypes.GetMobileLegendsCharacterQuery
>;
export const listMobileLegendsCharacters = /* GraphQL */ `query ListMobileLegendsCharacters(
  $filter: ModelMobileLegendsCharacterFilterInput
  $limit: Int
  $nextToken: String
) {
  listMobileLegendsCharacters(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMobileLegendsCharactersQueryVariables,
  APITypes.ListMobileLegendsCharactersQuery
>;
export const getChat = /* GraphQL */ `query GetChat($id: String!) {
  getChat(id: $id) {
    id
    text
    createdAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetChatQueryVariables, APITypes.GetChatQuery>;
export const listChats = /* GraphQL */ `query ListChats(
  $filter: TableChatFilterInput
  $limit: Int
  $nextToken: String
) {
  listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      createdAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListChatsQueryVariables, APITypes.ListChatsQuery>;
