const application = {};
const assembly = Mrbr.System.Assembly;
assembly.onReady(
    {
        assemblyResolvers: [
            { replace: new RegExp("^Mrbr.UI\\.", "i"), with: "ui/" },
            { replace: new RegExp("^Mrbr\\.", "i"), with: "mrbrAssembly/" },
            { replace: new RegExp("^App\\.", "i"), with: "scripts/app/" },
            { replace: new RegExp("\\.", "g"), with: "/" }
        ]
    }
).then(_ => {
    const entry = Mrbr.System.ManifestEntry;
    let body,
        appContainer,
        desktop,
        innerDock;

    assembly.loadManifest(Mrbr.UI.Utils.Utils.componentManifest("Mrbr.UI.Containers.Desktop", true, true).concat([new entry(entry.FileTypes.Style, "Mrbr.UI.Style.Default")])).then(
        result => {
            application.desktop = new Mrbr.UI.Containers.Desktop({ navlocation: "top" });
            //application.desktop.navlocation = "top";
            document.body.appendChild(application.desktop);
            //appContainer = new Mrbr.UI.Containers.AppContainer();
            //appContainer.on("appcontainer-resize", function (evt) { console.log(evt.source.width, evt.source.height) })
            //let dr = new Mrbr.UI.Test.AppDrawer();            
            //desktop.appendChild(dr);
            let dialog;
            function showDialog(id) {
                //_statusDialog.textContent = 'Dialog showed...';
                //_showDialogButton.disabled = true;
                if (!dialog) {
                    //var id = 'dialog';
                    // Instanciate the Dialog Box
                    //dialog = new DialogBox(id, callbackDialog);
                    //let dialog = document.getElementById("dialog")
                    let dialog = document.createElement("mrbr-ui-dialogs-dialog")
                    dialog.style = 'min-width:400px; min-height:280px;'
                    //dialog.classList.add("dialog")
                    dialog.id = id;
                    dialog.container = application.desktop.desktop;
                    dialog.container.appendChild(dialog);
                    let tb = document.getElementsByTagName("nav")[0];
                    dialog.taskbarContainer = tb;
                    window.requestAnimationFrame(() => {
                        dialog.showDialog();
                    })
                    dialog.title = `Dialog: ${id}`;
                    dialog.closing( dialog.destroy.bind(dialog) , false)
                }
            }
            showDialog("one");
            showDialog("two");


        })
        .catch(error => { console.log(error) })
})