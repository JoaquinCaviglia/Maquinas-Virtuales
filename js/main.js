window.addEventListener("load", inicio);

let miSistema = new Sistema();
function inicio() {

  document.querySelector("#btnRegistrar").addEventListener("click", redirectToRegistro);
  document.querySelector("#btnRegistrarse").addEventListener("click", registrar);
  document.querySelector("#btnIngresar").addEventListener("click", login);
  document.querySelector("#btnLogout").addEventListener("click", logout);
  document.querySelector("#btnLogoutCliente").addEventListener("click", logout);
  document.querySelector("#btnAlquilarInstancia").addEventListener("click", alquilarInstancia);
  document.querySelector("#btnCambiarFiltroInsancias").addEventListener("click", cargarTablaVmsAlquiladas);
  document.querySelector("#btnReporteAdmin").addEventListener("click", reporteAdmin);
  document.querySelector("#btnVolverDashAdmin").addEventListener("click", redirectToDashAdmin);
  document.querySelector("#btnInstanciasBajar").addEventListener("click", pendientesDeBaja)

  //Creamos funcion start() que precargue todo lo que necesito al inicio
  start();
}


function start() {
  // Precargo Admins
  miSistema.precargarAdmins();
  miSistema.precargarInstancias();
  miSistema.precargarAlquileres();
  redirectTo("#divInicioSesion");
}

function redirectTo(ventana) {
  let aux = "";
  let misVentanas = document.querySelectorAll(".ventana");
  for(let i = 0; i < misVentanas.length; i++) {
    aux = misVentanas[i];
    aux.style.display = "none";
  }
  document.querySelector(ventana).style.display = "block";
}

function redirectToDashAdmin(){
  redirectTo("#divDashboardAdmin")
}

function redirectToMenuStock() {
  redirectTo("#divControlStock");
}

function redirectToMenuInstancias() {
  redirectTo();
}

function pendientesDeBaja() {
  redirectTo("#divDashInstanciasPendientes");
  document.querySelector("#BodyTablaInstanciasPendientes").innerHTML = "";
  let aux = "";
  for(let i = 0; i < miSistema._array_alquileres.length; i++) {
    aux = miSistema._array_alquileres[i];
    if(aux._maquinaVirtual._estado == "Pendiente Baja") {
      cargarInstanciasPendientes(aux);
    }
   misBotonesVmsAlquiladas = document.querySelectorAll(".btnTablaInstPendientes");
    for(let j = 0; j < misBotonesVmsAlquiladas.length; j++) {
      auxBtn = misBotonesVmsAlquiladas[j];
      auxBtn.addEventListener("click", cambiarEstadoVmCancelar);
    }
  }
}

function cambiarEstadoVmCancelar() {
  let id_vm = this.getAttribute("data-id");
  miSistema.cambiarEstadoVmCancelar(id_vm);
  pendientesDeBaja();  
}

function cargarInstanciasPendientes(instPendiente) {

  let newTableDataNombre = "";
  let newTDEstado = "";
  let newTableDataBtn = "";
  let newTableRow = "";
  let newTableDataBajar = "";

  // td para nombre
  newTableDataNombre = document.createElement("td");
  newTableDataNombre.innerHTML = instPendiente._maquinaVirtual._tipoinstancia._nombre;
  //td para estado
  newTDEstado = document.createElement("td");
  newTDEstado.innerHTML = instPendiente._maquinaVirtual._estado;
  
  
  // td para boton Bajar
  newTableDataBtn = document.createElement("td");
  //tr para tds
  newTableRow = document.createElement("tr");

  // Creo un input y luego le seteo los atributos (type, class y id)
  newTableDataBajar = document.createElement("input");
  newTableDataBajar.setAttribute("type", "button");
  newTableDataBajar.setAttribute("class", "btnTablaInstPendientes");
  newTableDataBajar.setAttribute("data-id", instPendiente._alquilerid);
  newTableDataBtn.appendChild(newTableDataBajar);
  newTableDataBajar.value = "Bajar";
  
  
  //appendeo tds dentro de tr
  newTableRow.appendChild(newTableDataNombre);
  newTableRow.appendChild(newTDEstado);
  // newTableRow.appendChild(newTableDataBtn);
  newTableRow.appendChild(newTableDataBtn);

  //a un talbe
  let table = document.querySelector("#BodyTablaInstanciasPendientes");
  table.appendChild(newTableRow);
}

