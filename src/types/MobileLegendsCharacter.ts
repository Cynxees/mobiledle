export class MobileLegendsCharacter {


    constructor(id : String, name:String, alias:String, gender:String, role:String, specialty:String, 
        lane:String, year:Number, region:String, goldPrice:Number, diamondPrice:Number, ticketPrice:Number,
        rangeType:String, resource:String, hairColor:String){

        this.id = id;
        this.name = name;
        this.alias = alias;
        this.gender = gender;
        this.role = role;
        this.specialty = specialty;
        this.lane = lane
        this.year = year;
        this.region = region;
        this.goldPrice = goldPrice;
        this.diamondPrice = diamondPrice;
        this.ticketPrice = ticketPrice;
        this.rangeType = rangeType;
        this.resource = resource;
        this.hairColor = hairColor;
    }

    id: String = "0";
    name: String = "default";
    alias: String = "defaultAlias";
    gender: String = "defaultGender";
    role: String = "defaultRole";
    specialty: String = "defaultSpecialty";
    lane: String = "defaultLane"
    year: Number = 0;
    region: String = "defaultRegion";
    goldPrice: Number = 0;
    diamondPrice: Number = 0;
    ticketPrice : Number = 0;


    rangeType: String = "defaultRangeType";
    resource: String = "defaultResource";
    hairColor: String = "defaultHairColor";
 
}
