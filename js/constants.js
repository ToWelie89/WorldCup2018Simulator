// Group A
const EGYPT = { name:'Egypt', flag: './assets/flags/Egypt.jpg' };
const RUSSIA = { name:'Russia', flag: './assets/flags/Russia.jpg' };
const SAUDI_ARABIA = { name:'Saudi Arabia', flag: './assets/flags/Saudi_Arabia.jpg' };
const URUGUAY = { name:'Uruguay', flag: './assets/flags/Uruguay.jpg' };
// Group B
const IRAN = { name:'Iran', flag: './assets/flags/Iran.jpg' };
const MOROCCO = { name:'Morroco', flag: './assets/flags/Morocco.jpg' };
const PORTUGAL = { name:'Portugal', flag: './assets/flags/Portugal.jpg' };
const SPAIN = { name:'Spain', flag: './assets/flags/Spain.jpg' };
// Group C
const AUSTRALIA = { name:'Australia', flag: './assets/flags/Australia.jpg' };
const DENMARK = { name:'Denmark', flag: './assets/flags/Denmark.jpg' };
const FRANCE = { name:'France', flag: './assets/flags/France.jpg' };
const PERU = { name:'Peru', flag: './assets/flags/Peru.jpg' };
// Group D
const ARGENTINA = { name:'Argentina', flag: './assets/flags/Argentina.jpg' };
const CROATIA = { name:'Croatia', flag: './assets/flags/Croatia.jpg' };
const ICELAND = { name:'Iceland', flag: './assets/flags/Iceland.jpg' };
const NIGERIA = { name:'Nigeria', flag: './assets/flags/Nigeria.jpg' };
// Group E
const BRAZIL = { name:'Brazil', flag: './assets/flags/Brazil.jpg' };
const COSTA_RICA = { name:'Costa Rica', flag: './assets/flags/Costa_Rica.jpg' };
const SWITZERLAND = { name:'Switzerland', flag: './assets/flags/Switzerland.jpg' };
const SERBIA = { name:'Serbia', flag: './assets/flags/Serbia.jpg' };
// Group F
const GERMANY = { name:'Germany', flag: './assets/flags/Germany.jpg' };
const KOREA_REPUBLIC = { name:'South Korea', flag: './assets/flags/South_Korea.jpg' };
const MEXICO = { name:'Mexico', flag: './assets/flags/Mexico.jpg' };
const SWEDEN = { name:'Sweden', flag: './assets/flags/Sweden.jpg' };
// Group G
const BELGIUM = { name:'Belgium', flag: './assets/flags/Belgium.jpg' };
const ENGLAND = { name:'England', flag: './assets/flags/England.jpg' };
const PANAMA = { name:'Panama', flag: './assets/flags/Panama.jpg' };
const TUNISIA = { name:'Tunisia', flag: './assets/flags/Tunisia.jpg' };
// Group H
const COLOMBIA = { name:'Colombia', flag: './assets/flags/Colombia.jpg' };
const JAPAN = { name:'Japan', flag: './assets/flags/Japan.jpg' };
const POLAND = { name:'Poland', flag: './assets/flags/Poland.jpg' };
const SENEGAL = { name:'Senegal', flag: './assets/flags/Senegal.jpg' };

const teams = [
    EGYPT,
    RUSSIA,
    SAUDI_ARABIA,
    URUGUAY,
    IRAN,
    MOROCCO,
    PORTUGAL,
    SPAIN,
    AUSTRALIA,
    DENMARK,
    FRANCE,
    PERU,
    ARGENTINA,
    CROATIA,
    ICELAND,
    NIGERIA,
    BRAZIL,
    COSTA_RICA,
    SWITZERLAND,
    SERBIA,
    GERMANY,
    KOREA_REPUBLIC,
    MEXICO,
    SWEDEN,
    BELGIUM,
    ENGLAND,
    PANAMA,
    TUNISIA,
    COLOMBIA,
    JAPAN,
    POLAND,
    SENEGAL
];

const groupNames = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
];

const TOTAL_NUMBER_OF_TEAMS = 32;
const NUMBER_OF_GROUPS = 8;
const TEAMS_PER_GROUP = 4;

const knockOutPhases = [16, 8, 4, 2];

const defaultColor = 'white';

export {
    teams,
    groupNames,
    TOTAL_NUMBER_OF_TEAMS,
    NUMBER_OF_GROUPS,
    TEAMS_PER_GROUP,
    knockOutPhases,
    defaultColor,
};