function reporteAdmin(){
  redirectTo("#divDashboardAdminReport")
  let contC7small = 0;
  let contC7Medium = 0;
  let contC7Large = 0;
  let contR7Small = 0;
  let contR7Medium = 0;
  let contR7Large = 0;
  let contI7Medium = 0;
  let contI7Large = 0;
  let contVecesEncC7Small = 0;
  let contVecesEncC7Medium = 0;
  let contVecesEncC7Large = 0;
  let contVecesEncR7Small = 0;
  let contVecesEncR7Medium = 0;
  let contVecesEncR7Large = 0;
  let contVecesEncI7Medium = 0;
  let contVecesEncI7Large = 0;
  
    for(let j = 0; j< miSistema._historial_alquileres.length; j++){
      let unObjeto = miSistema._historial_alquileres[j];
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "c7Small") {
        contC7small++;
        contVecesEncC7Small = contVecesEncC7Small + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "c7Medium") {
        contC7Medium++;
        contVecesEncC7Medium = contVecesEncC7Medium + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "c7Large") {
        contC7Large++;
        contVecesEncC7Large = contVecesEncC7Large + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "r7Small") {
        contR7Small++;
        contVecesEncR7Small = contVecesEncR7Small + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "r7Medium") {
        contR7Medium++;
        contVecesEncR7Medium = contVecesEncR7Medium + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "r7Large") {
        contR7Large++;
        contVecesEncR7Large = contVecesEncR7Large + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "i7Medium") {
        contI7Medium++;
        contVecesEncI7Medium = contVecesEncI7Medium + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "i7Large") {
        contI7Large++;
        contVecesEncI7Large = contVecesEncI7Large + unObjeto._maquinaVirtual._cantEncendidos;
      }
    }

  let tipoC7small = ["c7Small", contC7small, (contC7small*20)+(contVecesEncC7Small*2.50)];
  let tipoC7Medium = ["c7Medium",contC7Medium, (contC7Medium*30)+(contVecesEncC7Medium*3.50)];
  let tipoC7Large = ["c7Large",contC7Large, (contC7Large*50)+(contVecesEncC7Large*6)];
  let tipoR7small = ["r7Small",contR7Small, (contR7Small*35)+(contVecesEncR7Small*4)];
  let tipoR7Medium = ["r7Medium",contR7Medium, (contR7Medium*50)+(contVecesEncR7Medium*6.50)];
  let tipoR7Large = ["r7Large",contR7Large, (contR7Large*60)+(contVecesEncR7Large*7)];
  let tipoI7Medium = ["i7Medium",contI7Medium, (contI7Medium*30)+(contVecesEncI7Medium*3.50)];
  let tipoI7Large = ["i7Large", contI7Large, (contI7Large*50)+(contVecesEncI7Large*6.50)];
  let sumaTotal = tipoC7small[2] + tipoC7Medium[2] + tipoC7Large[2] + tipoR7small[2] + tipoR7Medium[2] + tipoR7Large[2] + tipoI7Medium[2] + tipoI7Large[2];

  document.querySelector("#tablaAdminReporte").innerHTML="";
  if(contC7small != 0) {
    crearTablaReporte(tipoC7small);
  } 
  if(contC7Medium != 0) {
    crearTablaReporte(tipoC7Medium);
  }
  if(contC7Large != 0) {
    crearTablaReporte(tipoC7Large);
  }
  if(contR7Small != 0) {
    crearTablaReporte(tipoR7small);
  }
  if(contR7Medium != 0) {
    crearTablaReporte(tipoR7Medium);
  }
  if(contR7Large != 0) {
    crearTablaReporte(tipoR7Large);
  }
  if(contI7Medium != 0) {
    crearTablaReporte(tipoI7Medium);
  }
  if(contI7Large != 0) {
    crearTablaReporte(tipoI7Large);
  }
  document.querySelector("#pCostoTotalReporteAdmin").innerHTML = "Ganancia hasta el momento: " + sumaTotal;
}

function crearTablaReporte(unReporte){
  
  let newTableDataTipoInstancia = "";
  let tdCostoTotal = "";
  let newTableCantidadAlquileres = "";
  let tr = "";
  let tabla = "";
  
  newTableDataTipoInstancia = document.createElement("td");
  newTableDataTipoInstancia.textContent = unReporte[0];
  
  newTableCantidadAlquileres = document.createElement("td");
  newTableCantidadAlquileres.textContent = unReporte[1];

  tdCostoTotal = document.createElement("td");
  tdCostoTotal.textContent = unReporte[2];

  tr = document.createElement("tr");
  tr.appendChild(newTableDataTipoInstancia);
  tr.appendChild(newTableCantidadAlquileres);
  tr.appendChild(tdCostoTotal);

  tabla = document.querySelector("#tablaAdminReporte");
  tabla.appendChild(tr);
  
}

