/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMobileLegendsCharacterInput = {
  id?: string | null,
  name: string,
  alias?: string | null,
  gender?: string | null,
  role?: string | null,
  specialty?: string | null,
  lane?: string | null,
  region?: string | null,
  goldPrice?: number | null,
  ticketPrice?: number | null,
  diamondPrice?: number | null,
  year?: number | null,
  rangeType?: string | null,
  damageType?: string | null,
  resource?: string | null,
  hairColor?: string | null,
  species?: string | null,
};

export type ModelMobileLegendsCharacterConditionInput = {
  name?: ModelStringInput | null,
  alias?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  role?: ModelStringInput | null,
  specialty?: ModelStringInput | null,
  lane?: ModelStringInput | null,
  region?: ModelStringInput | null,
  goldPrice?: ModelIntInput | null,
  ticketPrice?: ModelIntInput | null,
  diamondPrice?: ModelIntInput | null,
  year?: ModelIntInput | null,
  rangeType?: ModelStringInput | null,
  damageType?: ModelStringInput | null,
  resource?: ModelStringInput | null,
  hairColor?: ModelStringInput | null,
  species?: ModelStringInput | null,
  and?: Array< ModelMobileLegendsCharacterConditionInput | null > | null,
  or?: Array< ModelMobileLegendsCharacterConditionInput | null > | null,
  not?: ModelMobileLegendsCharacterConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type MobileLegendsCharacter = {
  __typename: "MobileLegendsCharacter",
  id: string,
  name: string,
  alias?: string | null,
  gender?: string | null,
  role?: string | null,
  specialty?: string | null,
  lane?: string | null,
  region?: string | null,
  goldPrice?: number | null,
  ticketPrice?: number | null,
  diamondPrice?: number | null,
  year?: number | null,
  rangeType?: string | null,
  damageType?: string | null,
  resource?: string | null,
  hairColor?: string | null,
  species?: string | null,
  imageUrl?: Array< string | null > | null,
};

export type UpdateMobileLegendsCharacterInput = {
  id: string,
  name?: string | null,
  alias?: string | null,
  gender?: string | null,
  role?: string | null,
  specialty?: string | null,
  lane?: string | null,
  region?: string | null,
  goldPrice?: number | null,
  ticketPrice?: number | null,
  diamondPrice?: number | null,
  year?: number | null,
  rangeType?: string | null,
  damageType?: string | null,
  resource?: string | null,
  hairColor?: string | null,
  species?: string | null,
};

export type DeleteMobileLegendsCharacterInput = {
  id: string,
};

export type CreateUserInput = {
  username?: string | null,
  ttl: number,
};

export type User = {
  __typename: "User",
  id: string,
  username?: string | null,
  chatrooms?:  Array<ChatroomUser | null > | null,
  ttl: number,
};

export type ChatroomUser = {
  __typename: "ChatroomUser",
  id: string,
  chatroomId: string,
  userId: string,
  user?: User | null,
  chatroom?: Chatroom | null,
  ttl: number,
};

export type Chatroom = {
  __typename: "Chatroom",
  id: string,
  name: string,
  code: string,
  messages?:  Array<ChatroomMessage | null > | null,
  users?:  Array<ChatroomUser | null > | null,
  ttl: number,
};

export type ChatroomMessage = {
  __typename: "ChatroomMessage",
  id: string,
  content: string,
  owner?: ChatroomUser | null,
  ownerId: string,
  chatroom?: Chatroom | null,
  chatroomId: string,
  createdAt: string,
  ttl: number,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  ttl?: number | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateChatroomUserInput = {
  chatroomId: string,
  userId: string,
  ttl: number,
};

export type UpdateChatroomUserInput = {
  id: string,
  chatroomId?: string | null,
  userId?: string | null,
  ttl?: number | null,
};

export type DeleteChatroomUserInput = {
  id: string,
};

export type CreateChatroomMessageInput = {
  content: string,
  chatroomId: string,
  ownerId: string,
  createdAt: string,
  ttl: number,
};

export type UpdateChatroomMessageInput = {
  id: string,
  content?: string | null,
  chatroomId?: string | null,
  ownerId?: string | null,
  createdAt?: string | null,
  ttl?: number | null,
};

export type DeleteChatroomMessageInput = {
  id: string,
};

export type CreateChatroomInput = {
  name: string,
  ttl: number,
};

export type UpdateChatroomInput = {
  id: string,
  name?: string | null,
  ttl?: number | null,
  code?: string | null,
};

export type DeleteChatroomInput = {
  id: string,
};

export type ModelMobileLegendsCharacterFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  alias?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  role?: ModelStringInput | null,
  specialty?: ModelStringInput | null,
  lane?: ModelStringInput | null,
  region?: ModelStringInput | null,
  goldPrice?: ModelIntInput | null,
  ticketPrice?: ModelIntInput | null,
  diamondPrice?: ModelIntInput | null,
  year?: ModelIntInput | null,
  rangeType?: ModelStringInput | null,
  damageType?: ModelStringInput | null,
  resource?: ModelStringInput | null,
  hairColor?: ModelStringInput | null,
  species?: ModelStringInput | null,
  and?: Array< ModelMobileLegendsCharacterFilterInput | null > | null,
  or?: Array< ModelMobileLegendsCharacterFilterInput | null > | null,
  not?: ModelMobileLegendsCharacterFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelMobileLegendsCharacterConnection = {
  __typename: "ModelMobileLegendsCharacterConnection",
  items:  Array<MobileLegendsCharacter | null >,
  nextToken?: string | null,
};

export type TableUserFilterInput = {
  id?: TableIDFilterInput | null,
  username?: TableStringFilterInput | null,
};

export type TableIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  size?: ModelSizeInput | null,
};

export type TableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  size?: ModelSizeInput | null,
};

