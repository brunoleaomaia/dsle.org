{
    id: "org.dsle.SaveAndRestart",
    name: "Save And Restart",
    version: 0.01,
    author: "Bruno Maia",
    description: "Save Current File and Reload DSL Encoder IDE.",
    load: function() {
        var self = this;
        ide.toolbar.addToolsMenu({
           id: "btSaveAndRestart",
           text: "Save And Restart (Ctrl+Alt+Shift+S)",
           fn: self.buttonClick,
           icon: "resources/icons/small/page_refresh.png",
           disabled: true
        });
        
        ide.toolbar.get('btSave').on('enable', function() {
            ide.getCmp('btSaveAndRestart').enable();
        });
        
        ide.toolbar.get('btSave').on('disable', function() {
            ide.getCmp('btSaveAndRestart').disable(); 
        });

        ide.createShortCut({
            key: "s",
            ctrl: true,
            shift: true,
            alt: true,
            fn: self.buttonClick
        });
    },
    buttonClick: function() {
        if (!ide.toolbar.get('btSave').isDisabled()) {
            ide.save(function() {
                document.location = './'; 
            });
        }
    }
}