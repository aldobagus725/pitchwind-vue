<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-layer-group"></i> SETTINGS</span>
                </div>
                <div class="card-body">
                  <div class="form-group">
                      <div class="input-group mb-3">
                          <div class="input-group-prepend">
                              <nuxt-link :to="{name: 'admin-settings-create'}" class="btn btn-primary" style="padding-top: 10px;">
                              <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                          </div>
                          <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="Find by product name">
                          <div class="input-group-append">
                              <button @click="searchData" class="btn btn-dark"><i class="fa fa-search"></i>
                              SEARCH
                              </button>
                          </div>
                      </div>
                  </div>
                  <b-table responsive striped bordered hover :items="settings.data" :fields="fields" show-empty>
                    <template v-slot:cell(actions)="row">
                        <b-button-group>
                          <b-button :to="{name: 'admin-settings-edit-id', params: {id: row.item.id}}" variant="warning">
                              <i class="fas fa-edit"></i> EDIT
                          </b-button>
                          <!-- <b-button variant="danger" size="sm" @click="destroySetting(row.item.id)">DELETE</b-button> -->
                          <b-button variant="danger" @click="destroySetting(row.item.id)"><i class="fas fa-trash-alt"></i> DELETE</b-button>
                        </b-button-group>
                    </template>
                  </b-table>
                  <!-- pagination -->
                  <b-pagination align="right" :value="settings.current_page" :total-rows="settings.total"
                    :per-page="settings.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  <script>
    export default {
      //layout
      layout: 'admin',
      //meta
      head() {
        return {
          title: 'Settings - Administrator',
        }
      },
      //data function
      data() {
        return {
          //table header
          fields: [
            {
              label: 'Settings',
              key: 'title',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Variable',
              key: 'name',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Nilai',
              key: 'value',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Actions',
              key: 'actions',
              thClass:'text-center',
              tdClass: 'text-center'
            }
          ],
          //state search
          search: ''
        }
      },
      //hook "asyncData"
      async asyncData({ store }) {
          await store.dispatch('admin/setting/getSettingsData')
      },
  
      //computed
      computed: {
          //settings
          
          settings() {
              console.log(this.$store.state.admin.setting.settings)
              return this.$store.state.admin.setting.settings
          },
      },
      //method
      methods: {
        //method "searchData"
        searchData() {
            //commit to mutation "SET_PAGE"
            this.$store.commit('admin/setting/SET_PAGE', 1)
            //dispatch on action "getsettingsData"
            this.$store.dispatch('admin/setting/getSettingsData', this.search)
        },
        //method "changePage"
        changePage(page) {
            //commit to mutation "SET_PAGE"
            this.$store.commit('admin/setting/SET_PAGE', page)
            //dispatch on action "getsettingsData"
            this.$store.dispatch('admin/setting/getSettingsData', this.search)
        },
        //method "destroySetting"
        destroySetting(id) {
          this.$swal.fire({
            title: 'ARE YOU SURE ?',
            text: "TO ERASE THIS DATA !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'YES!',
            cancelButtonText: 'NO',
          }).then((result) => {
            if (result.isConfirmed) {
              //dispatch to action "deleteCategory" vuex
              this.$store.dispatch('admin/setting/destroySetting', id)
                .then((response) => {
                  console.log(response)
                  //feresh data
                  this.$nuxt.refresh()
                  //alert
                  this.$swal.fire({
                    title: 'SUCCESS!',
                    text: "Data Erased Successfully!",
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                  })

                })
            }
          })
        },
      }
  }
  </script>
  
  <style>
  
  </style>