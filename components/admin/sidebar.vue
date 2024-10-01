<template>
    <ul class="c-sidebar-nav" v-if="authRoles == 'superadmin' ? true : false">
      <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-dashboard'}" class="c-sidebar-nav-link" href="index.html">
          <svg class="c-sidebar-nav-icon">
            <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-speedometer"></use>
          </svg> DASHBOARD</nuxt-link></li>
      <li class="c-sidebar-nav-title">MASTER DATA</li>
      <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-categories'}" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-folder"></use>
        </svg> CATEGORIES</nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
          <nuxt-link :to="{name: 'admin-products'}" class="c-sidebar-nav-link">
              <svg class="c-sidebar-nav-icon">
                  <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-layers"></use>
              </svg> PRODUCTS
          </nuxt-link>
      </li>
      <!-- <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-stock'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-grid"></use>
            </svg> STOCK
        </nuxt-link>
      </li> -->
      <li class="c-sidebar-nav-title">PAYMENTS</li>
      <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-paymethod'}" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-bank"></use>
        </svg> METHODS</nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
          <nuxt-link :to="{name: 'admin-paychannel'}" class="c-sidebar-nav-link">
              <svg class="c-sidebar-nav-icon">
                  <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-money"></use>
              </svg> CHANNELS
          </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-payacc'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-money"></use>
            </svg> BANK ACC.
        </nuxt-link>
      </li>
      <li class="c-sidebar-nav-title">TRANSACTIONS</li>
      <li class="c-sidebar-nav-item">
          <nuxt-link :to="{name: 'admin-invoices'}" class="c-sidebar-nav-link">
              <svg class="c-sidebar-nav-icon">
                  <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-notes"></use>
              </svg> INV-ORDERS
          </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-invoices_pos'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-notes"></use>
            </svg> INV-POS-ORDERS
        </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-promo'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-tag"></use>
            </svg> PROMO
        </nuxt-link>
      </li>
      <li class="c-sidebar-nav-title">INFO &amp; DATA</li>
      <!-- <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-reports'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-spreadsheet"></use>
            </svg> REPORTS
        </nuxt-link>
      </li> -->
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-customers'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-user"></use>
            </svg> CUSTOMERS
        </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-banners'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-image"></use>
            </svg> BANNERS
        </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-articles'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-list"></use>
            </svg> ARTICLES
        </nuxt-link>
      </li>
      <!-- <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-inventory'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-calculator"></use>
            </svg> INVENTORY
        </nuxt-link>
      </li> -->
      <li class="c-sidebar-nav-title">OTHERS</li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-users'}" class="c-sidebar-nav-link">
          <svg class="c-sidebar-nav-icon">
              <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-group"></use>
          </svg> ADMINS
      </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-shipping'}" class="c-sidebar-nav-link">
          <svg class="c-sidebar-nav-icon">
              <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-speedometer"></use>
          </svg> SHIPPING COST
      </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-decoration'}" class="c-sidebar-nav-link">
          <svg class="c-sidebar-nav-icon">
              <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-speedometer"></use>
          </svg> DECORATION COST
      </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-settings'}" class="c-sidebar-nav-link">
          <svg class="c-sidebar-nav-icon">
              <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-cog"></use>
          </svg> SETTINGS
      </nuxt-link>
      </li>
      <li class="c-sidebar-nav-divider"></li>
    </ul>
    <ul class="c-sidebar-nav" v-else-if="authRoles == 'admin' ? true : false">
      <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-dashboard'}" class="c-sidebar-nav-link" href="index.html">
          <svg class="c-sidebar-nav-icon">
            <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-speedometer"></use>
          </svg> DASHBOARD</nuxt-link></li>
      <li class="c-sidebar-nav-title">MASTER DATA</li>
      <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-categories'}" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-folder"></use>
        </svg> CATEGORIES</nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
          <nuxt-link :to="{name: 'admin-products'}" class="c-sidebar-nav-link">
              <svg class="c-sidebar-nav-icon">
                  <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-layers"></use>
              </svg> PRODUCTS
          </nuxt-link>
      </li>
      <!-- <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-stock'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-grid"></use>
            </svg> STOCK
        </nuxt-link>
      </li> -->
      <li class="c-sidebar-nav-title">TRANSACTIONS</li>
      <li class="c-sidebar-nav-item">
          <nuxt-link :to="{name: 'admin-invoices'}" class="c-sidebar-nav-link">
              <svg class="c-sidebar-nav-icon">
                  <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-notes"></use>
              </svg> INVOICES-ORDERS
          </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-invoices_pos'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-notes"></use>
            </svg> INVOICES POS-ORDERS
        </nuxt-link>
      </li>
      <!-- <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-reports'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-spreadsheet"></use>
            </svg> REPORTS
        </nuxt-link>
      </li> -->
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-banners'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-image"></use>
            </svg> BANNERS
        </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-articles'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-list"></use>
            </svg> ARTICLES
        </nuxt-link>
      </li>
      <!-- <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-inventory'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-calculator"></use>
            </svg> INVENTORY
        </nuxt-link>
      </li> -->
      <li class="c-sidebar-nav-title">OTHERS</li>
      <li class="c-sidebar-nav-divider"></li>
    </ul>
  </template>
  <script>
    export default {
      data(){
        return{
          authRoles : ''
        }
      },
      methods:{
        getRoles(){
          var mama = this.$auth.user.data.user.role
          this.authRoles = mama
          console.log(this.authRoles)
        }
      },
      mounted(){
        this.getRoles()
      }
    }
  </script>
  
  <style scoped>
    a.nuxt-link-active {
      background: rgba(255,255,255,.05)!important;
    }
  </style>