export type UserConnection = {
  __typename: "UserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type TableChatroomUserFilterInput = {
  id?: TableIDFilterInput | null,
  chatroomId?: TableIDFilterInput | null,
  userId?: TableIDFilterInput | null,
};

export type ChatroomUserConnection = {
  __typename: "ChatroomUserConnection",
  items?:  Array<ChatroomUser | null > | null,
  nextToken?: string | null,
};

export type TableChatroomMessageFilterInput = {
  id?: TableIDFilterInput | null,
  content?: TableStringFilterInput | null,
  ownerId?: TableIDFilterInput | null,
  chatroomId?: TableIDFilterInput | null,
  createdAt?: TableStringFilterInput | null,
};

export type ChatroomMessageConnection = {
  __typename: "ChatroomMessageConnection",
  items?:  Array<ChatroomMessage | null > | null,
  nextToken?: string | null,
};

export type TableChatroomFilterInput = {
  id?: TableIDFilterInput | null,
  name?: TableStringFilterInput | null,
  code?: TableStringFilterInput | null,
};

export type ChatroomConnection = {
  __typename: "ChatroomConnection",
  items?:  Array<Chatroom | null > | null,
  nextToken?: string | null,
};

export type ModelSubscriptionMobileLegendsCharacterFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  alias?: ModelSubscriptionStringInput | null,
  gender?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  specialty?: ModelSubscriptionStringInput | null,
  lane?: ModelSubscriptionStringInput | null,
  region?: ModelSubscriptionStringInput | null,
  goldPrice?: ModelSubscriptionIntInput | null,
  ticketPrice?: ModelSubscriptionIntInput | null,
  diamondPrice?: ModelSubscriptionIntInput | null,
  year?: ModelSubscriptionIntInput | null,
  rangeType?: ModelSubscriptionStringInput | null,
  damageType?: ModelSubscriptionStringInput | null,
  resource?: ModelSubscriptionStringInput | null,
  hairColor?: ModelSubscriptionStringInput | null,
  species?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMobileLegendsCharacterFilterInput | null > | null,
  or?: Array< ModelSubscriptionMobileLegendsCharacterFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateMobileLegendsCharacterMutationVariables = {
  input: CreateMobileLegendsCharacterInput,
  condition?: ModelMobileLegendsCharacterConditionInput | null,
};

export type CreateMobileLegendsCharacterMutation = {
  createMobileLegendsCharacter?:  {
    __typename: "MobileLegendsCharacter",
    id: string,
    name: string,
    alias?: string | null,
    gender?: string | null,
    role?: string | null,
    specialty?: string | null,
    lane?: string | null,
    region?: string | null,
    goldPrice?: number | null,
    ticketPrice?: number | null,
    diamondPrice?: number | null,
    year?: number | null,
    rangeType?: string | null,
    damageType?: string | null,
    resource?: string | null,
    hairColor?: string | null,
    species?: string | null,
    imageUrl?: Array< string | null > | null,
  } | null,
};

