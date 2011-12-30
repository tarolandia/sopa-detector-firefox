self.on("message", function(data) {
    switch(data.action){
        case "sopaM":
            var textM = "This company support SOPA";
            var body = $("body").css({"position":"relative","margin-top": "40px"});
            var width = parseInt(body.outerWidth()) - 100;
            var left = parseInt(body.css("padding-left").replace("px",""));
            left += parseInt(body.css("margin-left").replace("px",""));
            var message = $("<div id='sopa-mess'>")
            .css({
                "position": "absolute", 
                "top": "-40px", 
                "width": width + "px", 
                "height": "40px",
                "padding": "0 50px",
                "background-color": "black",
                "color": "white",
                "left": "0px"
                }
            ).append($("<p>")
                .css({
                    "text-align": "left",
                    "display": "block",
                    "float": "left",
                    "line-height": "40px",
                    "font-size": "1em",
                    "margin": "0"
                    })
                .text(textM)
            ).append($("<button >")
                .css({
                    "position": "relative", 
                    "float": "right",
                    "margin-top": "9px",
                    })
                .click(function() {
                    $("#sopa-mess").remove();
                    $("body").css({"margin-top": "0","position": "static"});
                    return false;
                })
                .text("close")
            );
                
            body.prepend(message);
            break;
            
    }

});
self.postMessage({ currentURL: location.host });