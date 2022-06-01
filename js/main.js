var mesCategories = [];

var unBouton = "<button class='btn btn-warning'></button>"

var weeklySchedulerApiUrl = "https://radioquetsch.airtime.pro/api/week-info"
// var weeklySchedulerApiUrl = "https://api.chucknorris.io/jokes/categories"

$.ajax({

    url: weeklySchedulerApiUrl,
    type: "GET",
    success: function(jsonData) {
        //recupération des données en cas de succes
        // mesCategories = leTableauQueJeViensDeRecuperer;
        weeklySchedulerJson = jsonData;
        console.log("success");
    },
    error: function() {
        //une alerte en cas de pépin
        console.log("error");
    },
    // synonyme de Callback
    complete: function() {
        // fabriqueMesBoutons(mesCategories);
        console.log("complete");
        createTable(weeklySchedulerJson)
    }
});


function createTable(myJson) {
    var weeklySchedulerTab = "",
        weeklySchedulerDropDown = '<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Jours</a><div class="dropdown-menu">',
        weeklySchedulerTabContent = "",
        tableRow,
        now =  new Date();

    Object.keys(myJson).forEach(function(item) {
        // console.log(item);
        // console.log(myJson[item].length);
        if (item != "AIRTIME_API_VERSION") {
            console.log(item);
            var dayJson = myJson[item];
            var dayDate = new Date(myJson[item][0]['start_timestamp']);
            var thisDayDate = ('0'+dayDate.getDate()).slice(-2);
            var weekday = dayDate.toLocaleDateString('fr-FR', { weekday: 'long' });

            if (now.getMonth() == dayDate.getMonth() && now.getDate() == dayDate.getDate()) {
                weeklySchedulerTab += '<li class="nav-item bg-secondary table-hover">' + '<a class="nav-link text-white active today" id="' + item + '-tab" data-toggle="tab" href="#' + item + ' " role="tab" aria-controls="' + item + '" aria-selected="true">' +  weekday  + " " + thisDayDate + '</a>' + '</li>';
                weeklySchedulerTabContent += '<div class="tab-pane fade show active" id="'+ item +'" role="tabpanel" aria-labelledby="' + item + '-tab"><table class="table table-dark table-striped table-hover"><thead><th>Horaires</th><th>Programme</th></thead><tbody>';
                Object.keys(dayJson).forEach(function(item) {
                var startDateTime = new Date(dayJson[item]['start_timestamp']),
                    endDateTime = new Date(dayJson[item]['end_timestamp']),
                    startEnd = ('0'+startDateTime.getHours()).slice(-2) + ":" + ('0'+startDateTime.getMinutes()).slice(-2) + " - " + ('0'+endDateTime.getHours()).slice(-2) + ":" + ('0'+endDateTime.getMinutes()).slice(-2);
                    name = dayJson[item]['name'];
                    if (now.getTime() > startDateTime.getTime() && now.getTime() <  endDateTime.getTime()) {
                        weeklySchedulerTabContent += "<tr class='bg-success'><td>" +  startEnd + "</td><td>" + name + "<span class='danger'> ON AIR </span></td></tr>";
                    } else {
                        weeklySchedulerTabContent += "<tr><td>" +  startEnd + "</td><td>" + name + "</td></tr>";
                    }
                })
            } else if (now.getTime() <= dayDate.getTime() && dayDate.getDate() <= now.getDate() + 6 ) {
                weeklySchedulerTab += '<li class="nav-item bg-secondary"><a class="nav-link text-white" id="' + item + '-tab" data-toggle="tab" href="#' + item + ' " role="tab" aria-controls="' + item + '" aria-selected="true">' + weekday + " " + thisDayDate + '</a></li>'
                weeklySchedulerTabContent += '<div class="tab-pane fade" id="'+ item +'" role="tabpanel" aria-labelledby="' + item + '-tab"><table class="table table-dark table-striped table-hover"><thead><th>Horaires</th><th>Programme</th></thead><tbody>';
                Object.keys(dayJson).forEach(function(item) {
                var startDateTime = new Date(dayJson[item]['start_timestamp']),
                    endDateTime = new Date(dayJson[item]['end_timestamp']),
                    startEnd = ('0'+startDateTime.getHours()).slice(-2) + ":" + ('0'+startDateTime.getMinutes()).slice(-2) + " - " + ('0'+endDateTime.getHours()).slice(-2) + ":" + ('0'+endDateTime.getMinutes()).slice(-2);
                    name = dayJson[item]['name'];
                    weeklySchedulerTabContent += "<tr><td>" +  startEnd + "</td><td>" + name + "</td></tr>";

                })
            }

            // } else {
            //     weeklySchedulerDropDown += '<a class="dropdown-item" id="' + item + '-tab" data-toggle="tab" href="#' + item + ' " role="tab" aria-controls="' + item + '" aria-selected="true">' + weekday + " " + thisDayDate + '</a>'
            //     weeklySchedulerTabContent += '<div class="tab-pane fade" id="'+ item +'" role="tabpanel" aria-labelledby="' + item + '-tab"><table class="table table-dark table-striped"><thead><th>horraire</th><th>Programme</th></thead><tbody>';
            //     Object.keys(dayJson).forEach(function(item) {
            //     var startDateTime = new Date(dayJson[item]['start_timestamp']),
            //         endDateTime = new Date(dayJson[item]['end_timestamp']),
            //         startEnd = ('0'+startDateTime.getHours()).slice(-2) + ":" + ('0'+startDateTime.getMinutes()).slice(-2) + " - " + ('0'+endDateTime.getHours()).slice(-2) + ":" + ('0'+endDateTime.getMinutes()).slice(-2);
            //         name = dayJson[item]['name'];
            //         weeklySchedulerTabContent += "<tr><td>" +  startEnd + "</td><td>" + name + "</td></tr>";
            //
            //     })
            //     // weeklySchedulerDropDown += "</div></li>";
            // }
            weeklySchedulerTabContent +=  '</tbody></table></div>'
        }

    });
    // weeklySchedulerDropDown += "</div></li>";
    // weeklySchedulerTab += weeklySchedulerDropDown;
    $('#weeklySchedulerTab').html(weeklySchedulerTab);
    $('#weeklySchedulerTabContent').html(weeklySchedulerTabContent);


}