export type UpdateMobileLegendsCharacterMutationVariables = {
  input: UpdateMobileLegendsCharacterInput,
  condition?: ModelMobileLegendsCharacterConditionInput | null,
};

export type UpdateMobileLegendsCharacterMutation = {
  updateMobileLegendsCharacter?:  {
    __typename: "MobileLegendsCharacter",
    id: string,
    name: string,
    alias?: string | null,
    gender?: string | null,
    role?: string | null,
    specialty?: string | null,
    lane?: string | null,
    region?: string | null,
    goldPrice?: number | null,
    ticketPrice?: number | null,
    diamondPrice?: number | null,
    year?: number | null,
    rangeType?: string | null,
    damageType?: string | null,
    resource?: string | null,
    hairColor?: string | null,
    species?: string | null,
    imageUrl?: Array< string | null > | null,
  } | null,
};

export type DeleteMobileLegendsCharacterMutationVariables = {
  input: DeleteMobileLegendsCharacterInput,
  condition?: ModelMobileLegendsCharacterConditionInput | null,
};

export type DeleteMobileLegendsCharacterMutation = {
  deleteMobileLegendsCharacter?:  {
    __typename: "MobileLegendsCharacter",
    id: string,
    name: string,
    alias?: string | null,
    gender?: string | null,
    role?: string | null,
    specialty?: string | null,
    lane?: string | null,
    region?: string | null,
    goldPrice?: number | null,
    ticketPrice?: number | null,
    diamondPrice?: number | null,
    year?: number | null,
    rangeType?: string | null,
    damageType?: string | null,
    resource?: string | null,
    hairColor?: string | null,
    species?: string | null,
    imageUrl?: Array< string | null > | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username?: string | null,
    chatrooms?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username?: string | null,
    chatrooms?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username?: string | null,
    chatrooms?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type CreateChatroomUserMutationVariables = {
  input: CreateChatroomUserInput,
};

export type CreateChatroomUserMutation = {
  createChatroomUser?:  {
    __typename: "ChatroomUser",
    id: string,
    chatroomId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username?: string | null,
      chatrooms?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    ttl: number,
  } | null,
};

export type UpdateChatroomUserMutationVariables = {
  input: UpdateChatroomUserInput,
};

export type UpdateChatroomUserMutation = {
  updateChatroomUser?:  {
    __typename: "ChatroomUser",
    id: string,
    chatroomId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username?: string | null,
      chatrooms?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    ttl: number,
  } | null,
};

export type DeleteChatroomUserMutationVariables = {
  input: DeleteChatroomUserInput,
};

export type DeleteChatroomUserMutation = {
  deleteChatroomUser?:  {
    __typename: "ChatroomUser",
    id: string,
    chatroomId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username?: string | null,
      chatrooms?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    ttl: number,
  } | null,
};

export type CreateChatroomMessageMutationVariables = {
  input: CreateChatroomMessageInput,
};

export type CreateChatroomMessageMutation = {
  createChatroomMessage?:  {
    __typename: "ChatroomMessage",
    id: string,
    content: string,
    owner?:  {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null,
    ownerId: string,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroomId: string,
    createdAt: string,
    ttl: number,
  } | null,
};

export type UpdateChatroomMessageMutationVariables = {
  input: UpdateChatroomMessageInput,
};

export type UpdateChatroomMessageMutation = {
  updateChatroomMessage?:  {
    __typename: "ChatroomMessage",
    id: string,
    content: string,
    owner?:  {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null,
    ownerId: string,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroomId: string,
    createdAt: string,
    ttl: number,
  } | null,
};

export type DeleteChatroomMessageMutationVariables = {
  input: DeleteChatroomMessageInput,
};

export type DeleteChatroomMessageMutation = {
  deleteChatroomMessage?:  {
    __typename: "ChatroomMessage",
    id: string,
    content: string,
    owner?:  {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null,
    ownerId: string,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroomId: string,
    createdAt: string,
    ttl: number,
  } | null,
};

export type CreateChatroomMutationVariables = {
  input: CreateChatroomInput,
};

export type CreateChatroomMutation = {
  createChatroom?:  {
    __typename: "Chatroom",
    id: string,
    name: string,
    code: string,
    messages?:  Array< {
      __typename: "ChatroomMessage",
      id: string,
      content: string,
      owner?:  {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null,
      ownerId: string,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      chatroomId: string,
      createdAt: string,
      ttl: number,
    } | null > | null,
    users?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type UpdateChatroomMutationVariables = {
  input: UpdateChatroomInput,
};

export type UpdateChatroomMutation = {
  updateChatroom?:  {
    __typename: "Chatroom",
    id: string,
    name: string,
    code: string,
    messages?:  Array< {
      __typename: "ChatroomMessage",
      id: string,
      content: string,
      owner?:  {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null,
      ownerId: string,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      chatroomId: string,
      createdAt: string,
      ttl: number,
    } | null > | null,
    users?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type DeleteChatroomMutationVariables = {
  input: DeleteChatroomInput,
};

export type DeleteChatroomMutation = {
  deleteChatroom?:  {
    __typename: "Chatroom",
    id: string,
    name: string,
    code: string,
    messages?:  Array< {
      __typename: "ChatroomMessage",
      id: string,
      content: string,
      owner?:  {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null,
      ownerId: string,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      chatroomId: string,
      createdAt: string,
      ttl: number,
    } | null > | null,
    users?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type GenerateUniqueChatroomCodeQueryVariables = {
};

export type GenerateUniqueChatroomCodeQuery = {
  generateUniqueChatroomCode: string,
};

export type GetMobileLegendsCharacterQueryVariables = {
  id: string,
};

export type GetMobileLegendsCharacterQuery = {
  getMobileLegendsCharacter?:  {
    __typename: "MobileLegendsCharacter",
    id: string,
    name: string,
    alias?: string | null,
    gender?: string | null,
    role?: string | null,
    specialty?: string | null,
    lane?: string | null,
    region?: string | null,
    goldPrice?: number | null,
    ticketPrice?: number | null,
    diamondPrice?: number | null,
    year?: number | null,
    rangeType?: string | null,
    damageType?: string | null,
    resource?: string | null,
    hairColor?: string | null,
    species?: string | null,
    imageUrl?: Array< string | null > | null,
  } | null,
};

export type ListMobileLegendsCharactersQueryVariables = {
  filter?: ModelMobileLegendsCharacterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMobileLegendsCharactersQuery = {
  listMobileLegendsCharacters?:  {
    __typename: "ModelMobileLegendsCharacterConnection",
    items:  Array< {
      __typename: "MobileLegendsCharacter",
      id: string,
      name: string,
      alias?: string | null,
      gender?: string | null,
      role?: string | null,
      specialty?: string | null,
      lane?: string | null,
      region?: string | null,
      goldPrice?: number | null,
      ticketPrice?: number | null,
      diamondPrice?: number | null,
      year?: number | null,
      rangeType?: string | null,
      damageType?: string | null,
      resource?: string | null,
      hairColor?: string | null,
      species?: string | null,
      imageUrl?: Array< string | null > | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username?: string | null,
    chatrooms?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: TableUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "UserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      username?: string | null,
      chatrooms?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetChatroomUserQueryVariables = {
  id: string,
};

export type GetChatroomUserQuery = {
  getChatroomUser?:  {
    __typename: "ChatroomUser",
    id: string,
    chatroomId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username?: string | null,
      chatrooms?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    ttl: number,
  } | null,
};

export type ListChatroomUsersQueryVariables = {
  filter?: TableChatroomUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatroomUsersQuery = {
  listChatroomUsers?:  {
    __typename: "ChatroomUserConnection",
    items?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetChatroomMessageQueryVariables = {
  id: string,
};

export type GetChatroomMessageQuery = {
  getChatroomMessage?:  {
    __typename: "ChatroomMessage",
    id: string,
    content: string,
    owner?:  {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null,
    ownerId: string,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroomId: string,
    createdAt: string,
    ttl: number,
  } | null,
};

export type ListChatroomMessagesQueryVariables = {
  filter?: TableChatroomMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatroomMessagesQuery = {
  listChatroomMessages?:  {
    __typename: "ChatroomMessageConnection",
    items?:  Array< {
      __typename: "ChatroomMessage",
      id: string,
      content: string,
      owner?:  {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null,
      ownerId: string,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      chatroomId: string,
      createdAt: string,
      ttl: number,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetChatroomByCodeQueryVariables = {
  code: string,
};

export type GetChatroomByCodeQuery = {
  getChatroomByCode?:  {
    __typename: "Chatroom",
    id: string,
    name: string,
    code: string,
    messages?:  Array< {
      __typename: "ChatroomMessage",
      id: string,
      content: string,
      owner?:  {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null,
      ownerId: string,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      chatroomId: string,
      createdAt: string,
      ttl: number,
    } | null > | null,
    users?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type GetChatroomQueryVariables = {
  id: string,
};

export type GetChatroomQuery = {
  getChatroom?:  {
    __typename: "Chatroom",
    id: string,
    name: string,
    code: string,
    messages?:  Array< {
      __typename: "ChatroomMessage",
      id: string,
      content: string,
      owner?:  {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null,
      ownerId: string,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      chatroomId: string,
      createdAt: string,
      ttl: number,
    } | null > | null,
    users?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type ListChatroomsQueryVariables = {
  filter?: TableChatroomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatroomsQuery = {
  listChatrooms?:  {
    __typename: "ChatroomConnection",
    items?:  Array< {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMobileLegendsCharacterSubscriptionVariables = {
  filter?: ModelSubscriptionMobileLegendsCharacterFilterInput | null,
};

export type OnCreateMobileLegendsCharacterSubscription = {
  onCreateMobileLegendsCharacter?:  {
    __typename: "MobileLegendsCharacter",
    id: string,
    name: string,
    alias?: string | null,
    gender?: string | null,
    role?: string | null,
    specialty?: string | null,
    lane?: string | null,
    region?: string | null,
    goldPrice?: number | null,
    ticketPrice?: number | null,
    diamondPrice?: number | null,
    year?: number | null,
    rangeType?: string | null,
    damageType?: string | null,
    resource?: string | null,
    hairColor?: string | null,
    species?: string | null,
    imageUrl?: Array< string | null > | null,
  } | null,
};

export type OnUpdateMobileLegendsCharacterSubscriptionVariables = {
  filter?: ModelSubscriptionMobileLegendsCharacterFilterInput | null,
};

export type OnUpdateMobileLegendsCharacterSubscription = {
  onUpdateMobileLegendsCharacter?:  {
    __typename: "MobileLegendsCharacter",
    id: string,
    name: string,
    alias?: string | null,
    gender?: string | null,
    role?: string | null,
    specialty?: string | null,
    lane?: string | null,
    region?: string | null,
    goldPrice?: number | null,
    ticketPrice?: number | null,
    diamondPrice?: number | null,
    year?: number | null,
    rangeType?: string | null,
    damageType?: string | null,
    resource?: string | null,
    hairColor?: string | null,
    species?: string | null,
    imageUrl?: Array< string | null > | null,
  } | null,
};

export type OnDeleteMobileLegendsCharacterSubscriptionVariables = {
  filter?: ModelSubscriptionMobileLegendsCharacterFilterInput | null,
};

export type OnDeleteMobileLegendsCharacterSubscription = {
  onDeleteMobileLegendsCharacter?:  {
    __typename: "MobileLegendsCharacter",
    id: string,
    name: string,
    alias?: string | null,
    gender?: string | null,
    role?: string | null,
    specialty?: string | null,
    lane?: string | null,
    region?: string | null,
    goldPrice?: number | null,
    ticketPrice?: number | null,
    diamondPrice?: number | null,
    year?: number | null,
    rangeType?: string | null,
    damageType?: string | null,
    resource?: string | null,
    hairColor?: string | null,
    species?: string | null,
    imageUrl?: Array< string | null > | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  id?: string | null,
  username?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username?: string | null,
    chatrooms?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  id?: string | null,
  username?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username?: string | null,
    chatrooms?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  id?: string | null,
  username?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username?: string | null,
    chatrooms?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type OnCreateChatroomUserSubscriptionVariables = {
  id?: string | null,
  chatroomId?: string | null,
  userId?: string | null,
};

export type OnCreateChatroomUserSubscription = {
  onCreateChatroomUser?:  {
    __typename: "ChatroomUser",
    id: string,
    chatroomId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username?: string | null,
      chatrooms?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    ttl: number,
  } | null,
};

export type OnUpdateChatroomUserSubscriptionVariables = {
  id?: string | null,
  chatroomId?: string | null,
  userId?: string | null,
};

export type OnUpdateChatroomUserSubscription = {
  onUpdateChatroomUser?:  {
    __typename: "ChatroomUser",
    id: string,
    chatroomId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username?: string | null,
      chatrooms?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    ttl: number,
  } | null,
};

export type OnDeleteChatroomUserSubscriptionVariables = {
  id?: string | null,
  chatroomId?: string | null,
  userId?: string | null,
};

export type OnDeleteChatroomUserSubscription = {
  onDeleteChatroomUser?:  {
    __typename: "ChatroomUser",
    id: string,
    chatroomId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username?: string | null,
      chatrooms?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    ttl: number,
  } | null,
};

export type OnCreateChatroomMessageSubscriptionVariables = {
  id?: string | null,
  content?: string | null,
  ownerId?: string | null,
  chatroomId?: string | null,
  createdAt?: string | null,
};

export type OnCreateChatroomMessageSubscription = {
  onCreateChatroomMessage?:  {
    __typename: "ChatroomMessage",
    id: string,
    content: string,
    owner?:  {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null,
    ownerId: string,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroomId: string,
    createdAt: string,
    ttl: number,
  } | null,
};

export type OnUpdateChatroomMessageSubscriptionVariables = {
  id?: string | null,
  content?: string | null,
  ownerId?: string | null,
  chatroomId?: string | null,
  createdAt?: string | null,
};

export type OnUpdateChatroomMessageSubscription = {
  onUpdateChatroomMessage?:  {
    __typename: "ChatroomMessage",
    id: string,
    content: string,
    owner?:  {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null,
    ownerId: string,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroomId: string,
    createdAt: string,
    ttl: number,
  } | null,
};

export type OnDeleteChatroomMessageSubscriptionVariables = {
  id?: string | null,
  content?: string | null,
  ownerId?: string | null,
  chatroomId?: string | null,
  createdAt?: string | null,
};

export type OnDeleteChatroomMessageSubscription = {
  onDeleteChatroomMessage?:  {
    __typename: "ChatroomMessage",
    id: string,
    content: string,
    owner?:  {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null,
    ownerId: string,
    chatroom?:  {
      __typename: "Chatroom",
      id: string,
      name: string,
      code: string,
      messages?:  Array< {
        __typename: "ChatroomMessage",
        id: string,
        content: string,
        ownerId: string,
        chatroomId: string,
        createdAt: string,
        ttl: number,
      } | null > | null,
      users?:  Array< {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null > | null,
      ttl: number,
    } | null,
    chatroomId: string,
    createdAt: string,
    ttl: number,
  } | null,
};

export type OnCreateChatroomSubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  code?: string | null,
};

export type OnCreateChatroomSubscription = {
  onCreateChatroom?:  {
    __typename: "Chatroom",
    id: string,
    name: string,
    code: string,
    messages?:  Array< {
      __typename: "ChatroomMessage",
      id: string,
      content: string,
      owner?:  {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null,
      ownerId: string,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      chatroomId: string,
      createdAt: string,
      ttl: number,
    } | null > | null,
    users?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type OnUpdateChatroomSubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  code?: string | null,
};

export type OnUpdateChatroomSubscription = {
  onUpdateChatroom?:  {
    __typename: "Chatroom",
    id: string,
    name: string,
    code: string,
    messages?:  Array< {
      __typename: "ChatroomMessage",
      id: string,
      content: string,
      owner?:  {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null,
      ownerId: string,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      chatroomId: string,
      createdAt: string,
      ttl: number,
    } | null > | null,
    users?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};

export type OnDeleteChatroomSubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  code?: string | null,
};

export type OnDeleteChatroomSubscription = {
  onDeleteChatroom?:  {
    __typename: "Chatroom",
    id: string,
    name: string,
    code: string,
    messages?:  Array< {
      __typename: "ChatroomMessage",
      id: string,
      content: string,
      owner?:  {
        __typename: "ChatroomUser",
        id: string,
        chatroomId: string,
        userId: string,
        ttl: number,
      } | null,
      ownerId: string,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      chatroomId: string,
      createdAt: string,
      ttl: number,
    } | null > | null,
    users?:  Array< {
      __typename: "ChatroomUser",
      id: string,
      chatroomId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username?: string | null,
        ttl: number,
      } | null,
      chatroom?:  {
        __typename: "Chatroom",
        id: string,
        name: string,
        code: string,
        ttl: number,
      } | null,
      ttl: number,
    } | null > | null,
    ttl: number,
  } | null,
};
