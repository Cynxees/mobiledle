/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const generateUniqueChatroomCode = /* GraphQL */ `query GenerateUniqueChatroomCode {
  generateUniqueChatroomCode
}
` as GeneratedQuery<
  APITypes.GenerateUniqueChatroomCodeQueryVariables,
  APITypes.GenerateUniqueChatroomCodeQuery
>;
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
      user {
        id
        username
        ttl
        __typename
      }
      chatroom {
        id
        name
        code
        ttl
        __typename
      }
      ttl
      __typename
    }
    ttl
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
      chatrooms {
        id
        chatroomId
        userId
        ttl
        __typename
      }
      ttl
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
      chatrooms {
        id
        chatroomId
        userId
        ttl
        __typename
      }
      ttl
      __typename
    }
    chatroom {
      id
      name
      code
      messages {
        id
        content
        ownerId
        chatroomId
        createdAt
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        __typename
      }
      ttl
      __typename
    }
    ttl
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
      user {
        id
        username
        ttl
        __typename
      }
      chatroom {
        id
        name
        code
        ttl
        __typename
      }
      ttl
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
      user {
        id
        username
        ttl
        __typename
      }
      chatroom {
        id
        name
        code
        ttl
        __typename
      }
      ttl
      __typename
    }
    ownerId
    chatroom {
      id
      name
      code
      messages {
        id
        content
        ownerId
        chatroomId
        createdAt
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        __typename
      }
      ttl
      __typename
    }
    chatroomId
    createdAt
    ttl
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
      owner {
        id
        chatroomId
        userId
        ttl
        __typename
      }
      ownerId
      chatroom {
        id
        name
        code
        ttl
        __typename
      }
      chatroomId
      createdAt
      ttl
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
export const getChatroomByCode = /* GraphQL */ `query GetChatroomByCode($code: String!) {
  getChatroomByCode(code: $code) {
    id
    name
    code
    messages {
      id
      content
      owner {
        id
        chatroomId
        userId
        ttl
        __typename
      }
      ownerId
      chatroom {
        id
        name
        code
        ttl
        __typename
      }
      chatroomId
      createdAt
      ttl
      __typename
    }
    users {
      id
      chatroomId
      userId
      user {
        id
        username
        ttl
        __typename
      }
      chatroom {
        id
        name
        code
        ttl
        __typename
      }
      ttl
      __typename
    }
    ttl
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatroomByCodeQueryVariables,
  APITypes.GetChatroomByCodeQuery
>;
export const getChatroom = /* GraphQL */ `query GetChatroom($id: ID!) {
  getChatroom(id: $id) {
    id
    name
    code
    messages {
      id
      content
      owner {
        id
        chatroomId
        userId
        ttl
        __typename
      }
      ownerId
      chatroom {
        id
        name
        code
        ttl
        __typename
      }
      chatroomId
      createdAt
      ttl
      __typename
    }
    users {
      id
      chatroomId
      userId
      user {
        id
        username
        ttl
        __typename
      }
      chatroom {
        id
        name
        code
        ttl
        __typename
      }
      ttl
      __typename
    }
    ttl
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
      code
      messages {
        id
        content
        ownerId
        chatroomId
        createdAt
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        __typename
      }
      ttl
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
