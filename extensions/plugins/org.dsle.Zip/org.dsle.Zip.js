{
    id: "org.dsle.Zip",
    name: "Zip and Download",
    version: 0.01,
    author: "Bruno Maia",
    description: "Zip All Files and Download.",
    load: function () {
        var self = this;
        ide.loadScript('https://raw.github.com/Stuk/jszip/master/jszip.js', function() {
            ide.toolbar.addToolsMenu({
                text: 'Zip All and Download',
                icon: 'resources/icons/small/compress.png',
                fn: self.zipAndDownload
            });
        });
    },
    zipAndDownload: function () {
        var zip = new JSZip();
        ide.getStorage().get({
            loadContent: true,
            onSuccess: function (results) {
                if (results && results.length) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].type !== 'folder') {
                            zip.file(results[i].path + results[i].name, results[i].content);
                        } else {
                            zip.folder(results[i].path + results[i].name);
                        }
                    }
                    location.href="data:application/zip;base64,"+zip.generate();
                }  
            }
        });
    }
}