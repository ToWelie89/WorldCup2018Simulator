import {
    teams,
    groupNames,
    TOTAL_NUMBER_OF_TEAMS,
    NUMBER_OF_GROUPS,
    TEAMS_PER_GROUP,
    knockOutPhases,
    validColor,
    invalidColor,
    defaultColor,
    rootPath
} from './constants';

/*************************
    INITIALIZATION
*************************/

const data = {};
let idVariable;

$(document).ready(() => {
    initializeGroups();
    initializeGroupTables();
    initializeMatches();

    // Set listeners
    $('#randomizeGroupsButton').click((index, element) => randomize(false));
    $('#randomizeAllButton').click((index, element) => randomize(true));
    $('#clearButton').click(function() {
        window.location.replace(window.location.href.split('?')[0]);
    });
    $('.knockoutMatchScoreBox').keyup(knockoutPhaseKeyUp);

    $('#restartButton').click(function(){
        window.location.replace(window.location.href.split('?')[0]);
    });

    $('#closeModal').click(function() {
        $('#tournamentCompleteContainer').css('display', 'none');
        $('#overlay').css('opacity', '0');
        $('#overlay').css('display', 'none');
    });

    $('#copyToClipboardButton').click(function() {
        const text = $('#codeTextArea').val();
        $('#codeTextArea').select();
        document.execCommand('copy');
    });

    idVariable = getParameterValueByKey('id');

    if (idVariable && idVariable.length > 0){
        loadDataFromId(idVariable);
    }
});

const getParameterValueByKey = parameterName => {
    var pageURL = window.location.href;
    var parameters = pageURL.split('?')[1];

    if (parameters) {
        parameters = parameters.split('&');
        for (var i = 0, max = parameters.length; i < max; i++) {
            var paramPair = parameters[i].split('=');
            if (paramPair[0] === parameterName) {
                return paramPair[1];
            }
        }
    }

    return null;
}

const initializeGroups = () => {
    data.groups = new Array();
    for (let i = 0; i < teams.length; i++) {
        let currentGroup;
        if (i % TEAMS_PER_GROUP == 0) {
            currentGroup = {};
            currentGroup.name = groupNames[(i / TEAMS_PER_GROUP)];
            currentGroup.teams = [];
        }
        else {
            currentGroup = data.groups[data.groups.length - 1];
        }
        const team = {
            name: teams[i].name,
            flag: teams[i].flag,
            mp: 0,
            w: 0,
            d: 0,
            l: 0,
            f: 0,
            a: 0,
            diff: 0,
            p: 0
        };
        currentGroup.teams.push(team);
        if (i % TEAMS_PER_GROUP == 0) {
            data.groups.push(currentGroup);
        }
    }
}

