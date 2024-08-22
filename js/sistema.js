let contEncendido=0;
class Sistema {
  constructor() {
    this._array_usuarios = [];
    this._usuario_logueado = null;
    this._tipo_instancias = []; // aca van los 8 precargados
    this._array_alquileres = []; // aca van los objetos vms que contienen un tipoinstancia
    this._historial_alquileres = [];
  }

  alquilarInstancia(nombre) {
    let miTipoInstancia = this.buscarGenerico2(this._tipo_instancias, "_nombre", nombre);
    let usuario=this._usuario_logueado._username;
    let unaMaquinaVirtual = new MaquinaVirutal(miTipoInstancia);
    let unAlquiler = new Alquiler(unaMaquinaVirtual, usuario);
    this._array_alquileres.push(unAlquiler);
    this._historial_alquileres.push(unAlquiler);
    miTipoInstancia.restarStock();
  }

  stockDisponible(nombre) {
    for(let i = 0; i < this._tipo_instancias.length; i++) {
      if(this._tipo_instancias[i]._nombre == nombre && this._tipo_instancias[i]._stock >= 1) {
        return true;
      }
    }
    return false;
  }

  login(unNombreUsuario, contrasenia) {
    let resultado = false;
    let usuario = this.buscarGenerico(this._array_usuarios, unNombreUsuario, contrasenia);
    if(usuario != null && usuario._contrasenia == contrasenia) {
      this._usuario_logueado = usuario;
      resultado = true;
    }
    return resultado;
  }

  buscarGenerico(lista, nombreUsuario) {
    let aux = "";  
    for(let i = 0; i < lista.length; i++) {
      aux = lista[i];
      if(aux._username == nombreUsuario) {
        return aux;
      }
    } 
    return null;
  }

  buscarGenerico2(lista, parametro, valor) {
    let aux = "";  
    for(let i = 0; i < lista.length; i++) {
      aux = lista[i];
      if(aux[parametro] == valor) {
        return aux;
      }
    } 
    return null;
  }

  buscarNombre(nombreUsuario, lista) {
    let resultado = false;
    let aux = "";
    for(let i = 0; i < lista.length; i++) {
        aux = lista[i];
        if(nombreUsuario.toUpperCase() == aux._username.toUpperCase()){
          resultado = true;
        }
    }      
    return resultado;
  }

  buscarPerfil(nombreUsuario, lista) {

    let resultado = false;
    let aux = "";
    let perfil = "";
    
    for(let i = 0; i < lista.length; i++) {
        aux = lista[i];
        if(nombreUsuario.toUpperCase() == aux._username.toUpperCase()) {
          perfil = aux._perfil;
          if(Admins == perfil){
            resultado = "Admin";
          }else if(Cliente == perfil){
            resultado = "Cliente";
          }
        }
    }      
    return resultado;
  }

  precargarAlquileres() {
    let unTipo = new TipoInstancia("c7Small");
    let unaVm = new MaquinaVirutal(unTipo);
    let alquiler1 = new Alquiler(unaVm, "PERFILUSUARIO.01");
    alquiler1._maquinaVirtual._estado = "Pendiente Baja";
    this._array_alquileres.push(alquiler1);
  }

  precargarAdmins() {

    let perfilUsuario1 = new Cliente();
    let perfilUsuario2 = new Cliente();
    let perfilUsuario3 = new Cliente();
    let perfilUsuario4 = new Cliente();
    let perfilUsuario5 = new Cliente();
    let usuario1 = new Usuario ("Cliente1", "1", "PERFILUSUARIO.01", "Pass123", perfilUsuario1);
    let usuario2 = new Usuario ("Cliente2", "2", "PERFILUSUARIO.02", "Pass123", perfilUsuario2);
    let usuario3 = new Usuario ("Cliente3", "3", "PERFILUSUARIO.03", "Pass123", perfilUsuario3);
    let usuario4 = new Usuario ("Cliente4", "4", "PERFILUSUARIO.04", "Pass123", perfilUsuario4);
    let usuario5 = new Usuario ("Cliente5", "5", "PERFILUSUARIO.05", "Pass123", perfilUsuario5);
    this._array_usuarios.push(usuario1, usuario2,usuario3,usuario4,usuario5);
    
    let perfilAdmin1 = new Admins();
    let perfilAdmin2 = new Admins();
    let perfilAdmin3 = new Admins();
    let perfilAdmin4 = new Admins();
    let perfilAdmin5 = new Admins();
    let admin1 = new Usuario("Admin", "1", "PERFILADMIN.01", "Pass123", perfilAdmin1);
    let admin2 = new Usuario("Admin", "2", "PERFILADMIN.02", "Pass123", perfilAdmin2);
    let admin3 = new Usuario("Admin", "3", "PERFILADMIN.03", "Pass123", perfilAdmin3);
    let admin4 = new Usuario("Admin", "4", "PERFILADMIN.04", "Pass123", perfilAdmin4);
    let admin5 = new Usuario("Admin", "5", "PERFILADMIN.05", "Pass123", perfilAdmin5);

    let admins_no_controlados = [];
    let aux = "";
    admins_no_controlados.push(admin1,admin2,admin3,admin4,admin5);
    // admins_no_controlados.push(admin2);
    
    // this._array_usuarios.push(usuario2);
 
    for(let i = 0; i < admins_no_controlados.length; i++) {   
      aux = admins_no_controlados[i];
      let userAdmin = this.buscarGenerico(aux._username);
      if(userAdmin != null){
        this._array_usuarios.push(aux);
      }
    }  
  }

