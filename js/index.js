let app = angular.module("employee-view", []);
const guestUrl = "http://localhost:8080/guest";
const roomUrl = "http://localhost:8080/room";
const rfidCardUrl = "http://localhost:8080/rfid-card";
const espUrl = "http://espIp:8080/scan-card";

app.controller("guest-controller", function ($scope, $http) {
  let guestC = this;

  guestC.guests = [];

  guestC.getAllGuests = function () {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": guestUrl,
      },
    };
    $http.get(guestUrl, config)
      .then(function (res) {
        guestC.guests = res.data;
        console.log(guestC.guests);
      });
  };

  guestC.addGuest = function () {
    let data = {
      id: guestC.id,
      name: guestC.name,
      telephoneNumber: guestC.telephoneNumber,
    };
    console.log(data);
    $http.post(guestUrl, data)
      .then(function (res) {
        console.log("Creation successful.");
        window.location.reload();
      });
  };

  guestC.deleteById = function () {
    let data = {
      id: guestC.id,
    };
    console.log(data);
    $http.post(guestUrl, data)
      .then(function (res) {
        console.log("Deletion successful.");
        window.location.reload();
      });
  };

  window.addEventListener("load", function () {
    guestC.getAllGuests();
  });
});

app.controller("room-controller", function ($scope, $http) {
  let roomC = this;

  roomC.rooms = [];

  roomC.getAllRooms = function () {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": roomUrl,
      },
    };
    $http.get(roomUrl, config)
      .then(function (res) {
        roomC.rooms = res.data;
        console.log(roomC.rooms);
      });
  };

  window.addEventListener("load", function () {
    roomC.getAllRooms();
  });
});

app.controller("rfid-card-controller", function ($scope, $http) {
  let rfidC = this;

  rfidC.rfidCards = [];

  rfidC.getAllCards = function () {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": rfidCardUrl,
      },
    };
    $http.get(rfidCardUrl, config)
      .then(function (res) {
        rfidC.rfidCards = res.data;
        console.log(rfidC.rfidCards);
      });
  };

  rfidC.addRfidCard = function () {
    let data = {
      room: {
        id: rfidC.room,
      },
      status: {
        id: 1,
      },
      uid: rfidC.uid,
    };
    let config = {
      headers: {
        "Access-Control-Allow-Origin": espUrl,
      },
    };
    console.log(data);
    $http.post(rfidCardUrl, data, config)
      .then(function (res) {
        console.log("Creation successful.");
        window.location.reload();
      });
  };

  rfidC.scanCard = function () {
    rfidC.uid = null;

    let config = {
      headers: {
        "Access-Control-Allow-Origin": espUrl,
      },
    };
    $http.get(espUrl, config)
      .then(function (res) {
        rfidC.uid = res.data.uid;
        console.log(rfidC.uid);
      })
      .catch(function (err) {
        alert("The ESP doesn't respond.");
      });
  };

  window.addEventListener("load", function () {
    rfidC.getAllCards();
  });
});
