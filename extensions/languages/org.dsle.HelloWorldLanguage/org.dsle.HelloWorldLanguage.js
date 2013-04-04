//JUST A HELLO WORLD PLUGIN
{
    id: "org.dsle.HelloWorldLanguage",
    name: "HelloWorldLanguage",
    version: 0.01,
    author: "Bruno Maia",
    description: "HelloWorldLanguage Plugin",
    load: function() {
        var self = this,
        	icon = ide.config.icons_small + 'accept.png';
        
        ide.toolbar.addToolsMenu({
           id: 'btHelloWorldLanguage', 
           text: 'Hello World',
           icon: icon,
           fn: self.showMessage
        });
        
        self.showMessage();
    },
    showMessage: function() {
        ide.dialog.alert('Hello World', 'Hello <b>World</b>!');
    }
}