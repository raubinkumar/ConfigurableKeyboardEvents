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