const initializeGroupTables = () => {
    let htmlString = '<table width=\'100%\'>';
    for (let i = 0; i < data.groups.length; i++)
    {
        if (i == 0 || i == (NUMBER_OF_GROUPS / 2)) {
            htmlString += '<tr>';
        }
        htmlString += '<td>';
        htmlString += '<div class=\'groupContainer\' groupIndex=\''+i+'\'>';
        htmlString += '<table class=\'groupTable\'>';
        htmlString += '<tr>';
        htmlString += '<th id=\'groupIndexColumn\' align=\'left\'><p>#</p></th>';
        htmlString += '<th id=\'groupTeamColumn\' align=\'left\'><p>Team</p></th>';
        htmlString += '<th class=\'groupStatColumn\' align=\'center\'><p>MP</p></th>';
        htmlString += '<th class=\'groupStatColumn\' align=\'center\'><p>W</p></th>';
        htmlString += '<th class=\'groupStatColumn\' align=\'center\'><p>D</p></th>';
        htmlString += '<th class=\'groupStatColumn\' align=\'center\'><p>L</p></th>';
        htmlString += '<th class=\'groupStatColumn\' align=\'center\'><p>F</p></th>';
        htmlString += '<th class=\'groupStatColumn\' align=\'center\'><p>A</p></th>';
        htmlString += '<th class=\'groupStatColumn\' align=\'center\'><p>D</p></th>';
        htmlString += '<th class=\'groupStatColumn\' align=\'center\'><p>P</p></th>';
        htmlString += '</tr>';
        htmlString += '<tbody id=\'groupTableBodyIndex'+i+'\'>';
        for (let k = 0; k < data.groups[i].teams.length; k++) {
            if (k == 2)
            {
                htmlString += '<tr><td align=\'center\' colspan=\'10\'><div class=\'groupMiddleLine\'></td></tr>';
            }
            htmlString += '<tr>';
            htmlString += '<td><p>' + (k + 1) + '</td>';
            htmlString += '<td><img src="' + data.groups[i].teams[k].flag + '" class="countryFlag" /><p>' + data.groups[i].teams[k].name + '</p></td>';
            htmlString += '<td align=\'center\'><p>' + data.groups[i].teams[k].mp + '</p></td>';
            htmlString += '<td align=\'center\'><p>' + data.groups[i].teams[k].w + '</p></td>';
            htmlString += '<td align=\'center\'><p>' + data.groups[i].teams[k].d + '</p></td>';
            htmlString += '<td align=\'center\'><p>' + data.groups[i].teams[k].l + '</p></td>';
            htmlString += '<td align=\'center\'><p>' + data.groups[i].teams[k].f + '</p></td>';
            htmlString += '<td align=\'center\'><p>' + data.groups[i].teams[k].a + '</p></td>';
            htmlString += '<td align=\'center\'><p>' + data.groups[i].teams[k].diff + '</p></td>';
            htmlString += '<td align=\'center\'><p>' + data.groups[i].teams[k].p + '</p></td>';
            htmlString += '</tr>';
        }
        htmlString += '</tbody>';
        htmlString += '</table>';
        htmlString += '</div>';
        htmlString += '</td>';
        if (i == 3 || i == NUMBER_OF_GROUPS) {
            htmlString += '</tr>';
        }
    }
    htmlString += '</table>';
    $('#groupTableContainers').html(htmlString);
}

const initializeMatches = () => {
    for (let i = 0; i < data.groups.length; i++) {
        data.groups[i].matches = [];
    }

    $.each(data.groups, function(){
        for (let i = 0; i < this.teams.length; i++)
        {
            for (let j = 0; j < this.teams.length; j++)
            {
                if (i > j) this.matches.push({ 'team1': this.teams[i], 'team2': this.teams[j], 'team1score': -1, 'team2score': -1 });
            }
        }
    });

    let htmlString = '<table width=\'100%\'>';
    for (let i = 0; i < data.groups.length; i++)
    {
        if (i == 0 || i == (NUMBER_OF_GROUPS / 2)) {
            htmlString += '<tr>';
        }
        htmlString += '<td>';
        htmlString += '<div class=\'groupMatchesContainer\' width=\'320\' group=\''+data.groups[i].name+'\'>';
        htmlString += '<table class=\'groupMatchesTable\' width=\'320\'>';
        htmlString += '<tr class=\'groupTitleRow\'><td colspan=\'5\' align=\'center\'><p class=\'groupTitle\'>Group '+data.groups[i].name+'</p></td></tr>';
        for (let k = 0; k < data.groups[i].matches.length; k++) {
            htmlString += '<tr>';
            htmlString += '<td align=\'right\' width=\'150\'><p>' + data.groups[i].matches[k].team1.name + '</p><img src="' + data.groups[i].matches[k].team1.flag + '" class="countryFlag"></td>';
            htmlString += '<td><input maxlength=\"1\"  type=\'text\' class=\'matchScoreBox match1\' groupIndex=\''+i+'\' matchIndex=\''+k+'\' /></td>';
            htmlString += '<td><span class=\'matchLine\'><p>-</p></span></td>';
            htmlString += '<td><input maxlength=\"1\" type=\'text\' class=\'matchScoreBox match2\' groupIndex=\''+i+'\' matchIndex=\''+k+'\' /></td>';
            htmlString += '<td align=\'left\' width=\'150\'><img src="' + data.groups[i].matches[k].team2.flag + '" class="countryFlag"><p>' + data.groups[i].matches[k].team2.name + '</p></td>';
            htmlString += '</tr>';
        }
        htmlString += '</table>';
        htmlString += '</div>';
        htmlString += '</td>';
        if (i == 3 || i == NUMBER_OF_GROUPS) {
            htmlString += '</tr>';
        }
    }
    htmlString += '</table>';
    $('#groupMatchesContainers').html(htmlString);
    $('.matchScoreBox').keyup(setMatchScore);
}

