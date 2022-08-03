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
            menuOptionsRight: [
            {
                type: 'button',
                text: 'Signup',
                path: {name: 'signup'},
                class: 'button-red',
            },
            {
                type: 'button',
                text: 'Login',
                path: {name: 'login'},
                iconRight:
                '<svg id="i-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M22 6 L30 16 22 26 M30 16 L2 16" /> </svg>',
            },
            ],
      }
    }
  }
  
}

</script>
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
            menuOptionsRight: [
            {
                type: 'button',
                text: 'Signup',
                path: {name: 'signup'},
                class: 'button-red',
            },
            {
                type: 'button',
                text: 'Login',
                path: {name: 'login'},
                iconRight:
                '<svg id="i-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M22 6 L30 16 22 26 M30 16 L2 16" /> </svg>',
            },
            ],
      }
    }
  }
  
}

</script>
