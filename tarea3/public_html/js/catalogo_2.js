var listaEmpleados=new Array();
var listaFotos=new Array();
var maxEmpleados=0;
var empleadoActual=0;

function cargaDepartamentos(){
    $.getJSON("departamentos.json", function(datos){              
       $.each(datos.departamentos.departamento, function (id, obj){
           $("#Select1").append(new Option(obj.nombre,obj.id));
       });                    
    });    
    
   ponManejadores();
}

function ponManejadores(){
    existe=0;
    
     $("#Select1").on("click",function(){       
       cargaEmpleados($("#Select1").find(":selected").val());
    });
    
    $("#ultimo").on("click",function(){
        empleadoActual=maxEmpleados;
        actualizaPantalla();
    });
    
    $("#primero").on("click",function(){
       empleadoActual=0;
       actualizaPantalla();
    });
    
    $("#anterior").on("click",function(){
       if ((empleadoActual-1)>=0){
           empleadoActual--;
           actualizaPantalla();
       }
    });
    
    $("#siguiente").on("click",function(){
       if ((empleadoActual+1)<=maxEmpleados) {
           empleadoActual++;
           actualizaPantalla();
       }
    });
    
    
    $("#btnIr").on("click",function(){
       existe=existeEmpleado($("#emp_id").val());   
       if (existe===-1){
           alert("No hay empleados con este id. El id debe ser un numero");
       } else {
           empleadoActual=existe;           
           actualizaPantalla();
       }
    });
}

function existeEmpleado(id){
   result=-1;
   for (var i=0;i<listaEmpleados.length;i++){
       if (listaEmpleados[i].id===id){
           return i;
       }
   }
   return result;  
}

function cargaEmpleados(id){    
    listaEmpleados=[];
    maxEmpleados=0;
    $.getJSON("empleados.json",function(datos){
       $.each(datos.plantilla.empleado,function(t,obj) {
           if (obj.departamento===id){               
               listaEmpleados.push(obj);
               maxEmpleados=3;
           } 
       });
       empleadoActual=0;       
       procesaFotos();
       
    });    
}

function procesaFotos(){
    listaFotos=[];
    loop=0;
    $.each(listaEmpleados,function(t,obj){
       $.getJSON("./imagenes/"+obj.id+".json",function(datos){          
          listaFotos[datos.empleado.id]=datos.empleado.imagen;
          if (loop<maxEmpleados){
              loop++;
          } else {
              actualizaPantalla();
          }          
       });
       
    });
    
}

function dameId(){   
    return listaEmpleados[empleadoActual].id;
}

function actualizaPantalla(){  
    
    $("#pos").html(empleadoActual+1);
    $("#total").html(maxEmpleados+1);    
    $("#celdaFoto").html("<img width='200' src='./imagenes/"+listaFotos[dameId()]+"'/>");
    $("#codigo").html(listaEmpleados[empleadoActual].id);
    $("#nombre").html(listaEmpleados[empleadoActual].nombre+", "+listaEmpleados[empleadoActual].apellidos);
    $("#departamento").html(listaEmpleados[empleadoActual].departamento);
    $("#puesto").html(listaEmpleados[empleadoActual].puesto);
    $("#nivel").html(listaEmpleados[empleadoActual].niveleducacion);
    $("#base").html(listaEmpleados[empleadoActual].sueldo.base+" €");
    $("#complemento").html(listaEmpleados[empleadoActual].sueldo.complemento+" €")
}


$(function(){
    listaEmpleados=[];
    listaFotos=[];
    maxEmpleados=0;
    totalEmpleados=0;
    cargaDepartamentos();    
});