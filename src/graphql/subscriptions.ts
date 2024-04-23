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
export const onCreateChatroomUser = /* GraphQL */ `subscription OnCreateChatroomUser($id: ID, $chatroomId: ID, $userId: ID) {
  onCreateChatroomUser(id: $id, chatroomId: $chatroomId, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChatroomUserSubscriptionVariables,
  APITypes.OnCreateChatroomUserSubscription
>;
export const onUpdateChatroomUser = /* GraphQL */ `subscription OnUpdateChatroomUser($id: ID, $chatroomId: ID, $userId: ID) {
  onUpdateChatroomUser(id: $id, chatroomId: $chatroomId, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChatroomUserSubscriptionVariables,
  APITypes.OnUpdateChatroomUserSubscription
>;
export const onDeleteChatroomUser = /* GraphQL */ `subscription OnDeleteChatroomUser($id: ID, $chatroomId: ID, $userId: ID) {
  onDeleteChatroomUser(id: $id, chatroomId: $chatroomId, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChatroomUserSubscriptionVariables,
  APITypes.OnDeleteChatroomUserSubscription
>;
export const onCreateChatroomMessage = /* GraphQL */ `subscription OnCreateChatroomMessage(
  $id: ID
  $content: String
  $ownerId: ID
  $chatroomId: ID
  $createdAt: AWSDateTime
) {
  onCreateChatroomMessage(
    id: $id
    content: $content
    ownerId: $ownerId
    chatroomId: $chatroomId
    createdAt: $createdAt
  ) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChatroomMessageSubscriptionVariables,
  APITypes.OnCreateChatroomMessageSubscription
>;
export const onUpdateChatroomMessage = /* GraphQL */ `subscription OnUpdateChatroomMessage(
  $id: ID
  $content: String
  $ownerId: ID
  $chatroomId: ID
  $createdAt: AWSDateTime
) {
  onUpdateChatroomMessage(
    id: $id
    content: $content
    ownerId: $ownerId
    chatroomId: $chatroomId
    createdAt: $createdAt
  ) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChatroomMessageSubscriptionVariables,
  APITypes.OnUpdateChatroomMessageSubscription
>;
export const onDeleteChatroomMessage = /* GraphQL */ `subscription OnDeleteChatroomMessage(
  $id: ID
  $content: String
  $ownerId: ID
  $chatroomId: ID
  $createdAt: AWSDateTime
) {
  onDeleteChatroomMessage(
    id: $id
    content: $content
    ownerId: $ownerId
    chatroomId: $chatroomId
    createdAt: $createdAt
  ) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChatroomSubscriptionVariables,
  APITypes.OnDeleteChatroomSubscription
>;
