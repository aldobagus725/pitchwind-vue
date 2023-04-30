<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <div class="row">
                    <div class="col-sm-2">
                      <span class="font-weight-bold"><i class="fa fa-layer-group"></i> PAYMENT METHODS</span>
                    </div>
                    <div class="col-sm-10">
                      <div class="form-group">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <nuxt-link :to="{name: 'admin-paymethod-create'}" class="btn btn-primary">
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
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <b-table responsive striped bordered hover :items="payment_methods.data" :fields="fields" show-empty>
                    <template v-slot:cell(actions)="row">
                        <b-button-group>
                          <b-button :to="{name: 'admin-paymethod-edit-id', params: {id: row.item.id}}" variant="warning">
                              <i class="fas fa-edit"></i> EDIT
                          </b-button>
                          <b-button variant="danger" @click="destroyPayMethod(row.item.id)"><i class="fas fa-trash-alt"></i> DELETE</b-button>
                        </b-button-group>
                    </template>
                  </b-table>
                  <!-- pagination -->
                  <b-pagination align="right" :value="payment_methods.current_page" :total-rows="payment_methods.total"
                    :per-page="payment_methods.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
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
          title: 'Payment Method - Administrator',
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
            {
              label: 'Code',
              key: 'code',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Created At',
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
          await store.dispatch('admin/payment_method/getAllOfPaymentMethods')
      },
  
      //computed
      computed: {
          payment_methods() {
              return this.$store.state.admin.payment_method.payment_methods
          },
      },
      //method
      methods: {
        searchData() {
            this.$store.commit('admin/payment_method/SET_PAGE', 1)
            this.$store.dispatch('admin/payment_method/getAllOfPaymentMethods', this.search)
        },
        changePage(page) {
            this.$store.commit('admin/payment_method/SET_PAGE', page)
            this.$store.dispatch('admin/payment_method/getAllOfPaymentMethods', this.search)
        },
        destroyPayMethod(id) {
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
              this.$store.dispatch('admin/payment_method/destroyPaymentMethod', id)
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
                .catch(error => {
                  console.log(error)
                  console.log(error.response.data.error)
                  var new_error = error.response.data.error
                  this.$swal.fire({
                    title: 'Failed!',
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
  
  <style>
  
  </style>