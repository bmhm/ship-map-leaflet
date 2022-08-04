<template>
    <nav-bar :options="navbarOptions" />
</template>


<script>
import VueNavigationBar from 'vue-navigation-bar';
import 'vue-navigation-bar/dist/vue-navigation-bar.css';
import brandImage from '../../src/assets/lockup-color.png';


export default {
  name: 'NavBar',
  components: {
    'nav-bar': VueNavigationBar
  },
  data () {
    return {
        navbarOptions: {
            elementId: 'main-navbar',
            isUsingVueRouter: true,
            mobileBreakpoint: 992,
            brandImagePath: './',
            brandImage,
            brandImageAltText: 'brand-image',
            collapseButtonOpenColor: '#661c23',
            collapseButtonCloseColor: '#661c23',
            showBrandImageInMobilePopup: true,
            ariaLabelMainNav: 'Main Navigation',
            tooltipAnimationType: 'shift-away',
            tooltipPlacement: 'bottom',
            menuOptionsLeft: [
            {
                type: 'link',
                text: 'Latest Data',
                subMenuOptions: [
                {
                    type: 'hr',
                },
                ],
            },
            {
                type: 'link',
                text: 'Last Months Data',
                subMenuOptions: [
                {
                    type: 'hr',
                },
                ],
            },
            {
                type: 'link',
                text: 'Historical Data',
                subMenuOptions: [
                {
                    type: 'link',
                    text: 'Date Picker',
                    path: {name: 'MyDatePicker.vue'},
                    iconLeft: '<i class="fa fa-user fa-fw"></i>',
                },
                ],
            },
            ],
      }
    }
  }
  
}

</script>


