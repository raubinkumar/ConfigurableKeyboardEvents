
var configCollection;
var configureEvents = function(){
    configCollection = events;
}

var getConfigCollection = function(){
    return configCollection;
}

var events=[
    {
        name: "setupShortcut",
        description : "To open shortcut configuration",
        key1 : KEYCODES.shift,
        key2 : KEYCODES.alt
    },
    {
        name: "moveup",
        description : "To move something up",
        key1 : KEYCODES.up_arrow
    },
    {
        name: "movedown",
        description : "To move something down",
        key1 : KEYCODES.down_arrow
    }
]
//export {configCollection, configureEvents, getConfigCollection};