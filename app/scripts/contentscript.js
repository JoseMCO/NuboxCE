'use strict';

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if( request.message === 'automate' ) {
			fillFields(request.data);
		}
		else if( request.message === 'comp_aux' ) {
			comp_aux(request.data);
		}
		else if( request.message === 'comp_aux2' ) {
			aux(request.data);
		}
		else if( request.message === 'comp_in' ) {
			comp_in_out(request.data, true);
		}
		else if( request.message === 'comp_out' ) {
			comp_in_out(request.data, false);
		}
	}
);

function fillFields(data){
	jQuery(document).ready(function(){ 
		jQuery('#jqg1_RutCtaCte').focus()
	});
	// alert(data);
	// return;
	// data = data.split('\t');
	// jQuery('input[name=NumeroDocumento]').val(data[0]).change();
}

function comp_in_out(total, type) {
	var data = [total, 2, 'Cancela Facturas Clientes', '1102-02 - Banco','1104-01 - Facturas por Cobrar']; // Ingreso
	if (!type){
		data = [total, 1, 'Cancela Facturas Proveedores', '2105-01 - Facturas por Pagar','1102-02 - Banco']; // Egreso
	}
	setTimeout(function(){ 
		jQuery('select[name=ComboRepetirGlosa]').val(1).trigger('change');

		jQuery('select[name=TipoDeAsientoId]').val(data[1]).trigger('change');
		jQuery('input[name=Glosa]').val(data[2]).trigger('change');
		jQuery('select#1_Cuenta').val(jQuery('select#1_Cuenta option:contains('+data[3]+')').val()).trigger('change');
		jQuery('input#1_Debe').val(data[0]).trigger('change');
		jQuery('select#2_Cuenta').val(jQuery('select#1_Cuenta option:contains('+data[4]+')').val()).trigger('change');
		jQuery('input#2_Haber').val(data[0]).trigger('change');
	}, 300);
}

function comp_aux(data) {
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;
	data = data.split('\n');
	jQuery('iframe').trigger('focus');
	jQuery('#jqg1_Valor').trigger('focus').trigger('focus');
	var e = jQuery.Event('keydown');
  e.keyCode = 39;
	setTimeout(function(){ 
		jQuery.each(data, function(index) {
			var cells = this.valueOf().split('\t');
			console.log('#jqg'+(index+1));
			jQuery('#jqg'+(index+1)+'_RutCtaCte').trigger('click');
			jQuery('#jqg'+(index+1)+'_RutCtaCte').val(cells[0].replace(/\./g, '').replace(/-/g, ''));
			jQuery('#jqg'+(index+1)+'_RutCtaCte').trigger('change');
			jQuery('#jqg'+(index+1)+'_NroDocumento').val(cells[1]);
			jQuery('#jqg'+(index+1)+'_Valor').val(cells[2]);
			jQuery('#jqg'+(index+2)+'_Valor').trigger('focus').trigger('focus');
		});
	}, 300);
}

function aux(data) {
	var tdata = data.split('\n');
	var total = tdata[tdata.length-1].split('\t')[2];
	comp_in_out(total, true);
	var tries = 0;
	var check = function(){
		var row = null;
		try {
			row = document.getElementById('ContenidoGlobal')
				.contentWindow.document.getElementById('popupIframe')
				.contentWindow.document.getElementById('ventana_final')
				.contentWindow.document.getElementById('jqg2');
		}
		catch(err) {}
		return row;
	}
	var checkExist = setInterval(function() {
		if (check()) {
			clearInterval(checkExist);
			comp_aux(tdata.slice(0,-2).join('\n'));
		}
		else if (tries > 60) {
			console.log('Time out!');
			clearInterval(checkExist);
		}
		else if (!document.getElementById('ContenidoGlobal')) {
			console.log('ContenidoGlobal x.x!');
			clearInterval(checkExist);
		}
		else {
			tries+=1;
			console.log(tries+': not yet!');
		}
	}, 500);
}

