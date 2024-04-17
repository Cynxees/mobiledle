/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getMobileLegendsCharacter } from "../graphql/queries";
import { updateMobileLegendsCharacter } from "../graphql/mutations";
const client = generateClient();
export default function MobileLegendsCharacterUpdateForm(props) {
  const {
    id: idProp,
    mobileLegendsCharacter: mobileLegendsCharacterModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    alias: "",
    gender: "",
    role: "",
    specialty: "",
    lane: "",
    region: "",
    goldPrice: "",
    ticketPrice: "",
    diamondPrice: "",
    year: "",
    rangeType: "",
    damageType: "",
    resource: "",
    hairColor: "",
    species: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [alias, setAlias] = React.useState(initialValues.alias);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [role, setRole] = React.useState(initialValues.role);
  const [specialty, setSpecialty] = React.useState(initialValues.specialty);
  const [lane, setLane] = React.useState(initialValues.lane);
  const [region, setRegion] = React.useState(initialValues.region);
  const [goldPrice, setGoldPrice] = React.useState(initialValues.goldPrice);
  const [ticketPrice, setTicketPrice] = React.useState(
    initialValues.ticketPrice
  );
  const [diamondPrice, setDiamondPrice] = React.useState(
    initialValues.diamondPrice
  );
  const [year, setYear] = React.useState(initialValues.year);
  const [rangeType, setRangeType] = React.useState(initialValues.rangeType);
  const [damageType, setDamageType] = React.useState(initialValues.damageType);
  const [resource, setResource] = React.useState(initialValues.resource);
  const [hairColor, setHairColor] = React.useState(initialValues.hairColor);
  const [species, setSpecies] = React.useState(initialValues.species);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = mobileLegendsCharacterRecord
      ? { ...initialValues, ...mobileLegendsCharacterRecord }
      : initialValues;
    setName(cleanValues.name);
    setAlias(cleanValues.alias);
    setGender(cleanValues.gender);
    setRole(cleanValues.role);
    setSpecialty(cleanValues.specialty);
    setLane(cleanValues.lane);
    setRegion(cleanValues.region);
    setGoldPrice(cleanValues.goldPrice);
    setTicketPrice(cleanValues.ticketPrice);
    setDiamondPrice(cleanValues.diamondPrice);
    setYear(cleanValues.year);
    setRangeType(cleanValues.rangeType);
    setDamageType(cleanValues.damageType);
    setResource(cleanValues.resource);
    setHairColor(cleanValues.hairColor);
    setSpecies(cleanValues.species);
    setErrors({});
  };
  const [mobileLegendsCharacterRecord, setMobileLegendsCharacterRecord] =
    React.useState(mobileLegendsCharacterModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMobileLegendsCharacter.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMobileLegendsCharacter
        : mobileLegendsCharacterModelProp;
      setMobileLegendsCharacterRecord(record);
    };
    queryData();
  }, [idProp, mobileLegendsCharacterModelProp]);
  React.useEffect(resetStateValues, [mobileLegendsCharacterRecord]);
  const validations = {
    name: [{ type: "Required" }],
    alias: [],
    gender: [],
    role: [],
    specialty: [],
    lane: [],
    region: [],
    goldPrice: [],
    ticketPrice: [],
    diamondPrice: [],
    year: [],
    rangeType: [],
    damageType: [],
    resource: [],
    hairColor: [],
    species: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          alias: alias ?? null,
          gender: gender ?? null,
          role: role ?? null,
          specialty: specialty ?? null,
          lane: lane ?? null,
          region: region ?? null,
          goldPrice: goldPrice ?? null,
          ticketPrice: ticketPrice ?? null,
          diamondPrice: diamondPrice ?? null,
          year: year ?? null,
          rangeType: rangeType ?? null,
          damageType: damageType ?? null,
          resource: resource ?? null,
          hairColor: hairColor ?? null,
          species: species ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateMobileLegendsCharacter.replaceAll("__typename", ""),
            variables: {
              input: {
                id: mobileLegendsCharacterRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MobileLegendsCharacterUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              alias,
              gender,
              role,
              specialty,
              lane,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year,
              rangeType,
              damageType,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Alias"
        isRequired={false}
        isReadOnly={false}
        value={alias}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              alias: value,
              gender,
              role,
              specialty,
              lane,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year,
              rangeType,
              damageType,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.alias ?? value;
          }
          if (errors.alias?.hasError) {
            runValidationTasks("alias", value);
          }
          setAlias(value);
        }}
        onBlur={() => runValidationTasks("alias", alias)}
        errorMessage={errors.alias?.errorMessage}
        hasError={errors.alias?.hasError}
        {...getOverrideProps(overrides, "alias")}
      ></TextField>
      <TextField
        label="Gender"
        isRequired={false}
        isReadOnly={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender: value,
              role,
              specialty,
              lane,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year,
              rangeType,
              damageType,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      ></TextField>
      <TextField
        label="Role"
        isRequired={false}
        isReadOnly={false}
        value={role}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role: value,
              specialty,
              lane,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year,
              rangeType,
              damageType,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.role ?? value;
          }
          if (errors.role?.hasError) {
            runValidationTasks("role", value);
          }
          setRole(value);
        }}
        onBlur={() => runValidationTasks("role", role)}
        errorMessage={errors.role?.errorMessage}
        hasError={errors.role?.hasError}
        {...getOverrideProps(overrides, "role")}
      ></TextField>
      <TextField
        label="Specialty"
        isRequired={false}
        isReadOnly={false}
        value={specialty}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role,
              specialty: value,
              lane,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year,
              rangeType,
              damageType,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.specialty ?? value;
          }
          if (errors.specialty?.hasError) {
            runValidationTasks("specialty", value);
          }
          setSpecialty(value);
        }}
        onBlur={() => runValidationTasks("specialty", specialty)}
        errorMessage={errors.specialty?.errorMessage}
        hasError={errors.specialty?.hasError}
        {...getOverrideProps(overrides, "specialty")}
      ></TextField>
      <TextField
        label="Lane"
        isRequired={false}
        isReadOnly={false}
        value={lane}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role,
              specialty,
              lane: value,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year,
              rangeType,
              damageType,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.lane ?? value;
          }
          if (errors.lane?.hasError) {
            runValidationTasks("lane", value);
          }
          setLane(value);
        }}
        onBlur={() => runValidationTasks("lane", lane)}
        errorMessage={errors.lane?.errorMessage}
        hasError={errors.lane?.hasError}
        {...getOverrideProps(overrides, "lane")}
      ></TextField>
      <TextField
        label="Region"
        isRequired={false}
        isReadOnly={false}
        value={region}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role,
              specialty,
              lane,
              region: value,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year,
              rangeType,
              damageType,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.region ?? value;
          }
          if (errors.region?.hasError) {
            runValidationTasks("region", value);
          }
          setRegion(value);
        }}
        onBlur={() => runValidationTasks("region", region)}
        errorMessage={errors.region?.errorMessage}
        hasError={errors.region?.hasError}
        {...getOverrideProps(overrides, "region")}
      ></TextField>
      <TextField
        label="Gold price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={goldPrice}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role,
              specialty,
              lane,
              region,
              goldPrice: value,
              ticketPrice,
              diamondPrice,
              year,
              rangeType,
              damageType,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.goldPrice ?? value;
          }
          if (errors.goldPrice?.hasError) {
            runValidationTasks("goldPrice", value);
          }
          setGoldPrice(value);
        }}
        onBlur={() => runValidationTasks("goldPrice", goldPrice)}
        errorMessage={errors.goldPrice?.errorMessage}
        hasError={errors.goldPrice?.hasError}
        {...getOverrideProps(overrides, "goldPrice")}
      ></TextField>
      <TextField
        label="Ticket price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={ticketPrice}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role,
              specialty,
              lane,
              region,
              goldPrice,
              ticketPrice: value,
              diamondPrice,
              year,
              rangeType,
              damageType,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.ticketPrice ?? value;
          }
          if (errors.ticketPrice?.hasError) {
            runValidationTasks("ticketPrice", value);
          }
          setTicketPrice(value);
        }}
        onBlur={() => runValidationTasks("ticketPrice", ticketPrice)}
        errorMessage={errors.ticketPrice?.errorMessage}
        hasError={errors.ticketPrice?.hasError}
        {...getOverrideProps(overrides, "ticketPrice")}
      ></TextField>
      <TextField
        label="Diamond price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={diamondPrice}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role,
              specialty,
              lane,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice: value,
              year,
              rangeType,
              damageType,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.diamondPrice ?? value;
          }
          if (errors.diamondPrice?.hasError) {
            runValidationTasks("diamondPrice", value);
          }
          setDiamondPrice(value);
        }}
        onBlur={() => runValidationTasks("diamondPrice", diamondPrice)}
        errorMessage={errors.diamondPrice?.errorMessage}
        hasError={errors.diamondPrice?.hasError}
        {...getOverrideProps(overrides, "diamondPrice")}
      ></TextField>
      <TextField
        label="Year"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={year}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role,
              specialty,
              lane,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year: value,
              rangeType,
              damageType,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.year ?? value;
          }
          if (errors.year?.hasError) {
            runValidationTasks("year", value);
          }
          setYear(value);
        }}
        onBlur={() => runValidationTasks("year", year)}
        errorMessage={errors.year?.errorMessage}
        hasError={errors.year?.hasError}
        {...getOverrideProps(overrides, "year")}
      ></TextField>
      <TextField
        label="Range type"
        isRequired={false}
        isReadOnly={false}
        value={rangeType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role,
              specialty,
              lane,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year,
              rangeType: value,
              damageType,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.rangeType ?? value;
          }
          if (errors.rangeType?.hasError) {
            runValidationTasks("rangeType", value);
          }
          setRangeType(value);
        }}
        onBlur={() => runValidationTasks("rangeType", rangeType)}
        errorMessage={errors.rangeType?.errorMessage}
        hasError={errors.rangeType?.hasError}
        {...getOverrideProps(overrides, "rangeType")}
      ></TextField>
      <TextField
        label="Damage type"
        isRequired={false}
        isReadOnly={false}
        value={damageType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role,
              specialty,
              lane,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year,
              rangeType,
              damageType: value,
              resource,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.damageType ?? value;
          }
          if (errors.damageType?.hasError) {
            runValidationTasks("damageType", value);
          }
          setDamageType(value);
        }}
        onBlur={() => runValidationTasks("damageType", damageType)}
        errorMessage={errors.damageType?.errorMessage}
        hasError={errors.damageType?.hasError}
        {...getOverrideProps(overrides, "damageType")}
      ></TextField>
      <TextField
        label="Resource"
        isRequired={false}
        isReadOnly={false}
        value={resource}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role,
              specialty,
              lane,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year,
              rangeType,
              damageType,
              resource: value,
              hairColor,
              species,
            };
            const result = onChange(modelFields);
            value = result?.resource ?? value;
          }
          if (errors.resource?.hasError) {
            runValidationTasks("resource", value);
          }
          setResource(value);
        }}
        onBlur={() => runValidationTasks("resource", resource)}
        errorMessage={errors.resource?.errorMessage}
        hasError={errors.resource?.hasError}
        {...getOverrideProps(overrides, "resource")}
      ></TextField>
      <TextField
        label="Hair color"
        isRequired={false}
        isReadOnly={false}
        value={hairColor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role,
              specialty,
              lane,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year,
              rangeType,
              damageType,
              resource,
              hairColor: value,
              species,
            };
            const result = onChange(modelFields);
            value = result?.hairColor ?? value;
          }
          if (errors.hairColor?.hasError) {
            runValidationTasks("hairColor", value);
          }
          setHairColor(value);
        }}
        onBlur={() => runValidationTasks("hairColor", hairColor)}
        errorMessage={errors.hairColor?.errorMessage}
        hasError={errors.hairColor?.hasError}
        {...getOverrideProps(overrides, "hairColor")}
      ></TextField>
      <TextField
        label="Species"
        isRequired={false}
        isReadOnly={false}
        value={species}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              alias,
              gender,
              role,
              specialty,
              lane,
              region,
              goldPrice,
              ticketPrice,
              diamondPrice,
              year,
              rangeType,
              damageType,
              resource,
              hairColor,
              species: value,
            };
            const result = onChange(modelFields);
            value = result?.species ?? value;
          }
          if (errors.species?.hasError) {
            runValidationTasks("species", value);
          }
          setSpecies(value);
        }}
        onBlur={() => runValidationTasks("species", species)}
        errorMessage={errors.species?.errorMessage}
        hasError={errors.species?.hasError}
        {...getOverrideProps(overrides, "species")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || mobileLegendsCharacterModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || mobileLegendsCharacterModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
