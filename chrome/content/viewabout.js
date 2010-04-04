var viewabout =
{
    onLoad : function()
    {
        var ios = Components.classes["@mozilla.org/network/io-service;1"]
                            .getService(Components.interfaces.nsIIOService);
        var menu = document.getElementById("menu_viewAbout");
        var menuitems = menu.getElementsByTagName("menuitem");
        for (var i=0; i < menuitems.length; i++)
        {
            var aboutURL = menuitems[i].value;
            try
            {
                var channel = ios.newChannel(aboutURL,null,null);  // Will throw NS_ERROR_MALFORMED_URI when not available
            }
            catch (e)  // Not valid URL; hide it
            {
                menuitems[i].hidden = true;
            }
        }
    },

    openDialog : function(aboutURL)
    {
        var filename = aboutURL.replace(":","").replace("?","").replace("=","");
        window.openDialog("chrome://viewabout/content/dialogs/"+filename+".xul", filename, "chrome,resizable=yes,width=800,height=500,centerscreen");
    }
};

window.addEventListener("load", function() { viewabout.onLoad(); }, false);
