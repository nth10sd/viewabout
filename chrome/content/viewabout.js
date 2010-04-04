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

    openUrl : function(aboutURL)
    {
      var filename = aboutURL.replace(":","").replace("?","").replace("=","");
      var versionCheck = Components.classes["@mozilla.org/xpcom/version-comparator;1"]
                                   .getService(Components.interfaces.nsIVersionComparator);

      if (Application.id == "{3550f703-e582-4d05-9a08-453d09bdfdc6}" &&
          versionCheck.compare(Application.version, "3.0") >= 0) {

        // This is Thunderbird
        let tabmail = document.getElementById("tabmail");
        if (!tabmail) {
          // Try opening new tabs in an existing 3pane window
          let mail3PaneWindow =
            Components.classes["@mozilla.org/appshell/window-mediator;1"]
                      .getService(Components.interfaces.nsIWindowMediator)
                      .getMostRecentWindow("mail:3pane");
          if (mail3PaneWindow) {
            tabmail = mail3PaneWindow.document.getElementById("tabmail");
            mail3PaneWindow.focus();
          }
        }

        const tabParams = {
          contentPage: aboutURL,
          clickHandler: "specialTabs.aboutClickHandler(event);"
        };

        if (tabmail)
          tabmail.openTab("contentTab", tabParams);
        else
          window.openDialog("chrome://messenger/content/", "_blank",
                            "chrome,dialog=no,all", null,
                            { tabType: "contentTab",
                              tabParams: tabParams });
      }
      else
        // This is SeaMonkey/Firefox etc
        window.openDialog("chrome://viewabout/content/dialogs/"+filename+".xul", filename, "chrome,resizable=yes,width=800,height=500,centerscreen");
    }
};

window.addEventListener("load", function() { viewabout.onLoad(); }, false);