/*************************
    EVENT HANDLERS
*************************/

function randomize(randomizeKnockoutPhase = false){
    startLoader();
    setTimeout(() => {
        $('.knockoutMatchScoreBox').val('');
        $('.knockoutMatchScoreBox').keyup();
        $('.matchScoreBox').each(function(){
            $(this).val(Math.floor((Math.random() * 5) + 1));
            $(this).keyup();
        });

        const randomValueThatIsNotX = x => {
            const val = Math.floor((Math.random() * 5) + 1);
            return val !== x ? val : randomValueThatIsNotX(x);
        }

        const generateKnockoutPhase = roundOf => {
            const values = [];
            for (let i = 0; i < roundOf; i++) {
                if (i % 2 === 0) {
                    values.push(Math.floor((Math.random() * 5) + 1));
                } else {
                    values.push(randomValueThatIsNotX(values[i - 1]));
                }
            }

            $(`.knockoutPhaseCell[round="${roundOf}"] .knockoutMatchScoreBox`).each(function(index){
                $(this).val(values[index]);
                $(this).keyup();
            });
        }

        if (randomizeKnockoutPhase) {
            generateKnockoutPhase(16);
            generateKnockoutPhase(8);
            generateKnockoutPhase(4);
            generateKnockoutPhase(2);
        }

        stopLoader();
    }, 50);
}

function startLoader() {
    $('#groupTableContainers').hide();
    $('#groupMatchesContainers').hide();
    $('#knockOutPhaseTable').hide();
    $('#loader').show();
}

function stopLoader() {
    $('#groupTableContainers').show();
    $('#groupMatchesContainers').show();
    $('#knockOutPhaseTable').show();
    $('#loader').hide();
}

function clearGroups(){
    $('.matchScoreBox').each(function(){
        $(this).val('');
        $(this).keyup();
    });
}

function setMatchScore(){
    var groupIndex = $(this).attr('groupIndex');
    var matchIndex = $(this).attr('matchIndex');

    var team1box = $('.match1[groupIndex='+groupIndex+'][matchIndex='+matchIndex+']');
    var team2box = $('.match2[groupIndex='+groupIndex+'][matchIndex='+matchIndex+']');

    var team1score = team1box.val();
    var team2score = team2box.val();

    if (team1score != '' && team2score != '')
    {
        team1box.removeClass('validGradient invalidGradient');
        team2box.removeClass('validGradient invalidGradient');

        if (isNumber(team1score) && isNumber(team2score))
        {
            data.groups[groupIndex].matches[matchIndex].team1score = team1score;
            data.groups[groupIndex].matches[matchIndex].team2score = team2score;

            team1box.addClass('validGradient');
            team2box.addClass('validGradient');
        }
        else
        {
            team1box.addClass('invalidGradient');
            team2box.addClass('invalidGradient');
        }
    }
    else
    {
        data.groups[groupIndex].matches[matchIndex].team1score = -1;
        data.groups[groupIndex].matches[matchIndex].team2score = -1;

        team1box.removeClass('validGradient invalidGradient');
        team2box.removeClass('validGradient invalidGradient');
    }

    calculateGroup(groupIndex);

    for (var i = 0; i < knockOutPhases.length; i++)
    {
        for (var j = 0; j < knockOutPhases[i]; (j += 2))
        {
            calculateAndRedrawKnockoutMatch(knockOutPhases[i], j);
        }
    }
}

function knockoutPhaseKeyUp(){
    var thisRound = Number($(this).parent().parent().attr('round'));
    var thisRoundIndex = Number($(this).parent().parent().attr('id').replace('ro'+thisRound+'nr', ''));

    calculateAndRedrawKnockoutMatch(thisRound, thisRoundIndex); // E.g 16, 2 for the second Ro16 match
}

/*************************
    HELPER METHODS
*************************/

