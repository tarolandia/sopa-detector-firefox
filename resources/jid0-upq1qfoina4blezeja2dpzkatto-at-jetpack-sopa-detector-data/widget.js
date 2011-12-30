self.port.on("add",function(data){
    link = $("<a href='http://"+ data.url+"' target='_blank'>").text(data.url);
    if(data.sopa == "1") {
        var text = " (SOPA detected)";
        link.text( link.text() + text);
        $("#list")
            .prepend($("<br>"))
            .prepend(link);
    }   
});
self.port.on("bindSettings",function(data){
    $("#sopa-settings-button").on("click", function() {
        self.port.emit("showSettings", {});
    });
});