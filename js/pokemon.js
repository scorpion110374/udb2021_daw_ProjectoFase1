$( document ).ready(function() {

	//Fecha de hoy
	n =  new Date();
	y = n.getFullYear();
	m = n.getMonth() + 1;
	d = n.getDate();
	h = n.getHours();
	mn = n.getMinutes();
	s = n.getSeconds();

	var todayDate =  m + "/" + d + "/" + y;
	var nowTime = h + ":" + mn + ":" + s;

	document.getElementById("date").innerHTML = "Todos los derechos reservados. " + todayDate;

	// Validar Pin
	$('#pin').on('change',function(){
		if($(this).val() == '1234'){
			localStorage.setItem('pinUsuario','1234');
			resetSaldo = true;
			window.location.href = 'menu1.html';
			console.log(saldo);
			console.log(resetSaldo);
		}else{
			Swal.fire({
			  icon: 'error',
			  title: 'Oops...',
			  text: 'Pin incorrecto!',
			  footer: '<a href="index.html">Intente de nuevo</a>'
			})
		}
	});

	//Cerrar sesion
	$('#salir').on('click',function(){
		localStorage.removeItem('pinUsuario');
		window.location.href = 'index.html';
		saldo = 0;
		transacciones = [];
			console.log(saldo);
			console.log(resetSaldo);		
	});

	//Abrir formulario modal de depositos
	$('#FormularioDepositos').on('shown.bs.modal', function () {
		$('#valorAbono').val('');
  		$('#valorAbono').trigger('focus');
	})

	//Validar y aplicar abono
	$('#btnAplicarAbono').on('click',function(){
		if($('#valorAbono').val() <= 0){
			Swal.fire({
			  icon: 'error',
			  title: 'Valor no valido',
			  text: 'Valor debe ser mayo a cero'
			})			
		}else{
			saldo = parseFloat(saldo) + parseFloat($('#valorAbono').val());
			transacciones.push({fTransaccion:todayDate + " " + nowTime,vTransaccion:parseFloat($('#valorAbono').val()), dTransaccion :'Abono ATM'});
			Swal.fire({
			  icon: 'success',
			  title: 'Saldo actualizado',
			  text: 'Su nuevo saldo es $ '+ saldo
			})			
			$('#FormularioDepositos').modal('hide');
			console.log(saldo);
			console.log(resetSaldo);			
		}
	});

	//Abrir formulario modal de Retiros
	$('#FormularioRetiros').on('shown.bs.modal', function () {
		$('#valorRetiro').val('');
  		$('#valorRetiro').trigger('focus')
	})	

	//Validar y aplicar retiro
	$('#btnAplicarRetiro').on('click',function(){
		if(saldo < $('#valorRetiro').val()){
			Swal.fire({
			  icon: 'error',
			  title: 'Saldo insuficiente!',
			  text: 'Su saldo actual es de $' - saldo.toFixed(2)
			})			
		}else{
			saldo = parseFloat(saldo) - parseFloat($('#valorRetiro').val());
			transacciones.push({fTransaccion:todayDate + " " + nowTime,vTransaccion:parseFloat($('#valorRetiro').val())*-1,dTransaccion:'Retiro ATM'});
			Swal.fire({
			  icon: 'success',
			  title: 'Saldo actualizado',
			  text: 'Su nuevo saldo es $ '+ saldo
			})			
			$('#FormularioRetiros').modal('hide');	
			console.log(saldo);
			console.log(resetSaldo);
		}
	});

	//Abrir modal para Historial de Transacciones
	$('#modalTransacciones').on('shown.bs.modal', function () {
		console.log(transacciones);
		fillTable(transacciones);
	});

	//Click Consultas
	$('#consultas').on('click',function(){
		window.location.href = 'menu3.html';
			console.log(saldo);
			console.log(resetSaldo);		
	});

	//Click Inicio
	$('#inicio').on('click',function(){
		window.location.href = 'menu1.html';
	});

	//Abrir formulario pago de servicios
	$('#FormularioServicios').on('shown.bs.modal', function () {
		$('#tipoServicio').val('');
		$('#numReferencia').val('');
		$('#valorPago').val(''); 
  		$('#tipoServicio').trigger('focus')
	})	

	//Validar y aplicar retiro
	$('#btnAplicarPago').on('click',function(){
		if($('#tipoServicio').val() == null || $('#numReferencia').val() == null || $('#valorPago').val() == null){
			Swal.fire({
			  icon: 'error',
			  title: 'Datos Incopmpletos',
			  text: 'Debe llenar todos los campos'
			})			
		}else{
			saldo = parseFloat(saldo) - parseFloat($('#valorPago').val());
			transacciones.push({fTransaccion:todayDate + " " + nowTime,vTransaccion:parseFloat($('#valorPago').val())*-1,dTransaccion:'Pago Servicio de ' + $('#tipoServicio').val() + ' Ref: '+$('#numReferencia').val()});
			Swal.fire({
			  icon: 'success',
			  title: 'Pago efectuado',
			  text: 'Su nuevo saldo es $ ' + saldo
			})			
			$('#FormularioServicios').modal('hide');	
			console.log(saldo);
			console.log(resetSaldo);
			console.log(transacciones);
		}
	});


});

	//Fecha de hoy
	n =  new Date();
	y = n.getFullYear();
	m = n.getMonth() + 1;
	d = n.getDate();
	h = n.getHours();
	mn = n.getMinutes();
	s = n.getSeconds();

	var todayDate =  m + "/" + d + "/" + y;
	var nowTime = h + ":" + mn + ":" + s;


	//Inicializar variable de saldo inicial
	if(resetSaldo = true){
		saldo = 500;
		transacciones = [{fTransaccion:todayDate + " " + nowTime,vTransaccion:500,dTransaccion:'SaldoInicial'}];

		resetSaldo = false;
	}

function fillTable(data){
	for (var i = 0; i < data.length; i++) {
  		$('table#tabTransacciones tbody').append(
  			'<tr>'+
  			'<td>'+ data[i].fTransaccion +'</td>'+
  			'<td class="text-right">$ '+ data[i].vTransaccion.toFixed(2) +'</td>'+
  			'<td>'+ data[i].dTransaccion +'</td>'+ 
  			'</tr>'
  		);
  	};	
}