<template>
    <div class="c-app">
      <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar" style="background-color: #9100dc;">
        <div class="c-sidebar-brand d-lg-down-none">
          <img src="/images/logo.png" class="bg-light rounded shadow-sm p-2" width="35"> <span class="ml-2 font-weight-bold">Bali Fun & Cheer</span>
        </div>
        <!-- sidebar -->
        <Sidebar />
        <!-- end sidebar -->
      </div>
      <div class="c-wrapper c-fixed-components">
        <!-- header -->
        <Header />
        <!-- end header -->
        <div class="c-body">
          <!-- content -->
          <Nuxt />
          <!-- end content -->
        </div>
        <div class="row c-footer">
          <div class="col text-right">
            &copy; 2022 Bali Fun & Cheer
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import Header from '@/components/admin/header.vue'
    import Sidebar from '@/components/admin/sidebar.vue'
    export default {
      //middleware
      middleware: 'isAdmin',
      //register components
      components: {
        Header,
        Sidebar
      }
    }
  </script>