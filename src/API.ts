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
  createdAt?: string | null,
  updatedAt?: string | null,
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
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
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
  createdAt?: string | null,
  updatedAt?: string | null,
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
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteMobileLegendsCharacterInput = {
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
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
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
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
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
    createdAt?: string | null,
    updatedAt?: string | null,
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
    createdAt?: string | null,
    updatedAt?: string | null,
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
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
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
    createdAt?: string | null,
    updatedAt?: string | null,
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
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
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
    createdAt?: string | null,
    updatedAt?: string | null,
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
    createdAt?: string | null,
    updatedAt?: string | null,
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
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};
