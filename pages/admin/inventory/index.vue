<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-layer-group"></i> INVENTARIS</span>
                </div>
                <div class="card-body">
                  <div class="form-group">
                      <div class="input-group mb-3">
                          <div class="input-group-prepend">
                              <nuxt-link :to="{name: 'admin-inventory-create'}" class="btn btn-primary" style="padding-top: 10px;">
                              <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                          </div>
                          <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="cari">
                          <div class="input-group-append">
                              <button @click="searchData" class="btn btn-dark"><i class="fa fa-search"></i>
                              SEARCH
                              </button>
                          </div>
                      </div>
                  </div>
                  <b-table responsive striped bordered hover :items="inventories.data" :fields="fields" show-empty>
                    <template v-slot:cell(actions)="row">
                        <b-button-group>
                          <b-button :to="{name: 'admin-inventory-edit-id', params: {id: row.item.id}}" variant="warning">
                              <i class="fas fa-edit"></i> EDIT
                          </b-button>
                          <b-button variant="danger" @click="destroyInventory(row.item.id)"><i class="fas fa-trash-alt"></i> DELETE</b-button>
                        </b-button-group>
                    </template>
                  </b-table>
                  <!-- pagination -->
                  <b-pagination align="right" :value="inventories.current_page" :total-rows="inventories.total"
                    :per-page="inventories.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
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
      layout: 'admin',
      head() {
        return {
          title: 'Inventory - Administrator',
        }
      },
      data() {
        return {
          fields: [
            {
              label: 'Method',
              key: 'method',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            // {
            //   label: 'Status',
            //   key: 'published',
            //   thClass:'text-center',
            //   tdClass: 'text-center'
            // },
            {
              label: 'Tanggal Di Buat',
              key: 'created_at',
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
          search: ''
        }
      },
      //hook "asyncData"
      async asyncData({ store }) {
          await store.dispatch('admin/inventory/getAllOfInventories')
      },
      //computed
      computed: {
          inventories() {
              return this.$store.state.admin.inventory.inventories
          },
      },
      //method
      methods: {
        searchData() {
            this.$store.commit('admin/inventory/SET_PAGE', 1)
            this.$store.dispatch('admin/inventory/getAllOfInventories', this.search)
        },
        changePage(page) {
            this.$store.commit('admin/inventory/SET_PAGE', page)
            this.$store.dispatch('admin/inventory/getAllOfInventories', this.search)
        },
        destroyInventory(id) {
          this.$swal.fire({
            title: 'APAKAH ANDA YAKIN ?',
            text: "INGIN MENGHAPUS DATA INI !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'YA, HAPUS!',
            cancelButtonText: 'TIDAK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.$store.dispatch('admin/inventory/destroyInventory', id)
                .then((response) => {
                  console.log(response)
                  //feresh data
                  this.$nuxt.refresh()
                  //alert
                  this.$swal.fire({
                    title: 'BERHASIL!',
                    text: "Data Berhasil Dihapus!",
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                  })
                })
                .catch(error => {
                  console.log(error)
                  console.log(error.response.data.error)
                  var new_error = error.response.data.error
                  this.$swal.fire({
                    title: 'GAGAL!',
                    text: new_error,
                    icon: 'error',
                    showConfirmButton: true,
                  })
                })
            }
          })
        },
      }
  }
  </script>