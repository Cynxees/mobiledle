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
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($id: ID, $username: String) {
  onCreateUser(id: $id, username: $username) {
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
      points
      state
      __typename
    }
    ttl
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($id: ID, $username: String) {
  onUpdateUser(id: $id, username: $username) {
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
      points
      state
      __typename
    }
    ttl
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($id: ID, $username: String) {
  onDeleteUser(id: $id, username: $username) {
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
      points
      state
      __typename
    }
    ttl
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateChatroomUser = /* GraphQL */ `subscription OnCreateChatroomUser(
  $id: ID
  $chatroomId: ID
  $userId: ID
  $points: Int
  $state: String
) {
  onCreateChatroomUser(
    id: $id
    chatroomId: $chatroomId
    userId: $userId
    points: $points
    state: $state
  ) {
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
        __typename
      }
      chatroomState {
        id
        chatroomId
        mode
        currentState
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        points
        __typename
      }
      ttl
      __typename
    }
    ttl
    points
    state
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChatroomUserSubscriptionVariables,
  APITypes.OnCreateChatroomUserSubscription
>;
export const onUpdateChatroomUser = /* GraphQL */ `subscription OnUpdateChatroomUser(
  $id: ID
  $chatroomId: ID
  $userId: ID
  $points: Int
  $state: String
) {
  onUpdateChatroomUser(
    id: $id
    chatroomId: $chatroomId
    userId: $userId
    points: $points
    state: $state
  ) {
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
        __typename
      }
      chatroomState {
        id
        chatroomId
        mode
        currentState
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        points
        __typename
      }
      ttl
      __typename
    }
    ttl
    points
    state
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChatroomUserSubscriptionVariables,
  APITypes.OnUpdateChatroomUserSubscription
>;
export const onDeleteChatroomUser = /* GraphQL */ `subscription OnDeleteChatroomUser($id: ID) {
  onDeleteChatroomUser(id: $id) {
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
        __typename
      }
      chatroomState {
        id
        chatroomId
        mode
        currentState
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        points
        __typename
      }
      ttl
      __typename
    }
    ttl
    points
    state
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteChatroomUserSubscriptionVariables,
  APITypes.OnDeleteChatroomUserSubscription
>;
export const onCreateChatroomMessage = /* GraphQL */ `subscription OnCreateChatroomMessage(
  $id: ID
  $content: String
  $chatroomUserId: ID
  $chatroomId: ID
  $createdAt: AWSDateTime
) {
  onCreateChatroomMessage(
    id: $id
    content: $content
    chatroomUserId: $chatroomUserId
    chatroomId: $chatroomId
    createdAt: $createdAt
  ) {
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
        ttl
        __typename
      }
      ttl
      points
      state
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
        __typename
      }
      chatroomState {
        id
        chatroomId
        mode
        currentState
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        points
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
` as GeneratedSubscription<
  APITypes.OnCreateChatroomMessageSubscriptionVariables,
  APITypes.OnCreateChatroomMessageSubscription
>;
export const onUpdateChatroomMessage = /* GraphQL */ `subscription OnUpdateChatroomMessage(
  $id: ID
  $content: String
  $createdAt: AWSDateTime
) {
  onUpdateChatroomMessage(id: $id, content: $content, createdAt: $createdAt) {
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
        ttl
        __typename
      }
      ttl
      points
      state
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
        __typename
      }
      chatroomState {
        id
        chatroomId
        mode
        currentState
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        points
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
` as GeneratedSubscription<
  APITypes.OnUpdateChatroomMessageSubscriptionVariables,
  APITypes.OnUpdateChatroomMessageSubscription
>;
export const onDeleteChatroomMessage = /* GraphQL */ `subscription OnDeleteChatroomMessage($id: ID) {
  onDeleteChatroomMessage(id: $id) {
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
        ttl
        __typename
      }
      ttl
      points
      state
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
        __typename
      }
      chatroomState {
        id
        chatroomId
        mode
        currentState
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        points
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
` as GeneratedSubscription<
  APITypes.OnDeleteChatroomMessageSubscriptionVariables,
  APITypes.OnDeleteChatroomMessageSubscription
>;
export const onCreateChatroom = /* GraphQL */ `subscription OnCreateChatroom($id: ID, $name: String, $code: String) {
  onCreateChatroom(id: $id, name: $name, code: $code) {
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
        __typename
      }
      chatroomUserId
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
      points
      state
      __typename
    }
    chatroomState {
      id
      chatroomId
      chatroom {
        id
        name
        code
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
        __typename
      }
      mode
      currentState
      prompt {
        id
        question
        description
        imageUrl
        answer
        type
        timeLimit
        ttl
        __typename
      }
      willEndAt
      gameDuration
      round
      maxPoints
      ttl
      points
      __typename
    }
    ttl
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChatroomSubscriptionVariables,
  APITypes.OnCreateChatroomSubscription
>;
export const onUpdateChatroom = /* GraphQL */ `subscription OnUpdateChatroom($id: ID, $name: String, $code: String) {
  onUpdateChatroom(id: $id, name: $name, code: $code) {
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
        __typename
      }
      chatroomUserId
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
      points
      state
      __typename
    }
    chatroomState {
      id
      chatroomId
      chatroom {
        id
        name
        code
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
        __typename
      }
      mode
      currentState
      prompt {
        id
        question
        description
        imageUrl
        answer
        type
        timeLimit
        ttl
        __typename
      }
      willEndAt
      gameDuration
      round
      maxPoints
      ttl
      points
      __typename
    }
    ttl
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChatroomSubscriptionVariables,
  APITypes.OnUpdateChatroomSubscription
>;
export const onDeleteChatroom = /* GraphQL */ `subscription OnDeleteChatroom($id: ID, $name: String, $code: String) {
  onDeleteChatroom(id: $id, name: $name, code: $code) {
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
        __typename
      }
      chatroomUserId
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
      points
      state
      __typename
    }
    chatroomState {
      id
      chatroomId
      chatroom {
        id
        name
        code
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
        __typename
      }
      mode
      currentState
      prompt {
        id
        question
        description
        imageUrl
        answer
        type
        timeLimit
        ttl
        __typename
      }
      willEndAt
      gameDuration
      round
      maxPoints
      ttl
      points
      __typename
    }
    ttl
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteChatroomSubscriptionVariables,
  APITypes.OnDeleteChatroomSubscription
>;
export const onCreatePrompt = /* GraphQL */ `subscription OnCreatePrompt(
  $id: ID
  $question: String
  $description: String
  $imageUrl: String
  $answer: String
) {
  onCreatePrompt(
    id: $id
    question: $question
    description: $description
    imageUrl: $imageUrl
    answer: $answer
  ) {
    id
    question
    description
    imageUrl
    answer
    type
    timeLimit
    ttl
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePromptSubscriptionVariables,
  APITypes.OnCreatePromptSubscription
>;
export const onUpdatePrompt = /* GraphQL */ `subscription OnUpdatePrompt(
  $id: ID
  $question: String
  $description: String
  $imageUrl: String
  $answer: String
) {
  onUpdatePrompt(
    id: $id
    question: $question
    description: $description
    imageUrl: $imageUrl
    answer: $answer
  ) {
    id
    question
    description
    imageUrl
    answer
    type
    timeLimit
    ttl
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePromptSubscriptionVariables,
  APITypes.OnUpdatePromptSubscription
>;
export const onDeletePrompt = /* GraphQL */ `subscription OnDeletePrompt(
  $id: ID
  $question: String
  $description: String
  $imageUrl: String
  $answer: String
) {
  onDeletePrompt(
    id: $id
    question: $question
    description: $description
    imageUrl: $imageUrl
    answer: $answer
  ) {
    id
    question
    description
    imageUrl
    answer
    type
    timeLimit
    ttl
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePromptSubscriptionVariables,
  APITypes.OnDeletePromptSubscription
>;
export const onCreateChatroomState = /* GraphQL */ `subscription OnCreateChatroomState(
  $id: ID
  $chatroomId: ID
  $mode: String
  $currentState: String
  $willEndAt: AWSDateTime
) {
  onCreateChatroomState(
    id: $id
    chatroomId: $chatroomId
    mode: $mode
    currentState: $currentState
    willEndAt: $willEndAt
  ) {
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
        __typename
      }
      chatroomState {
        id
        chatroomId
        mode
        currentState
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        points
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
        ttl
        __typename
      }
      ttl
      points
      state
      __typename
    }
    mode
    currentState
    prompt {
      id
      question
      description
      imageUrl
      answer
      type
      timeLimit
      ttl
      __typename
    }
    willEndAt
    gameDuration
    round
    maxPoints
    ttl
    points
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChatroomStateSubscriptionVariables,
  APITypes.OnCreateChatroomStateSubscription
>;
export const onUpdateChatroomState = /* GraphQL */ `subscription OnUpdateChatroomState(
  $id: ID
  $chatroomId: ID
  $mode: String
  $currentState: String
  $willEndAt: AWSDateTime
) {
  onUpdateChatroomState(
    id: $id
    chatroomId: $chatroomId
    mode: $mode
    currentState: $currentState
    willEndAt: $willEndAt
  ) {
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
        __typename
      }
      chatroomState {
        id
        chatroomId
        mode
        currentState
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        points
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
        ttl
        __typename
      }
      ttl
      points
      state
      __typename
    }
    mode
    currentState
    prompt {
      id
      question
      description
      imageUrl
      answer
      type
      timeLimit
      ttl
      __typename
    }
    willEndAt
    gameDuration
    round
    maxPoints
    ttl
    points
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChatroomStateSubscriptionVariables,
  APITypes.OnUpdateChatroomStateSubscription
>;
export const onDeleteChatroomState = /* GraphQL */ `subscription OnDeleteChatroomState(
  $id: ID
  $chatroomId: ID
  $mode: String
  $currentState: String
  $willEndAt: AWSDateTime
) {
  onDeleteChatroomState(
    id: $id
    chatroomId: $chatroomId
    mode: $mode
    currentState: $currentState
    willEndAt: $willEndAt
  ) {
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
        __typename
      }
      chatroomState {
        id
        chatroomId
        mode
        currentState
        willEndAt
        gameDuration
        round
        maxPoints
        ttl
        points
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
        ttl
        __typename
      }
      ttl
      points
      state
      __typename
    }
    mode
    currentState
    prompt {
      id
      question
      description
      imageUrl
      answer
      type
      timeLimit
      ttl
      __typename
    }
    willEndAt
    gameDuration
    round
    maxPoints
    ttl
    points
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteChatroomStateSubscriptionVariables,
  APITypes.OnDeleteChatroomStateSubscription
>;
