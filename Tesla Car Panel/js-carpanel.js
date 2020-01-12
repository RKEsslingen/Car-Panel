var update_DateandTime = setInterval(DateandTime, 1000);


function DateandTime() {
    var today = new Date();
    

    if (today.getDate() < 10) {
        var d = "0" + today.getDay();
    }
    else {
        var d = today.getDate();
    };
    if (today.getMonth() < 10) {
        var month = today.getMonth() + 1;
        var m = "0" + month;
    }
    else {
        var m = today.getMonth() + 1;
    };

    var y = today.getFullYear();


    var TodayDay = d + "." + m + "." + y;
    document.getElementById("Datum").innerHTML = TodayDay;

    var time = new Date();

    if (time.getHours() < 10) {
        var h = "0" + time.getHours();
    }
    else {
        var h = time.getHours();
    };
    if (time.getMinutes() < 10) {
        var m = "0" + time.getMinutes();
    }
    else {
        var m = time.getMinutes();
    };
    if (time.getSeconds() < 10) {
        var s = "0" + time.getSeconds();
    }
    else {
        var s = time.getSeconds();
    };
    var TodayTime = h + ":" + m + ":" + s;
    document.getElementById("Zeit").innerHTML = TodayTime;
}


document.querySelector("footer").addEventListener("click", ButtonFunction);
document.getElementById("LockMainIcon").addEventListener("click", ButtonFunction);
document.getElementById("WindowIcon").addEventListener("click", CreateCarFunction);
document.getElementById("MusicTabel").addEventListener("click", MusicPlayer);
document.getElementById("OnOffIcon").addEventListener("click", ButtonFunction);



function ButtonFunction() {

    clearInterval(update_DrivingData);

    document.getElementsByClassName("DivTeslaFront")[0].style.display = "none";
    document.getElementsByClassName("DataFront")[0].style.display = "none";
    document.getElementsByClassName("NaviFront")[0].style.display = "none";
    document.getElementsByClassName("MusicFront")[0].style.display = "none";



    if (event.target.id != "LockIcon") {
        if (event.target.id != "LockMainIcon") {
            document.getElementsByClassName("CarFunctionsFront")[0].style.display = "none";
        };
    };



    switch (event.target.id) {

        case "DataButton":
        case "DataIcon":
            CreateSpeedandFuel();
            break;

        case 'NaviButton':
        case "NaviIcon":
            CreateNavi();
            break;

        case 'TeslaButton':
        case "TeslaIcon":
            ShowTeslaGif();
            break;

        case 'MusicButton':
        case "MusicIcon":
            CreatMusic();
            break;

        case 'CarFunctionButton':
        case "CarFuncIcon":
            CreateCarFunction();
            break;

        case "UnlockIcon":
        case "LockIcon":
            LockUnlockFunction();
            break;

        case "OnOffIcon":
            TurningCarOn();
            break;
    };
};

var Clicks = 0;

function TurningCarOn() {

    Clicks = Clicks + 1;
    console.log(Clicks);
    var CheckUpClicks = Clicks % 2;

    if (CheckUpClicks == 1) {
        document.getElementsByClassName("DivTeslaFront")[0].style.display = "block";
        document.querySelector("footer").style.display = "grid";
    }
    else {
        document.getElementsByClassName("DivTeslaFront")[0].style.display = "none";
        document.getElementsByClassName("DataFront")[0].style.display = "none";
        document.getElementsByClassName("NaviFront")[0].style.display = "none";
        document.getElementsByClassName("MusicFront")[0].style.display = "none";
        document.querySelector("footer").style.display = "none";
        var autoPlay = document.getElementById("MediaPlayer");
        autoPlay.autoplay=false;
        autoPlay.load();
    }


}

var update_DrivingData;

function CreateSpeedandFuel() {
    document.getElementsByClassName("DataFront")[0].style.display = "grid";

    update_DrivingData = setInterval(UpdateDrivingData, 2000);

    function UpdateDrivingData() {

        fetch("http://192.168.2.110:5000/status")
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                document.getElementById("Geschwindigkeit").innerHTML = data.speed + " " + "km/h";
                document.getElementById("Verbrauch").innerHTML = data.consumption + " " + "l/100km";
                document.getElementById("Druck").innerHTML = Math.round(data.pressure) + " " + "Pa";
                document.getElementById("Humidity").innerHTML = Math.round(data.humidity) + " " + "g/m³";
                document.getElementById("Temperatur").innerHTML = Math.round(data.temp) + " " + "°C";
            });
    };

};

function CreateNavi() {
    document.getElementsByClassName("NaviFront")[0].style.display = "block";

};

function ShowTeslaGif() {
    document.getElementsByClassName("DivTeslaFront")[0].style.display = "block";

    var ShowButtonsFooter = document.getElementsByClassName("button");

    for (var i = 0; i < ShowButtonsFooter.length; i++) {

        ShowButtonsFooter[i].style.display = "block";
    };

};

var tracks;