function calculateAndRedrawKnockoutMatch(thisRound, thisRoundIndex)
{
    var nextRound = (thisRound / 2);
    var oppsiteMatchIndex = (thisRoundIndex % 2 == 0) ? (thisRoundIndex - 1) : (thisRoundIndex + 1);
    var nextRoundIndex = (thisRoundIndex % 2 == 0) ? (thisRoundIndex / 2) : ((thisRoundIndex + 1) / 2);

    var team1 = $('#ro'+thisRound+'nr'+thisRoundIndex+' div span').text();
    var team2 = $('#ro'+thisRound+'nr'+oppsiteMatchIndex+' div span').text();

    var team1box = $('#ro'+thisRound+'nr'+thisRoundIndex+' div input[type="text"]');
    var team2box = $('#ro'+thisRound+'nr'+oppsiteMatchIndex+' div input[type="text"]');

    var team1score = team1box.val();
    var team2score = team2box.val();

    team1box.removeClass('invalidGradient validGradient');
    team2box.removeClass('invalidGradient validGradient');

    if (team1score != '' && team2score != '')
    {
        if (isNumber(team1score) && isNumber(team2score) && (team1score != team2score))
        {
            $('#ro'+nextRound+'nr'+nextRoundIndex+' div input[type="text"]').removeAttr('disabled');
            $('#ro'+nextRound+'nr'+nextRoundIndex+' div span').css('color', 'black');

            const winningTeamName = team1score > team2score ? team1 : team2;
            const winningTeam = teams.find(x => x.name === winningTeamName);

            $('#ro'+nextRound+'nr'+nextRoundIndex+' div span').text(winningTeamName);
            $('#ro'+nextRound+'nr'+nextRoundIndex+' div img').removeClass('hidden');
            $('#ro'+nextRound+'nr'+nextRoundIndex+' div img').attr('src', winningTeam.flag);

            team1box.addClass('validGradient');
            team2box.addClass('validGradient');
        }
        else
        {
            team1box.addClass('invalidGradient');
            team2box.addClass('invalidGradient');

            $('#ro'+nextRound+'nr'+nextRoundIndex+' div span').css('color', 'gainsboro');
            $('#ro'+nextRound+'nr'+nextRoundIndex+' div span').text('TBD');
            $('#ro'+nextRound+'nr'+nextRoundIndex+' div img').addClass('hidden');
            $('#ro'+nextRound+'nr'+nextRoundIndex+' div img').attr('src', '');
            $('#ro'+nextRound+'nr'+nextRoundIndex+' div input[type="text"]').val('');
            $('#ro'+nextRound+'nr'+nextRoundIndex+' div input[type="text"]').attr('disabled', '');
        }
    }
    else
    {
        team1box.css('background-color', defaultColor);
        team2box.css('background-color', defaultColor);

        $('#ro'+nextRound+'nr'+nextRoundIndex+' div span').css('color', 'gainsboro');
        $('#ro'+nextRound+'nr'+nextRoundIndex+' div span').text('TBD');
        $('#ro'+nextRound+'nr'+nextRoundIndex+' div img').addClass('hidden');
        $('#ro'+nextRound+'nr'+nextRoundIndex+' div img').attr('src', '');
        $('#ro'+nextRound+'nr'+nextRoundIndex+' div input[type="text"]').val('');
        $('#ro'+nextRound+'nr'+nextRoundIndex+' div input[type="text"]').attr('disabled', '');
    }

    checkIfTournamentIsDone();
}

function checkIfTournamentIsDone(){
    var tournamentIsComplete = true;
    $('.knockoutMatchScoreBox').each(function(){
        if (!isNumber(Number($(this).val())) || $(this).val() == ''){
            tournamentIsComplete = false;
        }
    });
    if (tournamentIsComplete && !idVariable){
        console.log('show');
        $('#overlay').show();
        $('#overlay').css('opacity', '0.6');
        $('#tournamentCompleteContainer').css('display', 'block');

        let winner;

        if ($('#ro2nr1 input').val() > $('#ro2nr2 input').val()) {
            winner = $('#ro2nr1 span').text();
        } else {
            winner = $('#ro2nr2 span').text();
        }

        const flag = teams.find(x => x.name === winner).flag;

        $('#predictedWinner').html(`<img src="${flag}" /><h1>${winner}</h1>`);

        let resultat = '';

        $('.matchScoreBox').each(function(){
            resultat += $(this).val();
        });
        $('.knockoutPhaseCell[round="16"] .knockoutMatchScoreBox').each(function(index){
            resultat += $(this).val();
        });
        $('.knockoutPhaseCell[round="8"] .knockoutMatchScoreBox').each(function(index){
            resultat += $(this).val();
        });
        $('.knockoutPhaseCell[round="4"] .knockoutMatchScoreBox').each(function(index){
            resultat += $(this).val();
        });
        $('.knockoutPhaseCell[round="2"] .knockoutMatchScoreBox').each(function(index){
            resultat += $(this).val();
        });

        const shareableLink = window.location.href.split('?')[0] + '?id=' + resultat;

        $('#codeTextArea').val(shareableLink);
        $('.fb-share-button').attr('data-href', shareableLink);
        $('[property="og:url"]').attr('content', shareableLink);
    }
}

