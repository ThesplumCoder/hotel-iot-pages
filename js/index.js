let app = angular.module("employee-view", []);

app.controller("clients-controller", function($scope, $http) {
let clientsCtrl = this;

clientsCtrl.clients = [];

clientsCtrl.getAllClients = function() {
    let config = {
    headers: {
        "proccess": "getAllClients"
    }
    }
    $http.get("index.jsp", config)
    .then( function(res) {
        clientsCtrl.clients = res.data.Clients;
    });
}

clientsCtrl.addOneClient = function() {
    let config = {
    headers: {
        "proccess": "addOneClient"
    }
    }
    let data = {
    id: clientsCtrl.idClient,
    name: clientsCtrl.nameClient,
    telephoneNumber: clientsCtrl.telephoneNumberClient
    }
    console.log(data)

    $http.post("index.jsp", data, config)
    .then( function(res) {
        console.log("Creation successful.");
        window.location.reload();
    });
}

clientsCtrl.deleteById = function() {
    let config = {
    headers: {
        "proccess": "deleteById"
    }
    }
    let data = {
    id: clientsCtrl.idClient,
    }
    console.log(data)

    $http.post("index.jsp", data, config)
    .then( function(res) {
        console.log("Deletion successful.");
        window.location.reload();
    });
}
window.onload = function() {
    clientsCtrl.getAllClients();
}
});