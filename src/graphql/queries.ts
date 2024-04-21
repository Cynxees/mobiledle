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
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    chatrooms {
      id
      chatroomId
      userId
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: TableUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getChatroomUser = /* GraphQL */ `query GetChatroomUser($id: ID!) {
  getChatroomUser(id: $id) {
    id
    chatroomId
    userId
    user {
      id
      username
      __typename
    }
    chatroom {
      id
      name
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatroomUserQueryVariables,
  APITypes.GetChatroomUserQuery
>;
export const listChatroomUsers = /* GraphQL */ `query ListChatroomUsers(
  $filter: TableChatroomUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatroomUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      chatroomId
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatroomUsersQueryVariables,
  APITypes.ListChatroomUsersQuery
>;
export const getChatroomMessage = /* GraphQL */ `query GetChatroomMessage($id: ID!) {
  getChatroomMessage(id: $id) {
    id
    content
    owner {
      id
      chatroomId
      userId
      __typename
    }
    chatroom {
      id
      name
      __typename
    }
    chatroomId
    createdAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatroomMessageQueryVariables,
  APITypes.GetChatroomMessageQuery
>;
export const listChatroomMessages = /* GraphQL */ `query ListChatroomMessages(
  $filter: TableChatroomMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatroomMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      chatroomId
      createdAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatroomMessagesQueryVariables,
  APITypes.ListChatroomMessagesQuery
>;
export const getChatroom = /* GraphQL */ `query GetChatroom($id: ID!) {
  getChatroom(id: $id) {
    id
    name
    messages {
      id
      content
      chatroomId
      createdAt
      __typename
    }
    users {
      id
      chatroomId
      userId
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatroomQueryVariables,
  APITypes.GetChatroomQuery
>;
export const listChatrooms = /* GraphQL */ `query ListChatrooms(
  $filter: TableChatroomFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatrooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatroomsQueryVariables,
  APITypes.ListChatroomsQuery
>;