function calculateGroup(groupIndex){
    for (var i = 0; i < data.groups[groupIndex].teams.length; i++)
    {
        data.groups[groupIndex].teams[i].a = 0;
        data.groups[groupIndex].teams[i].d = 0;
        data.groups[groupIndex].teams[i].f = 0;
        data.groups[groupIndex].teams[i].l = 0;
        data.groups[groupIndex].teams[i].mp = 0;
        data.groups[groupIndex].teams[i].p = 0;
        data.groups[groupIndex].teams[i].diff = 0;
        data.groups[groupIndex].teams[i].w = 0;
    }

    for (var i = 0; i < data.groups[groupIndex].matches.length; i++)
    {
        if (matchIsSet(data.groups[groupIndex].matches[i]) && matchIsValid(data.groups[groupIndex].matches[i])) // Match is set
        {
            var team1 = data.groups[groupIndex].matches[i].team1;
            var team2 = data.groups[groupIndex].matches[i].team2;
            var team1score = data.groups[groupIndex].matches[i].team1score;
            var team2score = data.groups[groupIndex].matches[i].team2score;

            team1.mp++;
            team1.f += Number(team1score);
            team1.a += Number(team2score);
            team1.diff = (team1.f - team1.a);

            team2.mp++;
            team2.f += Number(team2score);
            team2.a += Number(team1score);
            team2.diff = (team2.f - team2.a);

            if (team1score > team2score)
            {
                team1.w++;
                team2.l++;
                team1.p += 3;
            }
            else if (team2score > team1score)
            {
                team2.w++;
                team2.p += 3;
                team1.l++;
            }
            else if (team2score == team1score)
            {
                team1.d++;
                team2.d++;
                team1.p++;
                team2.p++;
            }
        }
    }
    redrawGroup(groupIndex);
}