function login() {

  let unUsuario = document.querySelector("#txtNombreUsuarioIncioSesion").value;
  let unaContrasenia = document.querySelector("#txtContraseniaIncioSesion").value;
  let resultado = false;
  unUsuario = unUsuario.toUpperCase();
  for(let i = 0 ; i < miSistema._array_usuarios.length; i++){
    let aux = miSistema._array_usuarios[i];
    if(aux._username == unUsuario){
      if(aux._perfil._estado == "Activo"){
        resultado = true;
      }
    }
    
  }
  if(unUsuario.length > 2 || unaContrasenia.length > 2) {
    if(miSistema.login(unUsuario, unaContrasenia) && miSistema._usuario_logueado._perfil instanceof Admins) {
      redirectTo("#divDashboardAdmin");
      cargarDashboardAdmin();
    }
    else if(miSistema.login(unUsuario.toUpperCase(), unaContrasenia) && resultado == true && miSistema._usuario_logueado._perfil instanceof Cliente) {
      cargarDashboardCliente();
      redirectTo("#divDashboardCliente");
    }else {
      mostrarMensaje("#pResultadoInicioSesion", "Credenciales incorrectas, vuelva a intentar");
    }  
  }else {
    mostrarMensaje("#pResultadoInicioSesion", "Complete los datos por favor");
  }  
}

function logout() {
  miSistema._usuario_logueado = null;
  redirectTo("#divInicioSesion")
}

function redirectToRegistro () {
  redirectTo("#divRegistroUsuario");
}

function cargarDashboardAdmin() { 
  let unObjetoUsuario = "";
  let aux = "";
  let misBotones = "";
  // Lo primero que hago es vaciar la tabla para que no me los duplique
  document.querySelector("#tablaUsuarios").innerHTML = "";
  document.querySelector("#tablaInstancias").innerHTML = "";

  // Recorro array de usuarios y los voy cargando de a una fila en la tabla
  for(let i = 0; i < miSistema._array_usuarios.length; i++) {
    unObjetoUsuario = miSistema._array_usuarios[i];
    if(unObjetoUsuario._perfil instanceof Cliente) {
      cargarTabla(unObjetoUsuario);
      misBotones = document.querySelectorAll(".btnTablaAdmin");
      for(let j = 0; j < misBotones.length; j++) {
        aux = misBotones[j];
        aux.addEventListener("click", cambiarEstadoUsuario);
      }
    } 
  }

  // Cargo tabla con stock de instancias.
  let unObjetoInstancia = "";
  let misBotonesStock = ""
  let auxBtn = "";

  for(let i = 0; i < miSistema._tipo_instancias.length; i++) {
    unObjetoInstancia = miSistema._tipo_instancias[i];
    cargarTablaInstancias(unObjetoInstancia);
    misBotonesStock = document.querySelectorAll(".btnTablaInstanciasAdmin");
    for(let j = 0; j < misBotonesStock.length; j++) {
      auxBtn = misBotonesStock[j];
      auxBtn.addEventListener("click", identificarStock);
    }
  }   
}

function identificarStock() {
  let id_instancia = this.getAttribute("data-id");
  let idCampo = miSistema.buscarStock(id_instancia); 
  let cantidad = document.querySelector(`#${idCampo}`).value;
  miSistema.modificarStock(idCampo, cantidad); 
  cargarDashboardAdmin();
}

function cambiarEstadoVm() {
  let id_vm = this.getAttribute("data-id");
  miSistema.cambiarEstadoVm(id_vm);
  cargarDashboardCliente();
}

function cambiarEstadoUsuario() {
  let id_usuario = this.getAttribute("data-id");
  miSistema.cambiarEstado(id_usuario);
  for(let i = 0; i < miSistema._array_usuarios.length; i++ ) {
    let unUsuario = miSistema._array_usuarios[i];
    if(unUsuario._id == id_usuario) {
      if(unUsuario._perfil._estado == "Bloqueado") {
        miSistema.devolverInstAlStock(id_usuario);
      }
    }
  } 
  cargarDashboardAdmin();
}

