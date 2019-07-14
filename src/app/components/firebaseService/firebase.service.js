// Campaigns service used to communicate Campaigns REST endpoints
(function () {
    'use strict';

    angular
        .module('subscribeCampaign')
        .factory('FirebaseService', FirebaseService);

    FirebaseService.$inject = ['firebase'];

    function FirebaseService(firebase) {
        var config = {
            apiKey: "AIzaSyDNrxumSv9r39lp_fJEcbWEOOZSbHvoirA",
            authDomain: "early-parrot.firebaseapp.com",
            databaseURL: "https://early-parrot.firebaseio.com",
            storageBucket: "early-parrot.appspot.com",
            messagingSenderId: "238348182549"
        };
        var ref = firebase.initializeApp(config);
        var service = {};

        service.initFirebase = initFirebase;

        return service;
        function initFirebase() {

            return ref.database();
        }
    }
} ());