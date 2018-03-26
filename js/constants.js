// Group A
const EGYPT = 'Egypt';
const RUSSIA = 'Russia';
const SAUDI_ARABIA = 'Saudi Arabia';
const URUGUAY = 'Uruguay';
// Group B
const IRAN = 'Iran';
const MOROCCO = 'Morocco';
const PORTUGAL = 'Portugal';
const SPAIN = 'Spain';
// Group C
const AUSTRALIA = 'Australia';
const DENMARK = 'Denmark';
const FRANCE = 'France';
const PERU = 'Peru';
// Group D
const ARGENTINA = 'Argentina';
const CROATIA = 'Croatia';
const ICELAND = 'Iceland';
const NIGERIA = 'Nigeria';
// Group E
const BRAZIL = 'Brazil';
const COSTA_RICA = 'Costa Rica';
const SWITZERLAND = 'Switzerland';
const SERBIA = 'Serbia';
// Group F
const GERMANY = 'Germany';
const KOREA_REPUBLIC = 'Korea Republic';
const MEXICO = 'Mexico';
const SWEDEN = 'Sweden';
// Group G
const BELGIUM = 'Belgium';
const ENGLAND = 'England';
const PANAMA = 'Panama';
const TUNISIA = 'Tunisia';
// Group H
const COLOMBIA = 'Colombia';
const JAPAN = 'Japan';
const POLAND = 'Poland';
const SENEGAL = 'Senegal';

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

const validColor = '#99CC00';
const invalidColor = '#B84325';
const defaultColor = 'white';

const rootPath = 'http://martino2.duckdns.org/pi/index.php';
const directoryRootPath = 'http://martino2.duckdns.org/pi/WC2014/';

export {
    teams,
    groupNames,
    TOTAL_NUMBER_OF_TEAMS,
    NUMBER_OF_GROUPS,
    TEAMS_PER_GROUP,
    knockOutPhases,
    validColor,
    invalidColor,
    defaultColor,
    rootPath,
    directoryRootPath
};