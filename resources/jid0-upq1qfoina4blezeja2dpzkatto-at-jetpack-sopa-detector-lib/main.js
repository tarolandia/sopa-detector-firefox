var Request = require("request").Request;
var panels = require("panel");
var self = require("self");
var pageMod = require("page-mod");
var widgets = require("widget");
var ss = require("simple-storage");
var Timer = require("timers");

exports.main = function(options, callbacks) {
    
    /* Check settings vars */

    if( !ss.storage.settings ){
        ss.storage.settings = {showMessage: true, checkEnabled: true};
    }
    
    /* Load last list */
    var loadList = function() {
        var req_url_start = "http://94.23.211.221:4567/sopalist";
        Request({
            url: req_url_start,
            onComplete: function(response) {
                ss.storage.blacklist = response.json;
            }
        }).get();
        console.log("List loaded");
    }
    
    //update list every time the addon is loaded and every 12 hrs
    loadList();
    
    var t = Timer.setInterval(loadList,(60*60*12*1000));
   
    /* Panels */
    var urlPanel = panels.Panel({
        contentScriptFile: [self.data.url("jquery-1.7.1.min.js"), self.data.url("widget.js")],
        contentURL: self.data.url("widget.html")
    });
    
    urlPanel.port.on("showSettings", function(data){
        settingsPanel.show();
        urlPanel.hide();
    });
    
    urlPanel.port.emit("bindSettings");

    var settingsPanel = panels.Panel({
        contentScriptFile: [
            self.data.url("jquery-1.7.1.min.js"), 
            self.data.url("settings.js")
        ],
        contentURL: self.data.url("settings.html")
    });
    
    settingsPanel.port.emit("settings", ss.storage.settings);
    
    settingsPanel.port.on("close", function() {
        settingsPanel.hide();
    });
    
    settingsPanel.port.on("save", function(data) {
        if (data.checkE == 1) 
            ss.storage.settings.checkEnabled = true;
        else
            ss.storage.settings.checkEnabled = false;
            
        if (data.showM == 1) 
            ss.storage.settings.showMessage = true;
        else
            ss.storage.settings.showMessage = false;
        
        settingsPanel.hide();
    });
    
    /* Widget */
    var wdg = widgets.Widget({
        id: "maxcdn-icon",
        label: "MaxCDN SOPA detector",
        contentURL: self.data.url("boton_cancel.png"),
        onMessage: function(message) {
            console.log(message);
        },
        panel: urlPanel
    });
    
    
    /* Rock n' Roll */
    pageMod.PageMod({
        include: "*",
        contentScriptWhen: 'end',
        contentScriptFile: [
            self.data.url("jquery-1.7.1.min.js"), 
            self.data.url("sopamessage.js")
        ],
        onAttach: function(worker) {
            worker.on("message", function(dataM) {
                if( ss.storage.settings.checkEnabled ) {
                    url = dataM.currentURL.replace("www.", "");
                    url = url.split("/")[0];
                    for (var key in ss.storage.blacklist) {
                        if(ss.storage.blacklist[key] == url) {    
                            worker.postMessage({action: "sopaM"});
                            urlPanel.port.emit("add", {sopa: 1, url: dataM.currentURL});
                        }    
                    }
                }
            });
        }
    });   
};