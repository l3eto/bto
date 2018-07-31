function parseHTML(function(){
	var div = document.createElement('div');
	return function(html){
		div.innerHTML = html;
		var el = div.firstChild;
		return div.removeChild(el);
	};
})();

function formatHora(horaCamp, missatgeError) {
	var iChars = '0123456789:';
	var caracterErroni = false;

	var hora = horaCamp.value;
	var horaFinal = "";

	if (hora.length > 0) {
		// Tots caracters correctes?
		for (i = 0 ;i < hora.length;i++) {
			if (iChars.indexOf(hora.charAt(i)) == -1) {
				caracterErroni = true;
				break;
		  	}
		}

		if (caracterErroni == true) {
			if (missatgeError)  missatgeError();
			horaCamp.focus();
		} else {
			// Si ya tiene los :
			if (hora.indexOf(':') != -1) {
				var splitHora = hora.split(':');

				for (i = 0 ;i < splitHora.length ;i++) {
					if (i > 1)  break;

					if (splitHora[i].length == 1) {
						if (splitHora[i].length == 1) {
							if (i == 0) splitHora[i] = "0" + splitHora[i];
							if (i == 1) splitHora[i] = splitHora[i] + "0";
						}
					} else if (splitHora[i].length > 2) {
						splitHora[i] = splitHora[i].substring(0,2);
					}

					horaFinal += (i > 0 ? ':' : '') + splitHora[i];
				}

				if (horaFinal.length == 2)  horaFinal += ":00";

			} else {
				// Si no contiene los :
				if (hora.length == 1 || hora.length == 3) hora = "0" + hora;
				while (hora.length < 4) {
					hora = hora + "0";
				}

				horaFinal = hora.substring(0,2) + ":" + hora.substring(2,4);
			}

			// Despues de arreglar el formato comprobamos que la hora no es
			// mayor que 23 ni los minutos mayores que 59
			var splitHora = horaFinal.split(':');
			var hores = (splitHora[0] > 23 ? "23" : splitHora[0]);
			var minuts = (splitHora[1] > 59 ? "59" : splitHora[1]);
			horaFinal = hores + ":" + minuts;

			horaCamp.value = horaFinal;
		}
	}
}