function cargarTablaInstancias(tipoinstancia) {
  let newTableDataTipo = "";
  let newTableDataStock = "";
  let newTableDataText = "";
  let newTableDataBoton ="";
  let newInputText = "";
  let newInputBoton = "";

  // td para tipo de instancia, ej: c7.Small
  newTableDataTipo = document.createElement("td");
  newTableDataTipo.textContent = tipoinstancia._nombre;
  
  // td para stock actual
  newTableDataStock = document.createElement("td");
  newTableDataStock.textContent = tipoinstancia._stock;
  
  // td para ingresar nuevo stock
  newTableDataText = document.createElement("td");

  // td para agregar el boton de modificar stock
  newTableDataBoton = document.createElement("td");

  // Creo un input de type number para ingresar a que valor voy a modificar el stock
  newInputText = document.createElement("input");
  newInputText.setAttribute("type", "number");
  newInputText.setAttribute("class", "textosStock");
  newInputText.setAttribute("id", tipoinstancia._nombre);
  newTableDataText.appendChild(newInputText);

  // Creo un input de type button para modificar stock
  newInputBoton = document.createElement("input");
  newInputBoton.setAttribute("type", "button");
  newInputBoton.setAttribute("class", "btnTablaInstanciasAdmin");
  newInputBoton.setAttribute("data-id", tipoinstancia._nombre);
  newInputBoton.value = "Modificar";
  newTableDataBoton.appendChild(newInputBoton);

  // Segundo: Creo tr y le appendeo los td creados en pasos 1 y 2
  newTableRow = document.createElement("tr");
  newTableRow.appendChild(newTableDataTipo);
  newTableRow.appendChild(newTableDataStock);
  newTableRow.appendChild(newTableDataText);
  newTableRow.appendChild(newTableDataBoton);
  
  // Tomo id tabla y le appendeo el tr con el td ya dentro
  let tabla = document.querySelector("#tablaInstancias");
  tabla.appendChild(newTableRow);
}
  
function crearTablaInstanciasAlquiladas(vmAlquilada) {
  let estado = document.querySelector("#slcEstadoInstancias").value;

  let tdInstancia = "";
  let tdEstado = "";
  let tdVecesIniciada = "";
  let tdEncenderApagar = "";
  let btnEncenderApagar = "";
  let tr = "";
  let tabla = "";

  // td para Instancia
  tdInstancia = document.createElement("td");
  tdInstancia.textContent = vmAlquilada._maquinaVirtual._tipoinstancia._nombre;
  // td para estado
  tdEstado = document.createElement("td");
  tdEstado.textContent = vmAlquilada._maquinaVirtual._estado;
  // td para cantidad de veces iniciada
  tdVecesIniciada = document.createElement("td");
  tdVecesIniciada.textContent = vmAlquilada._maquinaVirtual._cantEncendidos;
  // td para input type button Encender/Apagar
  tdEncenderApagar = document.createElement("td");

  // input para el botón que permite apagar o encender una vm
  btnEncenderApagar = document.createElement("input");
  btnEncenderApagar.setAttribute("type", "button");
  btnEncenderApagar.setAttribute("class", "btnTablaInstanciasAlquiladas");
  btnEncenderApagar.setAttribute("data-id", vmAlquilada._alquilerid);
  btnEncenderApagar.value = vmAlquilada._maquinaVirtual.estadoBotonVm();
  tdEncenderApagar.appendChild(btnEncenderApagar);
  // tr y appendeo td's
  tr = document.createElement("tr");
  tr.appendChild(tdInstancia);
  tr.appendChild(tdEstado);
  tr.appendChild(tdVecesIniciada);
  tr.appendChild(tdEncenderApagar);
  
  if(estado == "Todas"){
    // creo tabla y appendeo tr
    tabla = document.querySelector("#tablaInstanciasAlquiladas");
    tabla.appendChild(tr);
  }else if(estado == vmAlquilada._maquinaVirtual._estado){
    // creo tabla y appendeo tr
    tabla = document.querySelector("#tablaInstanciasAlquiladas");
    tabla.appendChild(tr);
  }
}

