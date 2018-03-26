require(['jquery', 'constants', 'dataCompresser', 'helpers'], function($, constants, dataCompresser, helpers) {

    /*************************
        INITIALIZATION
    *************************/

    var data = new Object();

    $(document).ready(function () {
        initializeGroups();
        initializeGroupTables();
        initializeMatches();

        // Set listeners
        $("#randomizeButton").click(randomizeGroups);
        $("#clearButton").click(clearGroups);
        $(".knockoutMatchScoreBox").keyup(knockoutPhaseKeyUp);

        $("#restartButton").click(function(){
            window.location.replace(constants.rootPath);
        });

        if (idVariable.length > 0){
            loadDataFromId();
        }
    });

    function initializeGroups() {
        data.groups = new Array();
        var teams = constants.teams;
        for (var i = 0; i < teams.length; i++) {
            var currentGroup;
            if (i % constants.TEAMS_PER_GROUP == 0) {
                currentGroup = new Object;
                currentGroup.name = constants.groupNames[(i / constants.TEAMS_PER_GROUP)];
                currentGroup.teams = [];
            }
            else {
                currentGroup = data.groups[data.groups.length - 1];
            }
            var team = {
                name: teams[i],
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
            if (i % constants.TEAMS_PER_GROUP == 0) {
                data.groups.push(currentGroup);
            }
        }
    }

    function initializeGroupTables() {
        var htmlString = "<table width=\"100%\">";
        for (var i = 0; i < data.groups.length; i++)
        {
            if (i == 0 || i == (constants.NUMBER_OF_GROUPS / 2)) {
                htmlString += "<tr>";
            }
            htmlString += "<td>";
            htmlString += "<div class=\"groupContainer\" groupIndex=\""+i+"\">";
            htmlString += "<table class=\"groupTable\">";
            htmlString += "<tr>";
            htmlString += "<th id=\"groupIndexColumn\" align=\"left\"><p>#</p></th>";
            htmlString += "<th id=\"groupTeamColumn\" align=\"left\"><p>Team</p></th>";
            htmlString += "<th class=\"groupStatColumn\" align=\"center\"><p>MP</p></th>";
            htmlString += "<th class=\"groupStatColumn\" align=\"center\"><p>W</p></th>";
            htmlString += "<th class=\"groupStatColumn\" align=\"center\"><p>D</p></th>";
            htmlString += "<th class=\"groupStatColumn\" align=\"center\"><p>L</p></th>";
            htmlString += "<th class=\"groupStatColumn\" align=\"center\"><p>F</p></th>";
            htmlString += "<th class=\"groupStatColumn\" align=\"center\"><p>A</p></th>";
            htmlString += "<th class=\"groupStatColumn\" align=\"center\"><p>D</p></th>";
            htmlString += "<th class=\"groupStatColumn\" align=\"center\"><p>P</p></th>";
            htmlString += "</tr>";
            htmlString += "<tbody id=\"groupTableBodyIndex"+i+"\">";
            for (var k = 0; k < data.groups[i].teams.length; k++) {
                if (k == 2)
                {
                    htmlString += "<tr><td align=\"center\" colspan=\"10\"><div class=\"groupMiddleLine\"></td></tr>";
                }
                htmlString += "<tr>";
                htmlString += "<td><p>" + (k + 1) + "</td>";
                htmlString += "<td><p>" + data.groups[i].teams[k].name + "</p></td>";
                htmlString += "<td align=\"center\"><p>" + data.groups[i].teams[k].mp + "</p></td>";
                htmlString += "<td align=\"center\"><p>" + data.groups[i].teams[k].w + "</p></td>";
                htmlString += "<td align=\"center\"><p>" + data.groups[i].teams[k].d + "</p></td>";
                htmlString += "<td align=\"center\"><p>" + data.groups[i].teams[k].l + "</p></td>";
                htmlString += "<td align=\"center\"><p>" + data.groups[i].teams[k].f + "</p></td>";
                htmlString += "<td align=\"center\"><p>" + data.groups[i].teams[k].a + "</p></td>";
                htmlString += "<td align=\"center\"><p>" + data.groups[i].teams[k].diff + "</p></td>";
                htmlString += "<td align=\"center\"><p>" + data.groups[i].teams[k].p + "</p></td>";
                htmlString += "</tr>";
            }
            htmlString += "</tbody>";
            htmlString += "</table>";
            htmlString += "</div>";
            htmlString += "</td>";
            if (i == 3 || i == constants.NUMBER_OF_GROUPS) {
                htmlString += "</tr>";
            }
        }
        htmlString += "</table>";
        $("#groupTableContainers").html(htmlString);
    }

    function initializeMatches() {
        for (var i = 0; i < data.groups.length; i++) {
            data.groups[i].matches = [];
        }

        $.each(data.groups, function(){
            for (var i = 0; i < this.teams.length; i++)
            {
                for (var j = 0; j < this.teams.length; j++)
                {
                    if (i > j) this.matches.push({ "team1": this.teams[i].name, "team2": this.teams[j].name, "team1score": -1, "team2score": -1 });
                }
            }
        });

        var htmlString = "<table width=\"100%\">";
        for (var i = 0; i < data.groups.length; i++)
        {
            if (i == 0 || i == (constants.NUMBER_OF_GROUPS / 2)) {
                htmlString += "<tr>";
            }
            htmlString += "<td>";
            htmlString += "<div class=\"groupMatchesContainer\" width=\"320\" group=\""+data.groups[i].name+"\">";
            htmlString += "<table class=\"groupMatchesTable\" width=\"320\">";
            htmlString += "<tr class=\"groupTitleRow\"><td colspan=\"5\" align=\"center\"><b class=\"groupTitle\">Group "+data.groups[i].name+"</b></td></tr>";
            for (var k = 0; k < data.groups[i].matches.length; k++) {
                htmlString += "<tr>";
                htmlString += "<td align=\"right\" width=\"150\"><p>" + data.groups[i].matches[k].team1 + "</p></td>";
                htmlString += "<td><input type=\"text\" class=\"matchScoreBox match1\" groupIndex=\""+i+"\" matchIndex=\""+k+"\" /></td>";
                htmlString += "<td><span class=\"matchLine\"><p>-</p></span></td>";
                htmlString += "<td><input type=\"text\" class=\"matchScoreBox match2\" groupIndex=\""+i+"\" matchIndex=\""+k+"\" /></td>";
                htmlString += "<td align=\"left\" width=\"150\"><p>" + data.groups[i].matches[k].team2 + "</p></td>";
                htmlString += "</tr>";
            }
            htmlString += "</table>";
            htmlString += "</div>";
            htmlString += "</td>";
            if (i == 3 || i == constants.NUMBER_OF_GROUPS) {
                htmlString += "</tr>";
            }
        }
        htmlString += "</table>";
        $("#groupMatchesContainers").html(htmlString);
        $(".matchScoreBox").keyup(setMatchScore);
    }

    /*************************
        EVENT HANDLERS
    *************************/

    function randomizeGroups(){
        $(".knockoutMatchScoreBox").val("");
        $(".knockoutMatchScoreBox").keyup();
        $(".matchScoreBox").each(function(){
            $(this).val(Math.floor((Math.random() * 5) + 1));
            $(this).keyup();
        });
    }

    function clearGroups(){
        $(".matchScoreBox").each(function(){
            $(this).val("");
            $(this).keyup();
        });
    }

    function setMatchScore(){
        var groupIndex = $(this).attr("groupIndex");
        var matchIndex = $(this).attr("matchIndex");

        var team1box = $(".match1[groupIndex="+groupIndex+"][matchIndex="+matchIndex+"]");
        var team2box = $(".match2[groupIndex="+groupIndex+"][matchIndex="+matchIndex+"]");

        var team1score = team1box.val();
        var team2score = team2box.val();

        if (team1score != "" && team2score != "")
        {
            if (isNumber(team1score) && isNumber(team2score))
            {
                data.groups[groupIndex].matches[matchIndex].team1score = team1score;
                data.groups[groupIndex].matches[matchIndex].team2score = team2score;

                team1box.css("background-color", constants.validColor);
                team2box.css("background-color", constants.validColor);
            }
            else
            {
                team1box.css("background-color", constants.invalidColor);
                team2box.css("background-color", constants.invalidColor);
            }
        }
        else
        {
            data.groups[groupIndex].matches[matchIndex].team1score = -1;
            data.groups[groupIndex].matches[matchIndex].team2score = -1;

            team1box.css("background-color", constants.defaultColor);
            team2box.css("background-color", constants.defaultColor);
        }

        calculateGroup(groupIndex);

        for (var i = 0; i < constants.knockOutPhases.length; i++)
        {
            for (j = 0; j < constants.knockOutPhases[i]; (j += 2))
            {
                calculateAndRedrawKnockoutMatch(constants.knockOutPhases[i], j);
            }
        }
    }

    function knockoutPhaseKeyUp(){
        var thisRound = Number($(this).parent().parent().attr("round"));
        var thisRoundIndex = Number($(this).parent().parent().attr("id").replace("ro"+thisRound+"nr", ""));

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
        
        var team1 = $("#ro"+thisRound+"nr"+thisRoundIndex+" div span").text();
        var team2 = $("#ro"+thisRound+"nr"+oppsiteMatchIndex+" div span").text();

        var team1box = $("#ro"+thisRound+"nr"+thisRoundIndex+" div input[type='text']");
        var team2box = $("#ro"+thisRound+"nr"+oppsiteMatchIndex+" div input[type='text']");

        var team1score = team1box.val();
        var team2score = team2box.val();

        if (team1score != "" && team2score != "")
        {
            if (isNumber(team1score) && isNumber(team2score) && (team1score != team2score))
            {
                $("#ro"+nextRound+"nr"+nextRoundIndex+" div input[type='text']").removeAttr("disabled");
                $("#ro"+nextRound+"nr"+nextRoundIndex+" div span").css("color", "black");
                if (team1score > team2score)
                {
                    $("#ro"+nextRound+"nr"+nextRoundIndex+" div span").text(team1);
                }
                else
                {
                    $("#ro"+nextRound+"nr"+nextRoundIndex+" div span").text(team2);
                }

                team1box.css("background-color", constants.validColor);
                team2box.css("background-color", constants.validColor);
            }
            else
            {
                team1box.css("background-color", constants.invalidColor);
                team2box.css("background-color", constants.invalidColor);

                $("#ro"+nextRound+"nr"+nextRoundIndex+" div span").css("color", "gainsboro");
                $("#ro"+nextRound+"nr"+nextRoundIndex+" div span").text("empty");
                $("#ro"+nextRound+"nr"+nextRoundIndex+" div input[type='text']").val("");
                $("#ro"+nextRound+"nr"+nextRoundIndex+" div input[type='text']").attr("disabled", "");
            }
        }
        else
        {
            team1box.css("background-color", constants.defaultColor);
            team2box.css("background-color", constants.defaultColor);

            $("#ro"+nextRound+"nr"+nextRoundIndex+" div span").css("color", "gainsboro");
            $("#ro"+nextRound+"nr"+nextRoundIndex+" div span").text("empty");
            $("#ro"+nextRound+"nr"+nextRoundIndex+" div input[type='text']").val("");
            $("#ro"+nextRound+"nr"+nextRoundIndex+" div input[type='text']").attr("disabled", "");
        }

        checkIfTournamentIsDone();
    }

    function checkIfTournamentIsDone(){
        var tournamentIsComplete = true;
        $(".knockoutMatchScoreBox").each(function(){
            if (!isNumber(Number($(this).val())) || $(this).val() == ""){
                tournamentIsComplete = false;
            }
        });
        if (tournamentIsComplete && idVariable.length == 0){
            $("#main").css("opacity", "0.2");
            $("#tournamentCompleteContainer").css("visibility", "visible");

            var resultat = "";
            $("input[type='text']").each(function(){
                resultat += $(this).val() + "-";
            });

            dataCompresser.compress(resultat).done(function(result) {
                var url = $("#shareLink").attr("href");
                var url = url.replace("PLACEHOLDER", constants.rootPath + "?id=" + result);
                $("#codeTextArea").val(result);
                $("#shareLink").attr("href", url);
                console.log(url);
            }).fail(function() {});

            $(".knockoutMatchScoreBox").unbind();
            $(".matchScoreBox").unbind();
            $("#randomizeButton").unbind();
            $("#clearButton").unbind();
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
                var team1 = getTeam(data.groups[groupIndex].matches[i].team1);
                var team2 = getTeam(data.groups[groupIndex].matches[i].team2);
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
        var htmlString = "";
        for (var k = 0; k < data.groups[index].teams.length; k++) {
            if (k == 2) // add line in middle
            {
                htmlString += "<tr><td align=\"center\" colspan=\"10\"><div class=\"groupMiddleLine\"></td></tr>";
            }
            htmlString += "<tr>";
            htmlString += "<td><p>" + (k + 1) + "</td>";
            htmlString += "<td><p>" + data.groups[index].teams[k].name + "</p></td>";
            htmlString += "<td align=\"center\"><p>" + data.groups[index].teams[k].mp + "</p></td>";
            htmlString += "<td align=\"center\"><p>" + data.groups[index].teams[k].w + "</p></td>";
            htmlString += "<td align=\"center\"><p>" + data.groups[index].teams[k].d + "</p></td>";
            htmlString += "<td align=\"center\"><p>" + data.groups[index].teams[k].l + "</p></td>";
            htmlString += "<td align=\"center\"><p>" + data.groups[index].teams[k].f + "</p></td>";
            htmlString += "<td align=\"center\"><p>" + data.groups[index].teams[k].a + "</p></td>";
            htmlString += "<td align=\"center\"><p>" + data.groups[index].teams[k].diff + "</p></td>";
            htmlString += "<td align=\"center\"><p>" + data.groups[index].teams[k].p + "</p></td>";
            htmlString += "</tr>";
        }
        $("#groupTableBodyIndex"+index).html(htmlString);
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
            $(".groupContainer[groupIndex='"+index+"']").css("background-color", constants.validColor);
            $("#ro16nr"+ro16box1Number+" div span").html(data.groups[Number(index)].teams[0].name);
            $("#ro16nr"+ro16box2Number+" div span").html(data.groups[Number(index)].teams[1].name);
            $("#ro16nr"+ro16box1Number+" div span").css("color", "black");
            $("#ro16nr"+ro16box2Number+" div span").css("color", "black");
            $("#ro16nr"+ro16box1Number+" div input[type='text']").removeAttr("disabled");
            $("#ro16nr"+ro16box2Number+" div input[type='text']").removeAttr("disabled");
        }
        else
        {
            $(".groupContainer[groupIndex='"+index+"']").css("background-color", constants.defaultColor);
            $("#ro16nr"+ro16box1Number+" div span").html("empty");
            $("#ro16nr"+ro16box2Number+" div span").html("empty");
            $("#ro16nr"+ro16box1Number+" div span").css("color", "gainsboro");
            $("#ro16nr"+ro16box2Number+" div span").css("color", "gainsboro");
            $("#ro16nr"+ro16box1Number+" div input[type='text']").attr("disabled", "");
            $("#ro16nr"+ro16box2Number+" div input[type='text']").attr("disabled", "");
            $("#ro16nr"+ro16box1Number+" div input[type='text']").val("");
            $("#ro16nr"+ro16box2Number+" div input[type='text']").val("");
        }
    }

    function matchIsValid(match){
        return (isNumber(match.team1score) && isNumber(match.team2score));
    }

    function matchIsSet(match){
        return (match.team1score != "" && match.team2score != "");
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

    function getTeam(name) {
        for (var i = 0; i < data.groups.length; i++) {
            for (var j = 0; j < data.groups[i].teams.length; j++) {
                if (data.groups[i].teams[j].name == name) {
                    return data.groups[i].teams[j];
                }
            }
        }
    }

    function loadDataFromId(){
        dataCompresser.decompress(idVariable).done(function(result) {
            console.log(result);
            var resultatArray = result.split("-");
            var i = 0;
            $("input[type='text']").each(function(){
                $(this).val(resultatArray[i]);
                $(this).keyup();
                i++;
            });
            i = 0;
            $("input[type='text']").each(function(){
                $(this).val(resultatArray[i]);
                i++;
            });
            $(".knockoutMatchScoreBox").keyup();
        }).fail(function() {  });
    }
});