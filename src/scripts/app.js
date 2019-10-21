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
        desktop;
    assembly.loadManifest(
        [
            //new entry(entry.FileTypes.Class, "Mrbr.UI.Containers.AppContainer")//,
            new entry(entry.FileTypes.Component, "Mrbr.UI.Containers.Desktop")//,
            //new entry(entry.FileTypes.Component, "Mrbr.UI.Test.AppDrawer"),
            //new entry(entry.FileTypes.Class, "Mrbr.Html.Body")
        ]
    ).then(
        result => {
            desktop = new Mrbr.UI.Containers.Desktop();
            //appContainer = new Mrbr.UI.Containers.AppContainer();
            //appContainer.on("appcontainer-resize", function (evt) { console.log(evt.source.width, evt.source.height) })
            //let dr = new Mrbr.UI.Test.AppDrawer();            
            //desktop.appendChild(dr);
        })
})