// $('.weeklySchedulerTab li:first-child a').on('click', function (e) {
//   e.preventDefault()
//   $(this).tab('show')
// })
// //

// function fabriqueMesBoutons(unTableauDeCategories) {
//     for (i = 0; i < unTableauDeCategories.length; i++) {
//         var saPropreCategorie = unTableauDeCategories[i];
//         var unBouton = "<button class='btn btn-warning boutonBlague' id='" + saPropreCategorie + "'>" + saPropreCategorie + "</button>"
//         $('.boutons').append(unBouton);
//     }
//
//     $('.boutonBlague').click(function() {
//         var maCategorie = $(this).attr('id');
//         vaChercherUneBlague(maCategorie);
//     });
// }
//
// var debutURL = "https://api.chucknorris.io/jokes/random?category="
//
// function vaChercherUneBlague(categorieDeBlague) {
//     var monURLFinale = debutURL + categorieDeBlague;
//     console.log(monURLFinale);
//     $.ajax({
//         url: monURLFinale,
//         //Verbe HTTP   (GET, POST, etc etc)
//         type: "GET",
//         success: function(donnesVenantDeNotreAPI) {
//             leTableauContenantMaBlagueAuHasard = donnesVenantDeNotreAPI;
//             maBlagueAuHasard = leTableauContenantMaBlagueAuHasard.value;
//             $('.monParagraphe').html(maBlagueAuHasard);
//         },
//         error: function() {
//             alert('ajax est revenu les mains vides');
//         }
//
//     });
