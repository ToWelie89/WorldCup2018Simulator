<!DOCTYPE html>
<html xmlns="http:/www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8"/>
        <script>
            var idVariable = "<?php echo (isset($_GET["id"]) ? $_GET["id"] : ""); ?>";
        </script>
        <link href="https://fonts.googleapis.com/css?family=Bangers" rel="stylesheet">
        <script src="node_modules/jquery/dist/jquery.min.js"></script>
        <script src="build/app.bundle.js"></script>
        <script>(function(d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) return;
                  js = d.createElement(s); js.id = id;
                  js.src = "//connect.facebook.net/sv_SE/sdk.js#xfbml=1&appId=689778051059856&version=v2.0";
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
        </script>
        <link rel="stylesheet" type="text/css" href="build/default.css">
        <title>
            World Cup 2018 Calculator
        </title>
    </head>
    <body>
        <div id="fb-root"></div>
        <div id="tournamentCompleteContainer">
            <p>
                You are done predicting results for the World Cup 2018.<br><br>
                Share your prediction with your friends via Facebook!<br><br>
                <a href="https://www.facebook.com/sharer/sharer.php?u=PLACEHOLDER" target="_blank" id="shareLink">Share on Facebook!</a><br>
                ID:<br>
                <textarea id="codeTextArea"></textarea>
                <input type="button" value="Restart" id="restartButton" />
            </p>
        </div>

        <div id="main">
            <div id="shareButton">
                <div class="fb-share-button" data-href="http://www.martinsonesson.se/pi/WC2018" data-type="button_count" style="float: right;"></div>
            </div>

            <h1 id="title">World Cup 2018 Calculator</h1>
            <h2 id="subtitle">A webapplication made by <a target="_blank" href="http://se.linkedin.com/pub/martin-sonesson/47/b65/200/ms">Martin Sonesson</a> @ <a target="_blank" href="http://www.martinsonesson.se">martinsonesson.se</a></h2>
            <input type="button" value="Randomize groups" id="randomizeButton" />
            <input type="button" value="Clear" id="clearButton" />
            <div id="groupTableContainers"></div>
            <div id="groupMatchesContainers"></div>
            <div id="knockOutPhaseTable">
                <table width="100%">
                    <tr>
                        <td>
                            <table border="0" cellspacing="0" cellpadding="0" class="bracketTable" id="leftBracket" align="right">
                                <tr>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr1"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                    <td class="knockoutPhaseCell" round="8" id="ro8nr1" rowspan="2"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                    <td class="knockoutPhaseCell" round="4" id="ro4nr1" rowspan="4"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                    <td class="knockoutPhaseCell" round="2" id="ro2nr1" rowspan="8"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr2"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr3"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                    <td class="knockoutPhaseCell" round="8" id="ro8nr2" rowspan="2"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr4"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr5"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                    <td class="knockoutPhaseCell" round="8" id="ro8nr3" rowspan="2"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                    <td class="knockoutPhaseCell" round="4" id="ro4nr2" rowspan="4"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr6"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr7"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                    <td class="knockoutPhaseCell" round="8" id="ro8nr4" rowspan="2"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr8"><div><span>empty</span> <input type="text" class="knockoutMatchScoreBox" disabled /></div></td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <table border="0" cellspacing="0" cellpadding="0" class="bracketTable" id="rightBracket" align="left">
                                <tr>
                                    <td class="knockoutPhaseCell" round="2" id="ro2nr2" rowspan="8"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                    <td class="knockoutPhaseCell" round="4" id="ro4nr3" rowspan="4"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                    <td class="knockoutPhaseCell" round="8" id="ro8nr5" rowspan="2"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr9"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr10"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="8" id="ro8nr6" rowspan="2"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr11"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr12"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="4" id="ro4nr4" rowspan="4"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                    <td class="knockoutPhaseCell" round="8" id="ro8nr7" rowspan="2"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr13"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr14"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="8" id="ro8nr8" rowspan="2"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr15"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                </tr>
                                <tr>
                                    <td class="knockoutPhaseCell" round="16" id="ro16nr16"><div><input type="text" class="knockoutMatchScoreBox" disabled /> <span>empty</span></div></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </body>
</html>
