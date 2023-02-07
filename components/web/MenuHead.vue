<template>
    <!-- <div class="card border-0 rounded shadow border-top-orange" style="height:100vh;"> -->
      <div class="card border-0 rounded shadow">
        <div class="card-body">
          <ul class="nav">
            <li class="nav-item">
              <nuxt-link :to="{name: 'customer-dashboard'}"
                class="nav-link text-uppercase"><i
                  class="fa fa-tachometer-alt"></i> Dashboard
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="{name: 'customer-invoices'}" class="nav-link text-uppercase">
                <i class="fa fa-shopping-cart"></i> My Orders
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="{name: 'customer-profile'}" class="nav-link text-uppercase">
                <i class="fa fa-user-circle"></i> Profile
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
  </template>
  
  <script>
    export default {
    }
  </script>
  <style scoped>
    a.nuxt-link-active {
      background: rgba(255, 222, 212, .05) !important;
    }
  </style>