function reporteCliente() {
  
  let contC7small = 0;
  let contC7Medium = 0;
  let contC7Large = 0;
  let contR7Small = 0;
  let contR7Medium = 0;
  let contR7Large = 0;
  let contI7Medium = 0;
  let contI7Large = 0;
  let contVecesEncC7Small = 0;
  let contVecesEncC7Medium = 0;
  let contVecesEncC7Large = 0;
  let contVecesEncR7Small = 0;
  let contVecesEncR7Medium = 0;
  let contVecesEncR7Large = 0;
  let contVecesEncI7Medium = 0;
  let contVecesEncI7Large = 0;
  
  for(let i = 0; i < miSistema._array_alquileres.length; i++) {
    let unObjeto = miSistema._array_alquileres[i];
    if(unObjeto._usuario == miSistema._usuario_logueado._username) {
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "c7Small") {
        contC7small++;
        contVecesEncC7Small = contVecesEncC7Small + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "c7Medium") {
        contC7Medium++;
        contVecesEncC7Medium = contVecesEncC7Medium + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "c7Large") {
        contC7Large++;
        contVecesEncC7Large = contVecesEncC7Large + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "r7Small") {
        contR7Small++;
        contVecesEncR7Small = contVecesEncR7Small + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "r7Medium") {
        contR7Medium++;
        contVecesEncR7Medium = contVecesEncR7Medium + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "r7Large") {
        contR7Large++;
        contVecesEncR7Large = contVecesEncR7Large + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "i7Medium") {
        contI7Medium++;
        contVecesEncI7Medium = contVecesEncI7Medium + unObjeto._maquinaVirtual._cantEncendidos;
      }
      if(unObjeto._maquinaVirtual._tipoinstancia._nombre == "i7Large") {
        contI7Large++;
        contVecesEncI7Large = contVecesEncI7Large + unObjeto._maquinaVirtual._cantEncendidos;
      }
    }
  }

  let tipoC7small = ["c7Small", 2.50, contVecesEncC7Small, ((contC7small*20) + (contVecesEncC7Small*2.50))];
  let tipoC7Medium = ["c7Medium", 3.50, contVecesEncC7Medium, ((contC7Medium*30) + (contVecesEncC7Medium*3.50))];
  let tipoC7Large = ["c7Large", 6, contVecesEncC7Large, ((contC7Large*50) + (contVecesEncC7Large*6))];
  let tipoR7small = ["r7Small", 4, contVecesEncR7Small, ((contR7Small*35) + (contVecesEncR7Small*4))];
  let tipoR7Medium = ["r7Medium", 6.50, contVecesEncR7Medium, ((contR7Medium*50) + (contVecesEncR7Medium*6.50))];
  let tipoR7Large = ["r7Large", 7, contVecesEncR7Large, ((contR7Large*60) + (contVecesEncR7Large*7))];
  let tipoI7Medium = ["i7Medium", 3.50, contVecesEncI7Medium, ((contI7Medium*30) + (contVecesEncI7Medium*3.50))];
  let tipoI7Large = ["i7Large", 6.50, contVecesEncI7Large, ((contI7Large*50) + (contVecesEncI7Large*6.50))];

  document.querySelector("#tablaCostoInstacias").innerHTML="";
  if(contC7small != 0) {
    cargarTablaCostosInstancias2(tipoC7small);
  } 
  if(contC7Medium != 0) {
    cargarTablaCostosInstancias2(tipoC7Medium);
  }
  if(contC7Large != 0) {
    cargarTablaCostosInstancias2(tipoC7Large);
  }
  if(contR7Small != 0) {
    cargarTablaCostosInstancias2(tipoR7small);
  }
  if(contR7Medium != 0) {
    cargarTablaCostosInstancias2(tipoR7Medium);
  }
  if(contR7Large != 0) {
    cargarTablaCostosInstancias2(tipoR7Large);
  }
  if(contI7Medium != 0) {
    cargarTablaCostosInstancias2(tipoI7Medium);
  }
  if(contI7Large != 0) {
    cargarTablaCostosInstancias2(tipoI7Large);
  }
}

function cargarTablaCostosInstancias2(unReporte){

  let newTableDataNombre = "";
  let tdCostoTotal = "";
  let tdVecesIniciada = "";
  let newTablePrecioEncendido = "";
  let tr = "";
  let tabla = "";
  
  newTableDataTipoInstancia = document.createElement("td");
  newTableDataTipoInstancia.textContent = unReporte[0];
  
  newTablePrecioEncendido = document.createElement("td");
  newTablePrecioEncendido.textContent = unReporte[1];

  tdVecesIniciada = document.createElement("td");
  tdVecesIniciada.textContent = unReporte[2];

  tdCostoTotal = document.createElement("td");
  tdCostoTotal.textContent = unReporte[3];

  tr = document.createElement("tr");
  tr.appendChild(newTableDataTipoInstancia);
  tr.appendChild(newTablePrecioEncendido);
  tr.appendChild(tdVecesIniciada);
  tr.appendChild(tdCostoTotal);

  tabla = document.querySelector("#tablaCostoInstacias");
  tabla.appendChild(tr);
}

