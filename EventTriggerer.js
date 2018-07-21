//import {configureEvents, getConfigCollection} from './EventConfig';
var configCollection;
var pressedKey;
$(document)
.on('keydown', function(event){
    configCollection = getConfigCollection();
    if(!pressedKey){
        pressedKey = event.keyCode;
    }
    triggerEvent(event)
})
.on('keyup', function(event){
    pressedKey = undefined;
})

triggerEvent = function(event){
    event.preventDefault();
    if($('#configPopUp') && $('#configPopUp').is(':visible')){
        $(document.activeElement).trigger('changeKey', [{pressedKey : pressedKey, latestKey: event.keyCode}]);
        return true;
    }
    var eventDetail = _.find(configCollection, function(config){
        if(pressedKey != event.keyCode){
            return parseInt(config.key1) === pressedKey && parseInt(config.key2) === event.keyCode;
        }else{
            return parseInt(config.key1) === event.keyCode && (config.key2 === undefined || config.key2 === null || config.key2 === "");
        }
    })
    if(eventDetail){
        $(event.target).trigger(eventDetail.name);
    }
}



// UI Setup for key configuration and handler.

$(document).on("setupShortcut", function(e){
    var configCollection = getConfigCollection();
    var tableEle = "";
    _.each(configCollection, function(config){
       var key1 =  _.findKey(KEYCODES, function(code){
            return code == config.key1;
        });
        var key2 = _.findKey(KEYCODES, function(code){
            return code == config.key2;
        });
        var combination = (key1 ? key1 : "") + (key2 ? "+" + key2 : "");
        tableEle = tableEle + "<tr> <td><b>"+ config.description + ":</b> </td><td> <input class = 'keys-input' id = '"+config.name+"'type = 'text' placeholder = 'Press Key of your choice' value = '"+ combination +"' /></td></tr>"
    });
    var format = "<table><thead><tr><td><b>Shortcut Description</b></td><td><b>Key Combination</b></td></tr></thead><tbody>"+ tableEle +"</tbody></table>"
    
    if($("#configPopUp").length == 0){
        var popup = "<div id='configPopUp' title='Configure shortcut keys (Hit Esc to close)' style='display: none;'>data</div>";
        document.body.innerHTML += popup;
    }
    $("#configPopUp").empty();
    $("#configPopUp").hide();
    $("#configPopUp").append(format);
    $( "#configPopUp" ).dialog({
        resizable: true,
        height: "auto",
        width: "auto",
        modal: true,
        // buttons: {
        //     "Save (No need : Actions automatically saved)": function() {
        //     $( this ).dialog( "close" );
        //     }
        // }
    });
    var modal = document.getElementById('configPopUp');
    var x = e.clientX, y = e.clientY;
    modal.style.display = "block";
});
$(document).on("changeKey", function(event, data){
    var key2;
    var key1 =  _.findKey(KEYCODES, function(code){
            return code == data.latestKey.toString();
        });
    if(data.pressedKey != data.latestKey){
        key2 = _.findKey(KEYCODES, function(code){
            return code == data.pressedKey.toString();
        });
    }
    var combination = (key2 ? key2 + "+" : "") + (key1 ? key1 : "");
    console.log(combination);
    if(document.activeElement.className === "keys-input"){
        var id = document.activeElement.id;
        var configCollection = getConfigCollection();
        var index = _.findIndex(configCollection, function(config){
            return config.name === id;
        });
        var newKey1 = data.pressedKey.toString();;
        var newKey2 = data.pressedKey === data.latestKey ? undefined : data.latestKey.toString();;
        var duplicateIndex = _.findIndex(configCollection, function(config){
            return config.key1 === newKey1 && config.key2 === newKey2 && config.name != id;
        });
        $(document.activeElement).val(combination);
        if(duplicateIndex != -1 ){
            $(document.activeElement).css('background', 'red');
            return;
        }
        $(document.activeElement).css('background', 'white');
        configCollection[index].key1 = newKey1;
        configCollection[index].key2 = newKey2;
    }
})