function redrawGroup(index){
    sortGroup(data.groups[index]);
    var htmlString = '';
    for (var k = 0; k < data.groups[index].teams.length; k++) {
        if (k == 2) // add line in middle
        {
            htmlString += '<tr><td align=\'center\' colspan=\'10\'><div class=\'groupMiddleLine\'></td></tr>';
        }
        htmlString += '<tr>';
        htmlString += '<td><p>' + (k + 1) + '</td>';
        htmlString += '<td><img src="' + data.groups[index].teams[k].flag + '" class="countryFlag"><p>' + data.groups[index].teams[k].name + '</p></td>';
        htmlString += '<td align=\'center\'><p>' + data.groups[index].teams[k].mp + '</p></td>';
        htmlString += '<td align=\'center\'><p>' + data.groups[index].teams[k].w + '</p></td>';
        htmlString += '<td align=\'center\'><p>' + data.groups[index].teams[k].d + '</p></td>';
        htmlString += '<td align=\'center\'><p>' + data.groups[index].teams[k].l + '</p></td>';
        htmlString += '<td align=\'center\'><p>' + data.groups[index].teams[k].f + '</p></td>';
        htmlString += '<td align=\'center\'><p>' + data.groups[index].teams[k].a + '</p></td>';
        htmlString += '<td align=\'center\'><p>' + data.groups[index].teams[k].diff + '</p></td>';
        htmlString += '<td align=\'center\'><p>' + data.groups[index].teams[k].p + '</p></td>';
        htmlString += '</tr>';
    }
    $('#groupTableBodyIndex'+index).html(htmlString);
    var groupIsValid = true;
    for (var k = 0; k < data.groups[index].matches.length; k++) {
        if (!(matchIsSet(data.groups[index].matches[k]) && matchIsValid(data.groups[index].matches[k])))
        {
            groupIsValid = false;
        }
    }

    var ro16box1Number;
    var ro16box2Number

    if (index % 2 == 0){
        ro16box1Number = Number(index) + 1;
        ro16box2Number = Number(index) + 10;
    }
    else
    {
        ro16box1Number = Number(index) + 8;
        ro16box2Number = Number(index) + 1;
    }

    if (groupIsValid)
    {
        $(`.groupContainer[groupIndex="${index}"]`).addClass('validGradient');
        $('#ro16nr'+ro16box1Number+' div span').html(data.groups[Number(index)].teams[0].name);
        $('#ro16nr'+ro16box2Number+' div span').html(data.groups[Number(index)].teams[1].name);
        $('#ro16nr'+ro16box1Number+' div img').attr('src', data.groups[Number(index)].teams[0].flag);
        $('#ro16nr'+ro16box2Number+' div img').attr('src', data.groups[Number(index)].teams[1].flag);
        $('#ro16nr'+ro16box1Number+' div img').removeClass('hidden');
        $('#ro16nr'+ro16box2Number+' div img').removeClass('hidden')
        $('#ro16nr'+ro16box1Number+' div span').css('color', 'black');
        $('#ro16nr'+ro16box2Number+' div span').css('color', 'black');
        $('#ro16nr'+ro16box1Number+' div input[type="text"]').removeAttr('disabled');
        $('#ro16nr'+ro16box2Number+' div input[type="text"]').removeAttr('disabled');
    }
    else
    {
        $(`.groupContainer[groupIndex="${index}"]`).removeClass('validGradient');
        $('#ro16nr'+ro16box1Number+' div span').html('TBD');
        $('#ro16nr'+ro16box2Number+' div span').html('TBD');
        $('#ro16nr'+ro16box1Number+' div span').css('color', 'gainsboro');
        $('#ro16nr'+ro16box2Number+' div span').css('color', 'gainsboro');
        $('#ro16nr'+ro16box1Number+' div img').addClass('hidden');
        $('#ro16nr'+ro16box2Number+' div img').addClass('hidden')
        $('#ro16nr'+ro16box1Number+' div input[type="text"]').attr('disabled', '');
        $('#ro16nr'+ro16box2Number+' div input[type="text"]').attr('disabled', '');
        $('#ro16nr'+ro16box1Number+' div input[type="text"]').val('');
        $('#ro16nr'+ro16box2Number+' div input[type="text"]').val('');
    }
}

function matchIsValid(match){
    return (isNumber(match.team1score) && isNumber(match.team2score));
}

function matchIsSet(match){
    return (match.team1score != '' && match.team2score != '');
}

function sortGroup(group){
    group.teams.sort(function(a, b){
        if (b.p != a.p)
        {
            return (b.p - a.p);
        }
        else{
            if (b.diff != a.diff)
            {
                return (b.diff - a.diff);
            }
            else{
                return (b.f - a.f);
            }
        }
    });
}

function isNumber(input)
{
    return eval('/^\\d+$/').test(input);
}

function loadDataFromId(idVariable){
    startLoader();

    setTimeout(() => {
        var i = 0;

        $('.matchScoreBox').each(function(){
            $(this).val(idVariable[i]);
            $(this).keyup();
            i++;
        });
        $('.knockoutPhaseCell[round="16"] .knockoutMatchScoreBox').each(function(index){
            $(this).val(idVariable[i]);
            $(this).keyup();
            i++;
        });
        $('.knockoutPhaseCell[round="8"] .knockoutMatchScoreBox').each(function(index){
            $(this).val(idVariable[i]);
            $(this).keyup();
            i++;
        });
        $('.knockoutPhaseCell[round="4"] .knockoutMatchScoreBox').each(function(index){
            $(this).val(idVariable[i]);
            $(this).keyup();
            i++;
        });
        $('.knockoutPhaseCell[round="2"] .knockoutMatchScoreBox').each(function(index){
            $(this).val(idVariable[i]);
            $(this).keyup();
            i++;
        });

        stopLoader();
    }, 50);
}