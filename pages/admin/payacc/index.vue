<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <div class="row">
                    <div class="col-sm-3">
                      <span class="font-weight-bold"><i class="fa fa-layer-group"></i> PAYMENT BANK ACCOUNTS</span>
                    </div>
                    <div class="col-sm-9">
                      <div class="form-group">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <nuxt-link :to="{name: 'admin-payacc-create'}" class="btn btn-primary" style="padding-top: 10px;">
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
                  <b-table responsive striped bordered hover :items="payment_bank_accs.data" :fields="fields" show-empty>
                    <template v-slot:cell(actions)="row">
                        <b-button-group>
                          <b-button :to="{name: 'admin-payacc-edit-id', params: {id: row.item.id}}" variant="warning">
                              <i class="fas fa-edit"></i> EDIT
                          </b-button>
                          <b-button variant="danger" @click="destroyBankAcc(row.item.id)"><i class="fas fa-trash-alt"></i> DELETE</b-button>
                        </b-button-group>
                    </template>
                  </b-table>
                  <!-- pagination -->
                  <b-pagination align="right" :value="payment_bank_accs.current_page" :total-rows="payment_bank_accs.total"
                    :per-page="payment_bank_accs.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
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
          title: 'Payment Bank Accounts - Administrator',
        }
      },
      data() {
        return {
          fields: [
            {
              label: 'Channel',
              key: 'channel',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Method',
              key: 'method',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'No Account',
              key: 'account_number',
              thClass:'text-center',
              tdClass: 'text-center'
            },
            {
              label: 'Payment Name',
              key: 'an',
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
          await store.dispatch('admin/payment_bank_acc/getAllOfPaymentBankAccs')
      },
      //computed
      computed: {
          payment_bank_accs() {
              return this.$store.state.admin.payment_bank_acc.bank_accs
          },
      },
      //method
      methods: {
        searchData() {
            this.$store.commit('admin/payment_bank_accs/SET_PAGE', 1)
            this.$store.dispatch('admin/payment_bank_accs/getAllOfPaymentBankAccs', this.search)
        },
        changePage(page) {
            this.$store.commit('admin/payment_bank_accs/SET_PAGE', page)
            this.$store.dispatch('admin/payment_bank_accs/getAllOfPaymentBankAccs', this.search)
        },
        destroyBankAcc(id) {
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
              this.$store.dispatch('admin/payment_bank_acc/destroyPaymentBankAcc', id)
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