function cargarTablaCostosInstancias(vmAlquilada){
   
  let newTableDataNombre = "";
  let tdCostoTotal = "";
  let tdVecesIniciada = "";
  let newTablePrecioEncendido = "";
  let tr = "";
  let tabla = "";
  
  newTableDataNombre = document.createElement("td");
  newTableDataNombre.textContent = vmAlquilada._maquinaVirtual._tipoinstancia._nombre;

  let costoEncendido = 0;
  for(let i = 0; i < miSistema._tipo_instancias.length; i++ ){
    let aux = miSistema._tipo_instancias[i];
    if(vmAlquilada._maquinaVirtual._tipoinstancia._nombre == aux._nombre){
      costoEncendido = aux._costoencendido;
    }
  }

  newTablePrecioEncendido = document.createElement("td");
  newTablePrecioEncendido.textContent = costoEncendido;

  tdVecesIniciada = document.createElement("td");
  tdVecesIniciada.textContent = vmAlquilada._maquinaVirtual._cantEncendidos;

  let costoTotal = miSistema.realizarCostoTotal(vmAlquilada._maquinaVirtual._cantEncendidos, vmAlquilada._maquinaVirtual._tipoinstancia._nombre);
  tdCostoTotal = document.createElement("tr");
  tdCostoTotal.textContent = costoTotal;

  tr = document.createElement("tr");
  tr.appendChild(newTableDataNombre);
  tr.appendChild(newTablePrecioEncendido);
  tr.appendChild(tdVecesIniciada);
  tr.appendChild(tdCostoTotal);

  tabla = document.querySelector("#tablaCostoInstacias");
  tabla.appendChild(tr);
}

function cargarTabla(objetoUsuario) {
  
  let newTableDataNombre = "";
  let newTableDataEstado = "";
  let newTableDataBtn = "";
  let newTableRow = "";
  let newTableDataCambiarEstado = "";

  // Primero: creo td's necesarios segun cant. de columnas a mostrar(nombre, estado)
  // td para nombre
  newTableDataNombre = document.createElement("td");
  newTableDataNombre.textContent = objetoUsuario._nombre;

  // td para el estado
  newTableDataEstado = document.createElement("td");
  newTableDataEstado.textContent = objetoUsuario._perfil._estado;

  // td para el boton cambiar estado
  newTableDataCambiarEstado = document.createElement("td");

  // Creo un input y luego le seteo los atributos (type, class y id)
  newTableDataBtn = document.createElement("input");
  newTableDataBtn.setAttribute("type", "button");
  newTableDataBtn.setAttribute("class", "btnTablaAdmin");
  newTableDataBtn.setAttribute("data-id", objetoUsuario._id);
  newTableDataBtn.value = objetoUsuario._perfil.estadoBoton();
  newTableDataCambiarEstado.appendChild(newTableDataBtn);
  
  // Segundo: Creo tr y le appendeo los td creados en pasos 1 y 2
  newTableRow = document.createElement("tr");
  newTableRow.appendChild(newTableDataNombre);
  newTableRow.appendChild(newTableDataEstado);
  newTableRow.appendChild(newTableDataCambiarEstado);

  // Tomo id tabla y le appendeo el tr con el td ya dentro
  let tabla = document.querySelector("#tablaUsuarios");
  tabla.appendChild(newTableRow);
}

function cargarDashboardCliente() {
  document.querySelector("#tablaInstanciasAlquiladas").innerHTML = "";
  cargarTablaVmsAlquiladas();
}

