

$(document).ready(function() {

    $(".btn").click(function(e) {

    e.preventDefault();

    let numero1 = parseInt(document.querySelector("#numeros").value);

    let resultado = validar(numero1);

    if(resultado === true) {
        exito();
    }
//prueba
    function exito() {    

        let numero1 = parseInt(document.querySelector("#numeros").value);
        let resultado = numero1;
        let dataPoints = [];
        let opciones = {
            title: {
                text: "Estadística de habilidades"
            },
            data: [{
                    type: "pie",
                    startAngle: 45,
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabel: "{label} ({y})",
                    yValueFormatString:"#,##0.#"%"",
                    dataPoints: dataPoints,
        },
    ],
    }
    //prueba y gráfico

        $.ajax({
            type: "GET",
            url:"https://superheroapi.com/api.php/921606152096118/" + resultado,
            dataType:"json",
            success: function(data) {

                $(".card-title").text(`Nombre: ${data.name}`);
                $("#card1").text(`Conexiones: ${data.connections["group-affiliation"]}`);
                $("#card2").text(`Publicado po: ${data.biography.publisher}`);
                $("#card3").text(`Ocupación: ${data.work.occupation}`);
                $("#card4").text(`Primera aparaición: ${data.biography["first-appearance"]}`);
                $("#card5").text(`Altura: ${data.appearance.height}`);
                $("#card6").text(`Peso: ${data.appearance.weight}`);
                $("#card7").text(`Alianzas: ${data.biography.aliases}`);
                $(".img-fluid").attr("src", data.image.url);
                

                let datosApi = [data.powerstats.combat, data.powerstats.durability, data.powerstats.intelligence, data.powerstats.power, data.powerstats.speed, data.powerstats.strength];

                let datosLabel = ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"]
                
                for(let i = 0; i < datosApi.length ; i++) {
                    dataPoints.push({
                    y: datosApi[i],
                    label: datosLabel[i]
                    });
            }

            $("#chartContainer").CanvasJSChart(opciones);
            
        },
            },
        ); 
    }   
    });
});

// Restricciones al momento de ingresar la solicitud en la búsqueda

    function validar(numero1) {
        let pasamosLaValidacion = true;
        let patron = /\d/gi;

        if(numero1 === "") {
            document.querySelector(".error").innerHTML = "Debes ingresar un número entre el 1 y el 732, incluído ambos"

            pasamosLaValidacion = false;

        } else if(patron.test(numero1) === false) {
            document.querySelector(".error").innerHTML = "Formato incorrecto, debes ingresar un número entre el 1 y el 732, incluído ambos"
            document.querySelector(".card").style.display = "none";

            pasamosLaValidacion = false;

        } else if(numero1 > 732 || numero1 < 1) {
            document.querySelector(".error").innerHTML = " Rango incorrecto, debes ingresar un número entre el 1 y el 732, incluído ambos"
            document.querySelector(".card").style.display = "none";

            pasamosLaValidacion = false;

        } else {
            document.querySelector(".error").innerHTML = " "
            document.querySelector(".card").style.display = "block";

            pasamosLaValidacion = true;
        }
        return pasamosLaValidacion
    }

  

    
