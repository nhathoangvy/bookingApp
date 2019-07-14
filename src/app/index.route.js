(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .config(routerConfig)
	.run(root);
	
root.$inject = ['$rootScope', '$state', '$timeout'];
  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
		  title: 'Home',
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'app/main/not-found.view.html'
      })
      .state('auth', {
        abstract: true,
        url: '/auth',
        template: '<ui-view/>'
      })
      .state('auth.signin', {
        url: '/signin',
        templateUrl: 'app/auth/signin.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm'
      })
      /*.state('auth.signup', {
        url: '/signup',
        templateUrl: 'app/auth/signup.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm'
      })*/
      .state('confirmSubscribe', {
        url: '/confirm-subscribe/:token',
        templateUrl: 'app/password/confirmation.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm'
      })
      .state('campaigns', {
		    title: 'Campaigns',
        abstract: true,
        url: '/campaigns',
        template: '<ui-view />',
/* 		controller: 'SubscribeController',
        controllerAs: 'vm' */
      })
   /*    .state('campaigns.subscribe', {
        url: '/subscribe?referral',
        templateUrl: 'app/campaigns/subscribe/new-subscribe.view.html',
        resolve: {
          visitEvent: newVisitEvent
        }
      }) */
      .state('campaigns.socialShare', {
        url: '/:campaignId',
        templateUrl: 'app/campaigns/socialShare/social-share.view.html',
		resolve: {
          campaignResolve: getCampaign
        },
        controller: 'SocialshareController',
        controllerAs: 'vm'
      })
      .state('campaigns.thank', {
        url: '/thank-you',
        templateUrl: 'app/campaigns/thank/thank.view.html',
        authorized: true
      })
      .state('iframe', {
        abstract: true,
        url: '/iframe/campaigns/:campaignId',
        template: '<ui-view />',
        resolve: {
          campaignResolve: getCampaign
        },
        controller: 'SubscribeIframeController',
        controllerAs: 'vm'
      })
      .state('iframe.newSubscribe', {
        url: '/subscribe?referral',
        templateUrl: 'app/campaigns/subscribe/new-subscribe.view.html'
      })
      .state('iframe.socialShare', {
        url: '/share',
        templateUrl: 'app/campaigns/socialShare/social-share.view.html',
        authorized: true,
      })
      .state('iframe.referrals', {
        url: '/referrals',
        templateUrl: 'app/campaigns/referrals/referrals.view.html',
        controller: 'ReferralController',
        controllerAs: 'vm',
        authorized: true,
        resolve: {
          referralResolve: getNumberOfReferrals
        }
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'app/password/forgot-password.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'app/password/reset-password-invalid.view.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'app/password/reset-password-success.view.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'app/password/reset-password.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm'
      })
      .state('users', {
        abstract: true,
        url: '/users',
        template: '<ui-view/>'
      })
      .state('users.myProfile', {
		title: 'My Profile',
        url: '/my-profile',
        templateUrl: 'app/users/my-profile.view.html',
        controller: 'UserProfileController',
        controllerAs: 'vm',
        autoSignin: true,
        authorized: true
      })
      .state('messages', {
		  title: 'Messages',
        url: '/messages',
        templateUrl: 'app/message/message.view.html',
        controller: 'MessageController',
        controllerAs: 'vm',
        autoSignin: true,
        authorized: true
      })
      .state('messagesDetail', {
        url: '/messages/detail',
        templateUrl: 'app/message/messageDetail.view.html',
       /*  controller: 'MessageDetailController',
        controllerAs: 'vm',
        params: {
          message: null
        },
        autoSignin: true,
        authorized: true */
      })
      .state('startups', {
        abstract: true,
        url: '/startups',
        template: '<ui-view/>'
      })
      .state('startups.list', {
		  title: 'All Projects',
        url: '',
        templateUrl: 'app/startup/list-startup.view.html',
        controller: 'StartupsListController',
        controllerAs: 'vm'
      })
	  .state('startups.subcribed', {
		  title: 'All Projects subcribed',
        url: '/subscribed',
        templateUrl: 'app/startup/list-startup-subscribed.html',
        controller: 'StartupsListController',
        controllerAs: 'vm'
      })
      .state('startups.view', {
        url: '/:startupId',
        templateUrl: 'app/startup/startup.view.html',
        resolve: {
          startupResolve: getStartup
        },
        controller: 'StartupsController',
        controllerAs: 'vm'
      })
	  .state('faqs', {
		  title: 'FAQs',
        url: '/faqs',
        templateUrl: 'app/faqs/faqs.view.html',
        controller: 'faqsController',
        controllerAs: 'vm'
      })
	  .state('contact', {
		  title: 'Contact',
        url: '/contact',
        templateUrl: 'app/contact/contact.view.html',
        controller: 'contactController',
        controllerAs: 'vm'
      })
	  .state('search', {
		  title: 'Search',
        url: '/search',
        templateUrl: 'app/search/search.view.html',
        controller: 'searchController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/not-found');
  }

  getCampaign.$inject = ['$stateParams', 'CampaignsService'];

  function getCampaign($stateParams, CampaignsService) {
    return CampaignsService.get({
      campaignId: $stateParams.campaignId
    }).$promise;
  }

  getStartup.$inject = ['$stateParams', 'StartupsService'];

  function getStartup($stateParams, StartupsService) {
    return StartupsService.get({
      startupId: $stateParams.startupId
    }).$promise;
  }

  newVisitEvent.$inject = ['$stateParams', 'DataService'];

  function newVisitEvent($stateParams, DataService) {
    return DataService.newVisitEvent($stateParams.campaignId, function () {}, function () {});
  }

  getNumberOfReferrals.$inject = ['$stateParams', 'CampaignsService'];

  function getNumberOfReferrals($stateParams, CampaignsService) {
    return CampaignsService.getNumberOfReferrals({
      campaignId: $stateParams.campaignId
    }).$promise;
  };
  
function root($rootScope, $state, $timeout) {
    $rootScope.$on('$stateChangeSuccess', function() {
        $timeout(function() { 

           if(typeof $state.current.title == 'undefined') {
              // document.title = 'Page';
           } else if (typeof $state.current.title == 'string') {
               document.title =$state.current.title;
           }

}, 100);
    });
}




})();