function alquilarInstancia() { 

  let unaInstancia = parseInt(document.querySelector("#slcInstanceType").value);
  
  switch(unaInstancia) {
    // c7.Small
    case 1:
      if(miSistema.stockDisponible("c7Small")) {
        miSistema.alquilarInstancia("c7Small");
      }else {
        mostrarMensaje("#pStock", "Actualmente no hay stock disponible para la instancia de tipo c7 Small");
      }
      break;
    // c7.Medium
    case 2:
      if(miSistema.stockDisponible("c7Medium")) {
        miSistema.alquilarInstancia("c7Medium");
      }else {
        mostrarMensaje("#pStock", "Actualmente no hay stock disponible para la instancia de tipo c7 Medium");
      }
      break;
    // c7.Large
    case 3:
      if(miSistema.stockDisponible("c7Large")) {
        miSistema.alquilarInstancia("c7Large");
      }else {
        mostrarMensaje("#pStock", "Actualmente no hay stock disponible para la instancia de tipo c7 Large");
      }
      break;
    // r7.Small
    case 4:
      if(miSistema.stockDisponible("r7Small")) {
        miSistema.alquilarInstancia("r7Small");
      }else {
        mostrarMensaje("#pStock", "Actualmente no hay stock disponible para la instancia de tipo r7 Small");
      }
      break;
    // r7.Medium
    case 5:
      if(miSistema.stockDisponible("r7Medium")) {
        miSistema.alquilarInstancia("r7Medium");
      }else {
        mostrarMensaje("#pStock", "Actualmente no hay stock disponible para la instancia de tipo r7 Medium");
      }
      break;
    // r7.Large
    case 6:
      if(miSistema.stockDisponible("r7Large")) {
        miSistema.alquilarInstancia("r7Large");
      }else {
        mostrarMensaje("#pStock", "Actualmente no hay stock disponible para la instancia de tipo r7 Large");
      }
      break;
    // i7.Medium
    case 7:
      if(miSistema.stockDisponible("i7Medium")) {
        miSistema.alquilarInstancia("i7Medium");
      }else {
        mostrarMensaje("#pStock", "Actualmente no hay stock disponible para la instancia de tipo i7 Medium");
      }
      break;
    // i7.Large
    case 8:
      if(miSistema.stockDisponible("i7Large")) {
        miSistema.alquilarInstancia("i7Large");
      }else {
        mostrarMensaje("#pStock", "Actualmente no hay stock disponible para la instancia de tipo i7 Large");
      }
      break;
  }

  // Cada vez que se alquila una instancia vacio tabla y la vuelvo a cargar
  document.querySelector("#tablaInstanciasAlquiladas").innerHTML = "";
  cargarTablaVmsAlquiladas();
}

function cargarTablaVmsAlquiladas() {
  document.querySelector("#tablaInstanciasAlquiladas").innerHTML="";
  document.querySelector("#tablaCostoInstacias").innerHTML="";
  for(let i = 0; i < miSistema._array_alquileres.length; i++) {
    let instanciaAlquilada = miSistema._array_alquileres[i];
      if(instanciaAlquilada._usuario == miSistema._usuario_logueado._username) {
      crearTablaInstanciasAlquiladas(instanciaAlquilada);
      reporteCliente(instanciaAlquilada);
    }
    misBotonesVmsAlquiladas = document.querySelectorAll(".btnTablaInstanciasAlquiladas");
    for(let j = 0; j < misBotonesVmsAlquiladas.length; j++) {
      auxBtn = misBotonesVmsAlquiladas[j];
      auxBtn.addEventListener("click", cambiarEstadoVm);
    }
  }
}

function registrar() {
  // Tomo los datos ingresados en el html.
  let nombreRegistro = document.querySelector("#txtNombre").value;
  let apellidoRegistro = document.querySelector("#txtApellido").value;
  let nombreUsuario = document.querySelector("#txtNombreUsuario").value;
  let nombreUsuarioReal = "";
  nombreUsuario = nombreUsuario.toUpperCase();

  let contrasenia = document.querySelector("#txtContrasena").value;
  let nroTarjeta = document.querySelector("#txtTarjetaCredito").value;
  let cvc = document.querySelector("#codigoSeguridad").value;

  // if anidados para mostrar el error mas detalladamente al usuario.
  if (buscarUsuario(nombreUsuario)){
    if(formatoUsuario(nombreUsuario)){
      if(verificarContrasenia(contrasenia)){
        if(verificarTarjeta(nroTarjeta)){
          if(verificarCVC(cvc)){
            // Si cumple los requisitos, asigno ID al usuario.
            miSistema.altaCliente(nombreRegistro, apellidoRegistro, nombreUsuario, contrasenia, nroTarjeta, cvc);
            mostrarMensaje("#pRegistro", `${nombreUsuario} Datos ingresados correctamente, pendiente de aprobación`);
            redirectTo("#divInicioSesion");
          }else {
            mostrarMensaje("#pRegistro", `El CVC es incorrecto.`);
          }
        }else{
          mostrarMensaje("#pRegistro", `La tarjeta no es valida.`);
        }
      }else{
        mostrarMensaje("#pRegistro", `Contrasenia incorrecta`);
      }
    }else{
      mostrarMensaje("#pRegistro", `El nombre no cumple con los requisitos.`);
    }
  }else{
    mostrarMensaje("#pRegistro", `Nombre de usuario ya existente.`);
  }
} 

function verificarTarjeta(nroTarjeta) {

  if (nroTarjeta[4] == "-" && nroTarjeta[9] == "-" && nroTarjeta[14] == "-") {
    nroTarjeta = nroTarjeta.substring(0, 4) + nroTarjeta.substring(5, 9) + nroTarjeta.substring(10, 14) + nroTarjeta.substring(15, 19);
    for (let i = 0; i < nroTarjeta.length; i++) {
      if (isNaN(nroTarjeta[i])) {
        //Si no es un nro retorno error
        return false;
      }
    }
    if (nroTarjeta.length == 16 && algoritmoTarjeta(nroTarjeta)) {
        return true;
    }  
  }  
  return false;
}

