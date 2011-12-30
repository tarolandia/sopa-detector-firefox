$(document).ready(function() {
    $("#sopa-settings-cancel").on("click", function() {
        self.port.emit("close");
    });
    $("#sopa-settings-save").on("click", function() {
        checkEnabled = ($("#checkEnabled:checked").length != 0) ? 1 : 0;
        showMessage = ($("#showMessage:checked").length != 0) ? 1 : 0;
        
        self.port.emit("save", {
            checkE: checkEnabled, 
            showM: showMessage,
        });
    });
});

self.port.on("settings", function(data) {
    if (data.showMessage) $("#showMessage").attr("checked", true);
    if (data.checkEnabled) $("#checkEnabled").attr("checked", true);
});