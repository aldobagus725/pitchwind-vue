<template>
    <ul class="c-sidebar-nav">
  
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
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-stock'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-grid"></use>
            </svg> STOCK
        </nuxt-link>
      </li>
  
      <li class="c-sidebar-nav-title">ORDERS</li>
      <!-- <li class="c-sidebar-nav-item"><a href="#" class="c-sidebar-nav-link">
          <svg class="c-sidebar-nav-icon">
            <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-cart"></use>
          </svg> Orders</a>
      </li> -->
      <li class="c-sidebar-nav-item">
          <nuxt-link :to="{name: 'admin-invoices'}" class="c-sidebar-nav-link">
              <svg class="c-sidebar-nav-icon">
                  <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-notes"></use>
              </svg> INVOICES
          </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-invoices_pos'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-notes"></use>
            </svg> INVOICES POS
        </nuxt-link>
    </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-reports'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-spreadsheet"></use>
            </svg> REPORTS - Coming Soon
        </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-promo'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-tag"></use>
            </svg> PROMO - Coming Soon
        </nuxt-link>
      </li>
      <li class="c-sidebar-nav-title">OTHERS</li>
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
  
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-users'}" class="c-sidebar-nav-link">
          <svg class="c-sidebar-nav-icon">
              <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-group"></use>
          </svg> ADMINS
      </nuxt-link>
      </li>
      <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-ongkir'}" class="c-sidebar-nav-link">
          <svg class="c-sidebar-nav-icon">
              <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-speedometer"></use>
          </svg> ONGKIR
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
  </template>
  
  <script>
    export default {
  
    }
  </script>
  
  <style scoped>
    a.nuxt-link-active {
      background: rgba(255,255,255,.05)!important;
    }
  </style>