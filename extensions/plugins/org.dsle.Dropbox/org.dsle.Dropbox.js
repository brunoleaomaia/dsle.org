{
    id: "org.dsle.Dropbox",
    name: "Dropbox",
    version: 0.01,
    author: "Bruno Maia",
    description: "Sync your files with your Dropbox account.",
    load: function () {
        var self = this;
        ide.toolbar.addButton({
           id: 'btDropbox', 
           text: 'Dropbox',
           icon: 'resources/icons/large/dropbox.png',
           fn: self.check
        });
        
        ide.dropboxApiUrl = "dropbox/api/";
        
        ide.dropboxOpenPanel = function() {
            ide.tabs.openHtml('<div id="dropbox"><h1>Dropbox</h1><div class="well" style="max-width: 400px; padding: 10px;"><button class="btn btn-large btn-block btn-primary" onClick="ide.dropboxBackup();">Backup to Dropbox</button><button class="btn btn-large btn-block"  onClick="ide.dropboxRestore();">Restore from Dropbox</button><div></div>', 'Dropbox', 'Dropbox');
        };
        
        ide.dropboxBackup = function() {
            var content = ide.getStorage().serialize();
            ide.dialog.wait('Saving to Dropbox...');
            ide.ajax.post({
                url: ide.dropboxApiUrl + 'update.php',
                params: {
                    path: '/',
                    name: 'backup_dsle.org.json',
                    type: 'json',
                    content: content
                },
                onsuccess: function(r) {
                    ide.dialog.close();
                    try {
                        var json = JSON.parse(r.responseText);
                        if (json.success) {
                            ide.console.done('[<b>Dropbox</b>] Backup successful!', r.responseText);
                        } else {
                            if (json.message.indexOf('401') > 0) {
                                ide.dialog.confirm('Login with Dropbox', 'Do you want use your Dropbox Account with DSLE.ORG?', function(){
                                    ide.dialog.wait('Waiting for Dropbox...');
                                    window.open('dropbox/api/login.php');
                                });
                            } else {
                                ide.console.error('[Dropbox] Error', json.message);
                            }
                        }
                    } catch (e) {
                        ide.console.error('[Dropbox] Error', e.message || e);
                    }
                },
                onerror: function(e) {
                     ide.dialog.close();
                     ide.console.error('[Dropbox] Error', e.message || e);
                }
            });
        };
        
        ide.dropboxRestore = function() {
            var content = ide.getStorage().serialize();
            ide.dialog.wait('Restoring from Dropbox...');
            ide.ajax.post({
                url: ide.dropboxApiUrl + 'get.php',
                params: {
                    path: '/backup_dsle.org.json',
                    loadContent: true
                },
                onsuccess: function(r) {
                    ide.dialog.close();
                    try {
                        var json = JSON.parse(r.responseText);
                        if (json.success) {
                            ide.console.done('[<b>Dropbox</b>] Restore successful!', r.responseText);
                            ide.getStorage().unserialize(json.result[0].content);
                            ide.dialog.info('Dropbox', 'Restore successfull. The application will restart now!', function() {
                                document.location = './';
                            });
                        } else {
                            if (json.message.indexOf('401') > 0) {
                                ide.dialog.confirm('Login with Dropbox', 'Do you want use your Dropbox Account with DSLE.ORG?', function(){
                                    ide.dialog.wait('Waiting for Dropbox...');
                                    window.open('dropbox/api/login.php');
                                });
                            } else if (json.message.indexOf('(Status Code: 404)') > 0) {
                                ide.dialog.error('Dropbox', 'Previous Backup Not Found!');
                                ide.console.error('[Dropbox] Error', json.message);
                            } else {
                                ide.console.error('[Dropbox] Error', json.message);
                            }
                        }
                    } catch (e) {
                        ide.console.error('[Dropbox] Error', e.message || e);
                    }
                },
                onerror: function(e) {
                     ide.dialog.close();
                     ide.console.error('[Dropbox] Error', e.message || e);
                }
            });
        };
        
    },
    check: function() {
        ide.dialog.wait('Waiting for Dropbox...');
        ide.ajax.post({
            url: ide.dropboxApiUrl + 'check.php',
            onsuccess: function(r) {
                ide.dialog.close();
                try {
                    var json = JSON.parse(r.responseText);
                    if (json.success) {
                        ide.console.info('[<b>Dropbox</b>] Connected!', r.responseText);
                        ide.dropboxOpenPanel();
                    } else {
                        if (json.message.indexOf('401') > 0) {
                            ide.dialog.confirm('Login with Dropbox', 'Do you want use your Dropbox Account with DSLE.ORG?', function(){
                                ide.dialog.wait('Waiting for Dropbox...');
                                window.open('dropbox/api/login.php');
                            });
                        } else {
                            ide.console.error('[Dropbox] Error', json.message);
                        }
                    }
                } catch (e) {
                    ide.console.error('[Dropbox] Error', e.message || e);
                }
            },
            onerror: function(e) {
                 ide.dialog.close();
                 ide.console.error('[Dropbox] Error', e.message || e);
            }
        });
    }
}