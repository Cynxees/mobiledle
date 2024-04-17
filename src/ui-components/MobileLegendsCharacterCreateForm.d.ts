/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MobileLegendsCharacterCreateFormInputValues = {
    name?: string;
    alias?: string;
    gender?: string;
    role?: string;
    specialty?: string;
    lane?: string;
    region?: string;
    goldPrice?: number;
    ticketPrice?: number;
    diamondPrice?: number;
    year?: number;
};
export declare type MobileLegendsCharacterCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    alias?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    role?: ValidationFunction<string>;
    specialty?: ValidationFunction<string>;
    lane?: ValidationFunction<string>;
    region?: ValidationFunction<string>;
    goldPrice?: ValidationFunction<number>;
    ticketPrice?: ValidationFunction<number>;
    diamondPrice?: ValidationFunction<number>;
    year?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MobileLegendsCharacterCreateFormOverridesProps = {
    MobileLegendsCharacterCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    alias?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    role?: PrimitiveOverrideProps<TextFieldProps>;
    specialty?: PrimitiveOverrideProps<TextFieldProps>;
    lane?: PrimitiveOverrideProps<TextFieldProps>;
    region?: PrimitiveOverrideProps<TextFieldProps>;
    goldPrice?: PrimitiveOverrideProps<TextFieldProps>;
    ticketPrice?: PrimitiveOverrideProps<TextFieldProps>;
    diamondPrice?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MobileLegendsCharacterCreateFormProps = React.PropsWithChildren<{
    overrides?: MobileLegendsCharacterCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MobileLegendsCharacterCreateFormInputValues) => MobileLegendsCharacterCreateFormInputValues;
    onSuccess?: (fields: MobileLegendsCharacterCreateFormInputValues) => void;
    onError?: (fields: MobileLegendsCharacterCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MobileLegendsCharacterCreateFormInputValues) => MobileLegendsCharacterCreateFormInputValues;
    onValidate?: MobileLegendsCharacterCreateFormValidationValues;
} & React.CSSProperties>;
export default function MobileLegendsCharacterCreateForm(props: MobileLegendsCharacterCreateFormProps): React.ReactElement;
