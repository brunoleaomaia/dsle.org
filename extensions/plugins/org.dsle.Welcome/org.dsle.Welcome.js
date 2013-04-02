{
    id: "org.dsle.Welcome",
    name: "Welcome Home Page",
    version: 0.01,
    author: "Bruno Maia",
    description: "Open DSLE.ORG Welcome Home Page.",
    load: function() {
        var self = this;
        Dsle.Ide.toolbar.addToolsMenu({
           id: 'btWelcome', 
           text: 'Welcome Page',
           icon: 'resources/icons/small/world.png',
           fn: self.show
        });
        self.show();
    },
    show: function() {
        Dsle.Ide.tabs.openUrl('welcome', 'Welcome', 'Welcome');
    }
}