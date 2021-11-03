function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.124.136:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionRoom() {
    $.ajax({
        url:"http://129.151.124.136:8080/api/Room/all",
        //url: "http://localhost:8080/api/Skate/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaRoom(response);
        }

    });

}

function pintarRespuestaRoom(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>id</td>";
        myTable+="<td>name</td>";
        myTable+="<td>stars</td>";
        myTable+="<td>hotel</td>";
        myTable+="<td>description</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].id+ "</td>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].stars + "</td>";
        myTable+="<td>" + response[i].hotel+ "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+='<td><button class = "botonRoom2" onclick="borrar(' + response[i].id + ')">Borrar Room!</button></td>';
        myTable+='<td><button class = "botonRoom2" onclick="cargarDatosRoom(' + response[i].id + ')">Editar Room!</button></td>';
        myTable+='<td><button class = "botonRoom2" onclick="actualizar(' + response[i].id + ')">Actualizar Room!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaRoom").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosRoom(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.124.136:8080/api/Room/"+id,
        //url: "http://localhost:8080/api/Skate/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#stars").val(item.stars);
            $("#hotel").val(item.hotel);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarRoom(idElement) {
    let myData = {
        name: $("#room").val(),
        stars: $("#stars").val(),
        hotel: $("#hotel").val(),
        description: $("#description").val(),
        };
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        url:"http://129.151.124.136:8080/api/Room/save",
    
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            
            alert("No se guardo correctamente");
    
    
        }
        });
    }



//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.124.136:8080/api/Room/"+idElemento,
            //url: "http://localhost:8080/api/Skate/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaRoom").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#name2").val().length == 0 || $("#stars").val().length == 0 || $("#hotel").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name2").val(),
            stars: $("#stars").val(),
            hotel: $("#hotel").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.124.136:8080/api/Room/update",
            //url: "http://localhost:8080/api/Skate/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListRoom").empty();
                listarRoom();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#stars").val("");
                $("#hotel").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
