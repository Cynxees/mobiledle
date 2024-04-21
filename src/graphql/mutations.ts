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
export const createUser = /* GraphQL */ `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createChatroomUser = /* GraphQL */ `mutation CreateChatroomUser($input: CreateChatroomUserInput!) {
  createChatroomUser(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateChatroomUserMutationVariables,
  APITypes.CreateChatroomUserMutation
>;
export const updateChatroomUser = /* GraphQL */ `mutation UpdateChatroomUser($input: UpdateChatroomUserInput!) {
  updateChatroomUser(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateChatroomUserMutationVariables,
  APITypes.UpdateChatroomUserMutation
>;
export const deleteChatroomUser = /* GraphQL */ `mutation DeleteChatroomUser($input: DeleteChatroomUserInput!) {
  deleteChatroomUser(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteChatroomUserMutationVariables,
  APITypes.DeleteChatroomUserMutation
>;
export const createChatroomMessage = /* GraphQL */ `mutation CreateChatroomMessage($input: CreateChatroomMessageInput!) {
  createChatroomMessage(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateChatroomMessageMutationVariables,
  APITypes.CreateChatroomMessageMutation
>;
export const updateChatroomMessage = /* GraphQL */ `mutation UpdateChatroomMessage($input: UpdateChatroomMessageInput!) {
  updateChatroomMessage(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateChatroomMessageMutationVariables,
  APITypes.UpdateChatroomMessageMutation
>;
export const deleteChatroomMessage = /* GraphQL */ `mutation DeleteChatroomMessage($input: DeleteChatroomMessageInput!) {
  deleteChatroomMessage(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteChatroomMessageMutationVariables,
  APITypes.DeleteChatroomMessageMutation
>;
export const createChatroom = /* GraphQL */ `mutation CreateChatroom($input: CreateChatroomInput!) {
  createChatroom(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateChatroomMutationVariables,
  APITypes.CreateChatroomMutation
>;
export const updateChatroom = /* GraphQL */ `mutation UpdateChatroom($input: UpdateChatroomInput!) {
  updateChatroom(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateChatroomMutationVariables,
  APITypes.UpdateChatroomMutation
>;
export const deleteChatroom = /* GraphQL */ `mutation DeleteChatroom($input: DeleteChatroomInput!) {
  deleteChatroom(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteChatroomMutationVariables,
  APITypes.DeleteChatroomMutation
>;
