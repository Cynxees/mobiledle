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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMobileLegendsCharacterMutationVariables,
  APITypes.DeleteMobileLegendsCharacterMutation
>;
export const executeLaunchGame = /* GraphQL */ `mutation ExecuteLaunchGame($input: ExecuteLaunchGameInput!) {
  executeLaunchGame(input: $input)
}
` as GeneratedMutation<
  APITypes.ExecuteLaunchGameMutationVariables,
  APITypes.ExecuteLaunchGameMutation
>;
export const executeUserAnswer = /* GraphQL */ `mutation ExecuteUserAnswer($input: ExecuteUserAnswerInput!) {
  executeUserAnswer(input: $input)
}
` as GeneratedMutation<
  APITypes.ExecuteUserAnswerMutationVariables,
  APITypes.ExecuteUserAnswerMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
        hostId
        ttl
        __typename
      }
      ttl
      points
      state
      activeState
      __typename
    }
    ttl
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
        hostId
        ttl
        __typename
      }
      ttl
      points
      state
      activeState
      __typename
    }
    ttl
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
        hostId
        ttl
        __typename
      }
      ttl
      points
      state
      activeState
      __typename
    }
    ttl
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
      chatrooms {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
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
        chatroomUserId
        chatroomId
        type
        createdAt
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      host {
        id
        username
        ttl
        __typename
      }
      hostId
      chatroomState {
        id
        chatroomId
        mode
        currentState
        promptId
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        __typename
      }
      ttl
      __typename
    }
    ttl
    points
    state
    activeState
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
      chatrooms {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
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
        chatroomUserId
        chatroomId
        type
        createdAt
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      host {
        id
        username
        ttl
        __typename
      }
      hostId
      chatroomState {
        id
        chatroomId
        mode
        currentState
        promptId
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        __typename
      }
      ttl
      __typename
    }
    ttl
    points
    state
    activeState
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
      chatrooms {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
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
        chatroomUserId
        chatroomId
        type
        createdAt
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      host {
        id
        username
        ttl
        __typename
      }
      hostId
      chatroomState {
        id
        chatroomId
        mode
        currentState
        promptId
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        __typename
      }
      ttl
      __typename
    }
    ttl
    points
    state
    activeState
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
    chatroomUser {
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
        hostId
        ttl
        __typename
      }
      ttl
      points
      state
      activeState
      __typename
    }
    chatroomUserId
    chatroom {
      id
      name
      code
      messages {
        id
        content
        chatroomUserId
        chatroomId
        type
        createdAt
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      host {
        id
        username
        ttl
        __typename
      }
      hostId
      chatroomState {
        id
        chatroomId
        mode
        currentState
        promptId
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        __typename
      }
      ttl
      __typename
    }
    chatroomId
    type
    createdAt
    ttl
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
    chatroomUser {
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
        hostId
        ttl
        __typename
      }
      ttl
      points
      state
      activeState
      __typename
    }
    chatroomUserId
    chatroom {
      id
      name
      code
      messages {
        id
        content
        chatroomUserId
        chatroomId
        type
        createdAt
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      host {
        id
        username
        ttl
        __typename
      }
      hostId
      chatroomState {
        id
        chatroomId
        mode
        currentState
        promptId
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        __typename
      }
      ttl
      __typename
    }
    chatroomId
    type
    createdAt
    ttl
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
    chatroomUser {
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
        hostId
        ttl
        __typename
      }
      ttl
      points
      state
      activeState
      __typename
    }
    chatroomUserId
    chatroom {
      id
      name
      code
      messages {
        id
        content
        chatroomUserId
        chatroomId
        type
        createdAt
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      host {
        id
        username
        ttl
        __typename
      }
      hostId
      chatroomState {
        id
        chatroomId
        mode
        currentState
        promptId
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        __typename
      }
      ttl
      __typename
    }
    chatroomId
    type
    createdAt
    ttl
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
    code
    messages {
      id
      content
      chatroomUser {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      chatroomUserId
      chatroom {
        id
        name
        code
        hostId
        ttl
        __typename
      }
      chatroomId
      type
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
        hostId
        ttl
        __typename
      }
      ttl
      points
      state
      activeState
      __typename
    }
    host {
      id
      username
      chatrooms {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      ttl
      __typename
    }
    hostId
    chatroomState {
      id
      chatroomId
      chatroom {
        id
        name
        code
        hostId
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      mode
      currentState
      prompt {
        id
        question
        mobileLegendsCharacterId
        description
        imageUrl
        answer
        type
        timeLimit
        ttl
        __typename
      }
      promptId
      willEndAt
      gameDuration
      round
      maxPoints
      ttl
      __typename
    }
    ttl
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
    code
    messages {
      id
      content
      chatroomUser {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      chatroomUserId
      chatroom {
        id
        name
        code
        hostId
        ttl
        __typename
      }
      chatroomId
      type
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
        hostId
        ttl
        __typename
      }
      ttl
      points
      state
      activeState
      __typename
    }
    host {
      id
      username
      chatrooms {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      ttl
      __typename
    }
    hostId
    chatroomState {
      id
      chatroomId
      chatroom {
        id
        name
        code
        hostId
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      mode
      currentState
      prompt {
        id
        question
        mobileLegendsCharacterId
        description
        imageUrl
        answer
        type
        timeLimit
        ttl
        __typename
      }
      promptId
      willEndAt
      gameDuration
      round
      maxPoints
      ttl
      __typename
    }
    ttl
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
    code
    messages {
      id
      content
      chatroomUser {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      chatroomUserId
      chatroom {
        id
        name
        code
        hostId
        ttl
        __typename
      }
      chatroomId
      type
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
        hostId
        ttl
        __typename
      }
      ttl
      points
      state
      activeState
      __typename
    }
    host {
      id
      username
      chatrooms {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      ttl
      __typename
    }
    hostId
    chatroomState {
      id
      chatroomId
      chatroom {
        id
        name
        code
        hostId
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      mode
      currentState
      prompt {
        id
        question
        mobileLegendsCharacterId
        description
        imageUrl
        answer
        type
        timeLimit
        ttl
        __typename
      }
      promptId
      willEndAt
      gameDuration
      round
      maxPoints
      ttl
      __typename
    }
    ttl
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatroomMutationVariables,
  APITypes.DeleteChatroomMutation
>;
export const createPrompt = /* GraphQL */ `mutation CreatePrompt($input: CreatePromptInput!) {
  createPrompt(input: $input) {
    id
    question
    mobileLegendsCharacter {
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
      __typename
    }
    mobileLegendsCharacterId
    description
    imageUrl
    answer
    type
    timeLimit
    ttl
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePromptMutationVariables,
  APITypes.CreatePromptMutation
>;
export const updatePrompt = /* GraphQL */ `mutation UpdatePrompt($input: UpdatePromptInput!) {
  updatePrompt(input: $input) {
    id
    question
    mobileLegendsCharacter {
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
      __typename
    }
    mobileLegendsCharacterId
    description
    imageUrl
    answer
    type
    timeLimit
    ttl
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePromptMutationVariables,
  APITypes.UpdatePromptMutation
>;
export const deletePrompt = /* GraphQL */ `mutation DeletePrompt($input: DeletePromptInput!) {
  deletePrompt(input: $input) {
    id
    question
    mobileLegendsCharacter {
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
      __typename
    }
    mobileLegendsCharacterId
    description
    imageUrl
    answer
    type
    timeLimit
    ttl
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePromptMutationVariables,
  APITypes.DeletePromptMutation
>;
export const createChatroomState = /* GraphQL */ `mutation CreateChatroomState($input: CreateChatroomStateInput!) {
  createChatroomState(input: $input) {
    id
    chatroomId
    chatroom {
      id
      name
      code
      messages {
        id
        content
        chatroomUserId
        chatroomId
        type
        createdAt
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      host {
        id
        username
        ttl
        __typename
      }
      hostId
      chatroomState {
        id
        chatroomId
        mode
        currentState
        promptId
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        __typename
      }
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
        hostId
        ttl
        __typename
      }
      ttl
      points
      state
      activeState
      __typename
    }
    mode
    currentState
    prompt {
      id
      question
      mobileLegendsCharacter {
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
        __typename
      }
      mobileLegendsCharacterId
      description
      imageUrl
      answer
      type
      timeLimit
      ttl
      __typename
    }
    promptId
    willEndAt
    gameDuration
    round
    maxPoints
    ttl
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChatroomStateMutationVariables,
  APITypes.CreateChatroomStateMutation
>;
export const updateChatroomState = /* GraphQL */ `mutation UpdateChatroomState($input: UpdateChatroomStateInput!) {
  updateChatroomState(input: $input) {
    id
    chatroomId
    chatroom {
      id
      name
      code
      messages {
        id
        content
        chatroomUserId
        chatroomId
        type
        createdAt
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      host {
        id
        username
        ttl
        __typename
      }
      hostId
      chatroomState {
        id
        chatroomId
        mode
        currentState
        promptId
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        __typename
      }
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
        hostId
        ttl
        __typename
      }
      ttl
      points
      state
      activeState
      __typename
    }
    mode
    currentState
    prompt {
      id
      question
      mobileLegendsCharacter {
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
        __typename
      }
      mobileLegendsCharacterId
      description
      imageUrl
      answer
      type
      timeLimit
      ttl
      __typename
    }
    promptId
    willEndAt
    gameDuration
    round
    maxPoints
    ttl
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChatroomStateMutationVariables,
  APITypes.UpdateChatroomStateMutation
>;
export const deleteChatroomState = /* GraphQL */ `mutation DeleteChatroomState($input: DeleteChatroomStateInput!) {
  deleteChatroomState(input: $input) {
    id
    chatroomId
    chatroom {
      id
      name
      code
      messages {
        id
        content
        chatroomUserId
        chatroomId
        type
        createdAt
        ttl
        __typename
      }
      users {
        id
        chatroomId
        userId
        ttl
        points
        state
        activeState
        __typename
      }
      host {
        id
        username
        ttl
        __typename
      }
      hostId
      chatroomState {
        id
        chatroomId
        mode
        currentState
        promptId
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        __typename
      }
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
        hostId
        ttl
        __typename
      }
      ttl
      points
      state
      activeState
      __typename
    }
    mode
    currentState
    prompt {
      id
      question
      mobileLegendsCharacter {
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
        __typename
      }
      mobileLegendsCharacterId
      description
      imageUrl
      answer
      type
      timeLimit
      ttl
      __typename
    }
    promptId
    willEndAt
    gameDuration
    round
    maxPoints
    ttl
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatroomStateMutationVariables,
  APITypes.DeleteChatroomStateMutation
>;