  precargarInstancias() {

    let untipoC7Small = new TipoInstancia("c7Small", 10, 20, 2.50);
    let untipoC7Medium = new TipoInstancia("c7Medium", 10, 30, 3.50);
    let untipoC7Large = new TipoInstancia("c7Large", 10, 50, 6);
    let untipoR7Small = new TipoInstancia("r7Small", 10, 35, 4);
    let untipoR7Medium = new TipoInstancia("r7Medium", 10, 50, 6.50);
    let untipoR7Large = new TipoInstancia("r7Large", 10, 60, 7);
    let untipoI7Medium = new TipoInstancia("i7Medium", 10, 30, 3.50);
    let untipoI7Large = new TipoInstancia("i7Large", 10, 50, 6.50);
    
    this._tipo_instancias.push(untipoC7Small, untipoC7Medium, untipoC7Large, untipoR7Small, untipoR7Medium, untipoR7Large, untipoI7Medium, untipoI7Large);
  }

  altaCliente(nombreRegistro, apellidoRegistro, nombreUsuario, contrasenia, nroTarjeta, cvc){
    let cliente = new Cliente(nroTarjeta, cvc);
    let usuarioNuevo = new Usuario(nombreRegistro, apellidoRegistro, nombreUsuario, contrasenia, cliente);
    this._array_usuarios.push(usuarioNuevo);
  }