function CreatMusic() {

    document.getElementsByClassName("MusicFront")[0].style.display = "grid";

    fetch("http://192.168.2.110:5000/music")
        .then(function (response) {
            response.text()
                .then(function (text) {
                    tracks = JSON.parse(text);
                    console.log(text);

                    CreateSelectMusic();
                });
        });
};

var ClicksMusic = 0;
var tracksPath = [];
var tracksArtist = [];
var tracksSong = [];

function CreateSelectMusic() {


    ClicksMusic = ClicksMusic + 1;
    if (ClicksMusic == 1) {
        var table = document.getElementById("MusicTabel");

        for (var i = 0; i < tracks.length; i++) {
            var row = table.insertRow(-1);
            row.id = i;
            var cell = row.insertCell(0);
            cell.id = i;
            cell.innerHTML = tracks[i].artist + " " + "-" + " " + tracks[i].title;
            tracksPath[i] = tracks[i].path;
            tracksArtist[i] = tracks[i].artist;
            tracksSong[i] = tracks[i].title;
            console.log(tracksPath[i]);
            console.log(tracksArtist[i]);
            console.log(tracksSong[i]);


        };
    };
};


function MusicPlayer() {

    var SourceChecker = document.querySelector("source");
    if (typeof (SourceChecker) != 'undefined' && SourceChecker != null) {
        document.getElementById("SongSource").remove();
        var SetSource = document.createElement("source");
        SetSource.id = "SongSource";
        SetSource.type = "audio/mp3";
        document.getElementById("MediaPlayer").appendChild(SetSource);
        SetSource.src = tracksPath[event.target.id];
        document.getElementById("MediaPlayer").load();
        var autoPlay = document.getElementById("MediaPlayer");
        autoPlay.autoplay=true;
       
    }
    else {
        var SetSource = document.createElement("source");
        SetSource.id = "SongSource";
        SetSource.type = "audio/mp3";
        document.getElementById("MediaPlayer").appendChild(SetSource);
        SetSource.src = tracksPath[event.target.id];
        document.getElementById("MediaPlayer").load();
        var autoPlay = document.getElementById("MediaPlayer");
        autoPlay.autoplay=true;
    };
    document.getElementById("ArtistText").innerHTML = "Aktueller Song: " + tracksArtist[event.target.id] + " " + "-" + " " + tracksSong[event.target.id];

};




function CreateCarFunction() {
    document.getElementsByClassName("CarFunctionsFront")[0].style.display = "grid";



    var a = event.target.id;

    if (a == "LeftUp" || a == "LeftUpButton") {
        fetch("http://192.168.2.110:5000/window/LeftUp");
        document.getElementById("AktuellerStatusFenster").innerHTML = "linkes Fenster geschlossen";
    }
    else if (a == "RightUp" || a == "RightUpButton") {
        fetch("http://192.168.2.110:5000/window/RightUp");
        document.getElementById("AktuellerStatusFenster").innerHTML = "rechtes Fenster geschlossen";
    }
    else if (a == "AllUp" || a == "AllUpButton") {
        fetch("http://192.168.2.110:5000/window/AllUp");
        document.getElementById("AktuellerStatusFenster").innerHTML = "alle Fenster geschlossen";
    }
    else if (a == "LeftDown" || a == "LeftDownButton") {
        fetch("http://192.168.2.110:5000/window/LeftDown");
        document.getElementById("AktuellerStatusFenster").innerHTML = "linkes Fenster offen";
    }
    else if (a == "RightDown" || a == "RightDownButton") {
        fetch("http://192.168.2.110:5000/window/RightDown");
        document.getElementById("AktuellerStatusFenster").innerHTML = "rechtes Fenster offen";
    }
    else if (a == "AllDown" || a == "AllDownButton") {
        fetch("http://192.168.2.110:5000/window/AllDown");
        document.getElementById("AktuellerStatusFenster").innerHTML = "alle Fenster offen";
    };

};

function LockUnlockFunction() {
    document.getElementsByClassName("CarFunctionsFront")[0].style.display = "grid";

    if (event.target.id == "UnlockIcon") {
        document.getElementById("UnlockIcon").style.display = "none";
        document.getElementById("LockIcon").style.display = "block";
        document.querySelector("footer").style.display = "none";
        document.getElementById("OnOffIcon").style.visibility = "hidden";


        var hideWindow = document.getElementsByClassName("WindowCommandButton");
        for (var i = 0; i < hideWindow.length; i++) {

            hideWindow[i].style.visibility = "hidden";
        };
        fetch("http://192.168.2.110:5000/action/lock");
    }

    else {
        document.getElementById("UnlockIcon").style.display = "block";
        document.getElementById("LockIcon").style.display = "none";
        document.querySelector("footer").style.display = "grid";
        document.getElementById("OnOffIcon").style.visibility = "visible";

        var showWindow = document.getElementsByClassName("WindowCommandButton");
        for (var i = 0; i < showWindow.length; i++) {

            showWindow[i].style.visibility = "visible";
        };
        fetch("http://192.168.2.110:5000/action/unlock");

    };
}