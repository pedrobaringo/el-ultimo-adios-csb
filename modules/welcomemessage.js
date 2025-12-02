Hooks.once("init", function() {
    console.log("Incializando módulo El Último Adiós")

    game.settings.register("el-ultimo-adios-csb", "firstTimeStart", {
        name: "Forzar mensaje de Bienvenida",
        hint: "Si marcas esta casilla te aparecerá el mensaje de bienvenida en el chat la próxima vez que entres.",
        scope: "client",
        config: true,
        default: false,
        type: Boolean
    })
})

Hooks.once("ready", function() {
	let forzarbienvenida=game.settings.get("el-ultimo-adios-csb", "firstTimeStart");
	let forzarmensaje;
	console.log(forzarmensaje);
	if (forzarbienvenida==true) {
		forzarmensaje=true;
	}
	let versactual=game.modules.get("el-ultimo-adios-csb").version;
	let userisGM=game.user.isGM;
	if (userisGM) {
		if(!game.user.getFlag("el-ultimo-adios-csb", "welcomeMessage") || forzarmensaje==true) {
			console.log('lalala');
			let buttonId=Date.now();
			let buttonId2=Date.now()+2;
			let msg='<h1>Bienvenido al módulo de El Último Adiós</h1><p>Importa los compendios para poder empezar a usar el módulo</p><button id='+buttonId2+' >Importa los compendios</button><button id='+buttonId+' >Ve al Tutorial</button>';
			ChatMessage.create({
        		speaker: {alias:"El Último Adiós"},
        		content: msg,
				whisper : ChatMessage.getWhisperRecipients(game.user.name)
			}).then(() => {
				setTimeout(() => {
				function openInNewTab(url) {
					const win = window.open(url, '_blank');
					win.focus();
				}
				const button = document.getElementById(buttonId);
				if (button) {
					button.addEventListener("click",function () {
						openInNewTab('https://github.com/pedrobaringo/el-ultimo-adios-csb')
					});
				}
				const button2 = document.getElementById(buttonId2);
				if (button2) {
					button2.addEventListener("click",function () {
						let collection2 = game.packs.get("el-ultimo-adios-csb.templateactores");
						let folderident2=''
						if (game.folders.getName("Templates Actores")) {
							folderident2=game.folders.getName("Templates Actores").id;
						}
						let docs2 =  collection2.importAll({folderId: folderident2, folderName: "Templates Actores", keepId: true});
						game.user.setFlag("el-ultimo-adios-csb", "welcomeMessage", true);
						game.user.setFlag("el-ultimo-adios-csb", "lastVersion", game.modules.get("el-ultimo-adios-csb").version);
						ui.notifications.info(game.i18n.localize("Templates importadas. Recargando mundo en 6sec..."), {permanent: true});
						window.setTimeout(window.location.reload.bind(window.location), 7000);
					});
				}
				}, 100);
			});
			game.settings.set("custom-system-builder", "initFormula", "isnpc==1 ? iniciativa:iniciativa+0.01");
			game.settings.set("el-ultimo-adios-csb", "firstTimeStart", false);
		} else if (versactual!=game.user.getFlag("el-ultimo-adios-csb", "lastVersion")) {
			let buttonId=Date.now();
			let buttonId2=Date.now()+2;
			let msg='<h1>Bienvenido al módulo de El Último Adiós</h1><p>Se ha actualizado el módulo desde la última vez que lo usaste. Importa los compendios para tener la última versión de las Templates de actores.</p><button id='+buttonId2+' >Importa los compendios</button><button id='+buttonId+' >Ve al Tutorial</button>';
			ChatMessage.create({
					speaker: {alias:"El Último Adiós"},
					content: msg,
			   whisper : ChatMessage.getWhisperRecipients(game.user.name)
			}).then(() => {
				setTimeout(() => {
				function openInNewTab(url) {
					const win = window.open(url, '_blank');
					win.focus();
				}
				const button = document.getElementById(buttonId);
				if (button) {
					button.addEventListener("click",function () {
						openInNewTab('https://github.com/pedrobaringo/el-ultimo-adios-csb')
					});
				}
				const button2 = document.getElementById(buttonId2);
				if (button2) {
					button2.addEventListener("click",function () {
						let collection2 = game.packs.get("el-ultimo-adios-csb.templateactores");
						let folderident2=''
						if (game.folders.getName("Templates Actores")) {
							folderident2=game.folders.getName("Templates Actores").id;
						}
						let docs2 =  collection2.importAll({folderId: folderident2, folderName: "Templates Actores", keepId: true});
						game.user.setFlag("el-ultimo-adios-csb", "lastVersion", game.modules.get("el-ultimo-adios-csb").version);
						ui.notifications.info(game.i18n.localize("Templates importadas. Recargando mundo en 6sec..."), {permanent: true});
						window.setTimeout(window.location.reload.bind(window.location), 7000);
					});
				}
				}, 500);
			});
      game.settings.set("custom-system-builder", "initFormula", "isnpc==1 ? iniciativa:iniciativa+0.01");
		}
	} else if (!game.user.getFlag("el-ultimo-adios-csb", "welcomeMessage") || forzarmensaje==true) {
		let buttonId=Date.now();
		let msg = '<h1>Bienvenido al módulo de El Último Adiós</h1><button id='+buttonId+' >Ve al Tutorial</button>'
		ChatMessage.create({
        		speaker: {alias:"El Último Adiós"},
        		content: msg,
				whisper : ChatMessage.getWhisperRecipients(game.user.name)
		}).then(() => {
			setTimeout(() => {
			function openInNewTab(url) {
				const win = window.open(url, '_blank');
				win.focus();
			}
			const button = document.getElementById(buttonId);
			if (button) {
				button.addEventListener("click",function () {
					openInNewTab('https://github.com/pedrobaringo/el-ultimo-adios-csb');
				});
			}
			}, 100);
		});
		game.user.setFlag("el-ultimo-adios-csb", "welcomeMessage", true);
		game.settings.set("el-ultimo-adios-csb", "firstTimeStart", false);
	}
})