  formatoUsuario(usuario) {

    let contNumero = false;
    let contLetra = false;
    let contSimbolo = false;
    let posicion = 0;
  
    while((!contNumero || !contLetra || !contSimbolo) && (posicion < usuario.length)) {
  
      if (this.esNumero(usuario[posicion])) {
        contNumero = true;
      }    
      if (this.contieneLetra(usuario, posicion)) {
        contLetra = true;
      }
      if (this.contieneSimbolo(usuario, posicion)) {
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

  esNumero(numero) {
    return !isNaN(numero);
  }

  contieneLetra(cadenaTexto, posicionCaracter) {
    if ((cadenaTexto.charCodeAt(posicionCaracter) >= 65 && cadenaTexto.charCodeAt(posicionCaracter) <= 90) || 
        (cadenaTexto.charCodeAt(posicionCaracter) >= 97 && cadenaTexto.charCodeAt(posicionCaracter) <= 122)
    ){
      return true;
    } else {
      return false;
    }
  }

  contieneSimbolo(nombreUsuario, caracter) {
 
    if (nombreUsuario.charCodeAt(caracter) >= 33 && nombreUsuario.charCodeAt(caracter) <= 47) {
      return true;
    }else if(nombreUsuario.charCodeAt(caracter) >= 58 && nombreUsuario.charCodeAt(caracter) <= 64) {
      return true;
    }else if(nombreUsuario.charCodeAt(caracter) >= 91 && nombreUsuario.charCodeAt(caracter) <= 126) {
      return true;
    }
    return false;
  }
  
  buscarContrasenia(nombreUsuario, contrasenia) {
    let aux = "";
    let resultado = false;
    let contraseniaEncontrada = "";
    for(let i = 0; i < this._array_usuarios.length; i++) {
        aux = this._array_usuarios[i];
        if(nombreUsuario.toUpperCase() == aux._username.toUpperCase()){
          contraseniaEncontrada = aux._contrasenia;
          if(contrasenia == contraseniaEncontrada){
            resultado = true;
          }
        }
    }
    return resultado;
  }
  
  altaPendiente(nombreRegistro, apellidoRegistro, nombreUsuario, contrasenia, nroTarjeta, cvc){
    let cliente = new Cliente(nroTarjeta, cvc);
    let usuarioNuevo = new Usuario(nombreRegistro, apellidoRegistro, nombreUsuario, contrasenia, cliente);
    this._array_pendientes.push(usuarioNuevo);
  }
    
  cambiarEstadoVmCancelar(id) {
    let aux = "";
    for(let i = 0; i < this._array_alquileres.length;i++){
      aux = this._array_alquileres[i];
      if(aux._alquilerid == id){
        this._array_alquileres.splice(i,1);
        console.log(this._array_alquileres);
      }
    }
  }

  cambiarEstadoVm(id) {
    let mi_vm = this.buscarGenerico2(this._array_alquileres, "_alquilerid", id);
    mi_vm._maquinaVirtual.cambiarEstadoVm(); 
  }

  cambiarEstado(id){
    let miUsuario = this.buscarGenerico2(this._array_usuarios, "_id" , id);
    miUsuario._perfil.cambiarEstado();
  }

  devolverInstAlStock(idUsuarioBloqueado) {
    let miUsuario = this.buscarGenerico2(this._array_usuarios, "_id" , idUsuarioBloqueado);
    for(let i = this._array_alquileres.length-1; 0 <= i ; i--) {
      let unAlquiler = this._array_alquileres[i];
        if(unAlquiler._usuario == miUsuario._username) {
          let miTipoInst = this.buscarGenerico2(this._tipo_instancias, "_nombre", unAlquiler._maquinaVirtual._tipoinstancia._nombre);
          console.log(miTipoInst);
          miTipoInst.sumoStock();
          this._array_alquileres.splice(i,1);
          }
        }
      
      
  }
  
  obtenerEstado(usuario){
    let aux = "";
    for(let i = 0;i < this._array_usuarios.length; i++){
      aux = this._array_usuarios[i];
      if(usuario == aux._username) {
        return aux._perfil._estado;
      }
    }
    return false;
  }
  obtenerContrasenia(usuario){
    let aux = "";
    for(let i = 0;i < this._array_usuarios.length; i++){
      aux = this._array_usuarios[i];
      if(usuario == aux._username) {
        return aux._contrasenia;
      }
    }
    return false;
  }
  
  modificarStock(tipoInstancia, valor){
    let aux = "";
    let stockActual = 0;
    valor = parseInt(valor);
    for(let i = 0;i < this._tipo_instancias.length; i++){
      aux = this._tipo_instancias[i];
      stockActual = parseInt(aux._stock);
      if(tipoInstancia == aux._nombre) {
        if((stockActual + valor) >= 0) {
          aux._stock= stockActual + valor;
        }else {
          this.mostrarMensaje("#pSinStock", "El stock no puede ser menor a 0");
        }
      }
    }
  }

  mostrarMensaje (parrafo,mensaje){
    document.querySelector(parrafo).innerHTML = mensaje;
  }
  
  buscarStock(id){
    let aux = "";
    for(let i = 0;i < this._tipo_instancias.length; i++){
      aux = this._tipo_instancias[i];
      if(id == aux._nombre) {
        return aux._nombre;
      }
    }
  }

  realizarCostoTotal(cantidad, nombre){
    let resultado = 0;
    let costoEncendido = 0;
    let costoAlquiler = 0;
    for(let i = 0 ; i < this._tipo_instancias.length;i++){
      let aux = this._tipo_instancias[i];
      if(aux._nombre == nombre ){
        
        costoAlquiler = aux._costo;
        if(cantidad != 0){
          costoEncendido = aux._costoencendido;
          resultado = (costoEncendido * cantidad)+ costoAlquiler;
        }else{
          resultado = aux._costo;
        }
      }
    }
    return resultado;
  }
}

let userIdUsuarios = 1;
class Usuario {
  constructor(elNombre, elApellido, userName, laContrasenia, perfil){
    this._nombre = elNombre;
    this._apellido = elApellido;
    this._username = userName;
    this._contrasenia = laContrasenia;
    this._perfil = perfil;
    this._id = userIdUsuarios++
  }
}

class Admins {
  constructor(estado) {
  }
}

class Cliente {
  constructor(unaTarjetaCredito, elCvc) {
    this._tarjetacredito = unaTarjetaCredito;
    this._cvc = elCvc;
    this._estado = "Pendiente";
  }

  estadoBoton(){
    let resultado = "Activar"
    if(this._estado == "Activo") {
      resultado = "Bloquear";
    }
    return resultado;
  }

  cambiarEstado(){
    if(this._estado == "Activo"){
      this._estado = "Bloqueado";
    }else{
      this._estado = "Activo";
    }
  }
}

let alquilerId = 1;
class Alquiler {
  constructor(maquinaVirtual, usuario) {
    this._maquinaVirtual = maquinaVirtual;
    this._usuario = usuario;
    this._alquilerid = "INSTANCE_ID_" + alquilerId++;
  }
}

class MaquinaVirutal {
  constructor(tipoInstancia) {
    this._tipoinstancia = tipoInstancia;
    this._estado = "Encendido";
    this._cantEncendidos = 0;
  }

  estadoBotonVmCancelada(){
    if(this._estado == "Pendiente Baja"){
      this._estado = "Bajar";
    }
  }

  cambiarEstadoVm() {
    if(this._estado == "Encendido"){
      this._estado = "Apagado";
    }else{
      this._estado = "Encendido";
      this._cantEncendidos++;
    }
  }

  estadoBotonVm(){
    let resultado = "";
    if(this._estado == "Encendido") {
      resultado = "Apagar";
    }else{
      resultado = "Encender";
    }
    return resultado;
  }
}

class TipoInstancia{
  constructor(nombre, stock, costo, costoEncendido){
    this._nombre = nombre;
    this._stock = stock;
    this._costo = costo;
    this._costoencendido = costoEncendido;
  }

  restarStock(){
    this._stock--;
  }

  sumoStock(){
    this._stock++;
  }
}




