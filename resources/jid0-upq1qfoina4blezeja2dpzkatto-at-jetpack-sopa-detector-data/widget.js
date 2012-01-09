self.port.on("add",function(data){
    var text = data.url, //data.url === location.hostname
        href = 'http://' + text,
        link = $("<a target='_blank'>").attr("href", encodeURI(href));
    if(data.sopa == "1") {
        text += " (SOPA supporter)";
        link.text( text );
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