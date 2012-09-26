ide.registerPlugin({
    id: 'org.dsle.saveAndReload',
    name: 'Save And Reload',
    file: 'org.dsle.saveAndReload.js',
    description: 'Save the current file and reload the IDE.',
    version: 0.01
});

ide.saveAndReload = function() {
    ide.saveFile(function(){
        document.location.href = 'index.html';
    });
};

ide.tools().menu.add({
    icon: 'resources/icons/small/arrow_rotate_clockwise.png',
    text: 'Save And Reload (Ctrl + Shift + R)',
    handler: ide.saveAndReload
});

ide.createShortCut({
    key: "r",
    ctrl: true,
    shift: true,
    alt: false,
    fn: ide.saveAndReload
});