'use strict'

module.exports = [
  '$log',
  '$rootScope',
  '$window',
  '$location',
  'authService',
  'galleryService',
  function($log, $rootScope, $window, $location, authService, galleryService){
    this.$onInit = () => {
      $log.debug('#HomeController()')
      if(!$window.localStorage.Token){
        authService.getToken()
        .then(
          () => $location.url('/home'),
          () => $location.url('/signup')
        )
      }
      this.galleries = []

      this,fetchGalleries = () => {
        return galleryService.fetchGalleries()
        .then(galleries => this.galleries = galleries)
        .catch(err => $log.error(err))
      }

      $rootScope.$on('locationChangeSuccess', this.fetchGalleries)
      this.fetchGalleries()
    }
  }
]