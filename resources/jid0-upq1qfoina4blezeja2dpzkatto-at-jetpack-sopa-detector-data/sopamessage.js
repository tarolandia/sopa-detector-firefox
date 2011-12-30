self.on("message", function(data) {
    switch(data.action){
        case "sopaM":
            var textM = "SOPA Supporter detected! This company is a known supporter of the  ‘Stop Online Piracy Act.’";
            var body = $("body").css({"position":"relative","margin-top": "40px"});
            var width = parseInt(body.outerWidth()) - 100;
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
                })
            .append($("<div>")
                .css({
                    "position": "relative",
                    "width": width + "px",
                    "margin": "0 auto",
                    "height": "40px"
                    })
                .append($("<p>")
                    .css({
                        "text-align": "center",
                        "line-height": "40px",
                        "font-size": "14px",
                        "margin": "0",
                        "font-weight": "bold",
                        "color": "#ffffff"
                        })
                    .text(textM)
                    .append($("<button title='Close message'>")
                        .css({
                            "margin-top": "9px",
                            "margin-left": "15px",
                            "background-color": "#ffffff",
                            "cursor": "pointer"
                            })
                        .click(function() {
                            $("#sopa-mess").remove();
                            $("body").css({"margin-top": "0","position": "static"});
                            return false;
                        })
                        .text("x")
                    )
                )
            );
                
            body.prepend(message);
            break;
            
    }

});
self.postMessage({ currentURL: location.host });