function algoritmoTarjeta(nroTarjeta) {

  let suma = 0;
  let aux = 0;
  let resultado="";
  
  for(i = 0; i < nroTarjeta.length; i++) {
    aux = nroTarjeta[i] * 2;
    if(aux > 9) {
        aux = aux - 9;
    }
    resultado += aux;
    i = i + 1; // le sumo uno para ir solo utilizando los pares como lo indica el algoritmo
    resultado += nroTarjeta[i];
  }
  nroTarjeta = resultado;
  for(let i = 0; i < nroTarjeta.length; i++) { 
      let unNumero = parseInt(nroTarjeta[i]);
      suma += unNumero;
  }
  if(suma % 10 == 0) {
      return true;
  }
}

function verificarCVC(digitoVerificador) {
  if (digitoVerificador.length == 3 && esNumero(digitoVerificador)) {
    return true;
  }
  return false;
}

function buscarUsuario(nombreUsuario) {

  let usuarioExiste = false;
  let resultado = false;
 
  usuarioExiste = miSistema.buscarGenerico(miSistema._array_usuarios, nombreUsuario);
    
  if (usuarioExiste == null) {
    resultado = true;
  } else {
    resultado = false;
  }
  return resultado;
}

function formatoUsuario(usuario) {

  let contNumero = false;
  let contLetra = false;
  let contSimbolo = false;
  let posicion = 0;

  while((!contNumero || !contLetra || !contSimbolo) && (posicion < usuario.length)) {

    if (esNumero(usuario[posicion])) {
      contNumero = true;
    }    
    if (contieneLetra(usuario, posicion)) {
      contLetra = true;
    }
    if (contieneSimbolo(usuario, posicion)) {
      contSimbolo = true;
    }
    posicion++;
  }
  if(contNumero && contLetra && contSimbolo) {
    return true;
  }else{
    return false;
  }
}

function verificarContrasenia(contrasenia) {
  
  let resultado = "";
  if (contrasenia.length >= 5) {
    if(formatoContrasenia(contrasenia)) {
      resultado = true;
    }else {
      resultado = false;
    }
  }
  return resultado;
}

function formatoContrasenia(contrasenia) {

  let contMayuscula = false;
  let contMinuscula = false;
  let contNumero = false;
  let posicion = 0;

  while((!contMayuscula || !contMinuscula || !contNumero) && (posicion <= contrasenia.length)) {
    let aux = contrasenia[posicion];
    if (esNumero(aux)) {
      contNumero = true;
    }
    if (contieneLetra(contrasenia, posicion)) {
      contMayuscula = true;
    }
    if (contieneMayuscula(contrasenia, posicion)) {
      contMinuscula = true;
    }
    posicion++;
  }

  if (contNumero && contMayuscula && contMinuscula) {
    return true;
  } else {
    return false;
  }
}

function esNumero(numero) {
  return !isNaN(numero);
}

function contieneLetra(cadenaTexto, posicionCaracter) {
  if ((cadenaTexto.charCodeAt(posicionCaracter) >= 65 && cadenaTexto.charCodeAt(posicionCaracter) <= 90) || 
      (cadenaTexto.charCodeAt(posicionCaracter) >= 97 && cadenaTexto.charCodeAt(posicionCaracter) <= 122)){
    return true;
  } else {
    return false;
  }
}

function contieneMayuscula(contrasenia, letra) {
  if (contrasenia.charCodeAt(letra) >= 65 && contrasenia.charCodeAt(letra) <= 90) {
    return true;
  } else {
    return false;
  }
}

function contieneSimbolo(nombreUsuario, caracter) {
 
  if (nombreUsuario.charCodeAt(caracter) >= 33 && nombreUsuario.charCodeAt(caracter) <= 47) {
    return true;
  }else if(nombreUsuario.charCodeAt(caracter) >= 58 && nombreUsuario.charCodeAt(caracter) <= 64) {
    return true;
  }else if(nombreUsuario.charCodeAt(caracter) >= 91 && nombreUsuario.charCodeAt(caracter) <= 126) {
    return true;
  }
  return false;
}

function mostrarMensaje (parrafo,mensaje){
  document.querySelector(parrafo).innerHTML = mensaje;
}
