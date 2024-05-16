import { StorageImage } from "@aws-amplify/ui-react-storage";

export class MobileLegendsHero{
    __typename: "MobileLegendsHero"
    id: string
    name: string
    alias: string
    gender: string
    role: string
    specialty: string
    lane: string
    region: string
    goldPrice: number
    ticketPrice: number
    diamondPrice: number
    year: number
    rangeType: string
    damageType: string
    resource: string
    hairColor: string
    species: string
    imageKeys: {
        banners: string[]
        icons: string[]
        cards: string[]
        skills: string[]
        extras: string[]
    };


    constructor(id: string, name: string, alias: string, gender: string, role: string, specialty: string, lane: string, region: string, goldPrice: number, ticketPrice: number, diamondPrice: number, year: number, rangeType: string, damageType: string, resource: string, hairColor: string, species: string){
        this.__typename = "MobileLegendsHero";
        this.id = id;
        this.name = name;
        this.alias = alias;
        this.gender = gender;
        this.role = role;
        this.specialty = specialty;
        this.lane = lane;
        this.region = region;
        this.goldPrice = goldPrice;
        this.ticketPrice = ticketPrice;
        this.diamondPrice = diamondPrice;
        this.year = year;
        this.rangeType = rangeType;
        this.damageType = damageType;
        this.resource = resource;
        this.hairColor = hairColor;
        this.species = species;
        this.imageKeys = {
            banners: [],
            icons: [],
            cards: [],
            skills: [],
            extras: [],
        };
    }



};