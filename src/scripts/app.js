const application = {};
const assembly = Mrbr.System.Assembly;
assembly.onReady(
    {
        assemblyResolvers: [
            { replace: new RegExp("^Mrbr.UI\\.", "i"), with: "ui/" },
            { replace: new RegExp("^Mrbr\\.", "i"), with: "mrbrAssembly/" },
            { replace: new RegExp("^mrbrAssembly\\/\.", "i"), with: function(entry){return entry.toLowerCase()} },
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
            application.desktop = new Mrbr.UI.Containers.Desktop({ navlocation: "bottom" });
            //application.desktop.navlocation = "top";
            document.body.appendChild(application.desktop);
            //appContainer = new Mrbr.UI.Containers.AppContainer();
            //appContainer.on("appcontainer-resize", function (evt) { console.log(evt.source.width, evt.source.height) })
            //let dr = new Mrbr.UI.Test.AppDrawer();            
            //desktop.appendChild(dr);

            const componentManifest = Mrbr.UI.Utils.Utils.componentManifest,
                entry = Mrbr.System.ManifestEntry;
            //debugger
            assembly.loadManifest(componentManifest("Mrbr.UI.Dialogs.Dialog", true, true))
                .then(result => {
                    function showDialog(id) {
                        //let dialog;
                        //_statusDialog.textContent = 'Dialog showed...';
                        //_showDialogButton.disabled = true;
                        //if (!dialog) {
                        //var id = 'dialog';
                        // Instanciate the Dialog Box
                        //dialog = new DialogBox(id, callbackDialog);
                        //let dialog = document.getElementById("dialog")
                        //let dialog = document.createElement("mrbr-ui-dialogs-dialog")
                        let dialog = document.createElement("mrbr-dialog-1")// instanceof Mrbr.UI.Dialogs.Dialog
                        dialog.contentTemplate = `<p>${id}</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.</p>`
                        dialog.title = `Dialog: ${id}`;
                        dialog.style = 'min-width:400px; min-height:280px;width:400px;height:400px'
                        if (id !== "one") {
                            dialog.pin = "pinned";
                        }
                        //dialog.classList.add("dialog")
                        dialog.id = id;
                        dialog.container = application.desktop.desktop;
                        dialog.container.appendChild(dialog);
                        let tb = document.getElementsByTagName("nav")[0];
                        dialog.taskbarContainer = tb;
                        window.requestAnimationFrame(() => {
                            dialog.showDialog();
                        })
                        //dialog.closing(dialog.destroy.bind(dialog), false)

                        //}
                    }
                    class mrbrDialog1 extends Mrbr.UI.Dialogs.Dialog {
                        constructor(config){
                            super(config)
                        } 
                        connectedCallback() {
                            this._base_connectedCallback = Mrbr.UI.Dialogs.Dialog.prototype.connectedCallback.bind(this)
                            this._base_connectedCallback()
                            this.title = this.title.toUpperCase()
                                    //window.requestAnimationFrame(()=>{                                        this.title= "My Title";                                    })
                            // browser calls this method when the element is added to the document
                            // (can be called many times if an element is repeatedly added/removed)
                        }
                    }
                    window.requestAnimationFrame(()=>{                        
                        //customElements.define("mrbr-dialog-1", mrbrDialog1,{ extends: customElements.get("mrbr-ui-dialogs-dialog")}) ;
                        customElements.define("mrbr-dialog-1", mrbrDialog1) ;
                        //customElements.define("mrbr-dialog-1", mrbrDialog1,{ extends: "mrbr-ui-dialogs-dialog"}) ;
                        //customElements.define("mrbr-dialog-1", mrbrDialog1,{ extends: "Mrbr.UI.Dialogs.Dialog"}) ;
                        showDialog("one");
                        showDialog("two");
                        showDialog("three");
                    })

                    //customElements.define("mrbr-controls-tables-table", MrbrControlsTablesTable, {extends:"table"})
                    //assembly .then(()=>{ return                     })
                    //.loadComponent("Mrbr.UI.Controls.Tables.TableElement")
                    assembly.loadComponent("Mrbr.UI.Controls.Tables.Table")
                    .then(()=>{

                        // let tbl = document.createElement("mrbr-ui-controls-tables-table")
                        // document.body.appendChild(tbl);
                        // console.log(tbl)                    
                        
                        let tbl2 = Mrbr.UI.Controls.Tables.Table.create({name:"t2",id:"sdfghjk"});
                        //let tbl2 = new Mrbr.UI.Controls.Tables.Table({name:"t2",id:"sdfghjk"});
                        //tbl2.init();
                        document.body.appendChild(tbl2);
                        console.log(tbl2.id)                    
                        //console.log(tbl2.name)                    

                    }).catch(error=>console.log(error))
                })
                .catch(error => { console.log(error) })

            // let d = new Mrbr.UI.Widgets.AssemblyMonitor({desktop:application.desktop})
            // // d.style.width = "24px"
            // // d.style.height = "24px"
            // // d.style.backgroundColor = "red";
            // application.desktop.controlBox.prepend(d);
        })
        .catch(error => { console.log(error) })
})
class MrbrControlsTablesTable extends HTMLTableElement{
    constructor(){
        super();
    }
}