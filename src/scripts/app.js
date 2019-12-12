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
            application.desktop = new Mrbr.UI.Containers.Desktop({ navlocation: "right" });
            //application.desktop.navlocation = "top";
            document.body.appendChild(application.desktop);
            //appContainer = new Mrbr.UI.Containers.AppContainer();
            //appContainer.on("appcontainer-resize", function (evt) { console.log(evt.source.width, evt.source.height) })
            //let dr = new Mrbr.UI.Test.AppDrawer();            
            //desktop.appendChild(dr);
        })
        .catch(error => { console.log(error) })
})