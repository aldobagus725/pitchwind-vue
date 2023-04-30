<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> EDIT BANK ACCOUNT</span>
                </div>
                <div class="card-body">
                  <form @submit.prevent="updateBankAcc">
                    <div class="row py-3">
                      <div class="col">
                        <div class="form-group">
                          <label>Pilih Payment Method</label>
                          <select class="form-control" v-model="payment_acc.id_method">
                            <option value="">-- Pilih Payment Method --</option>
                            <option v-for="pm in allPm" :key="pm.id" :value="pm.id">{{ pm.method }}</option>
                          </select>
                          <div v-if="validation.id_method" class="mt-2">
                            <b-alert show variant="danger">{{ validation.id_method[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label>Pilih Payment Channel</label>
                          <select class="form-control" v-model="payment_acc.id_channel">
                            <option value="">-- Pilih Payment Channel --</option>
                            <option v-for="pc in allPc" :key="pc.id" :value="pc.id">{{ pc.channel }}</option>
                          </select>
                          <div v-if="validation.id_method" class="mt-2">
                            <b-alert show variant="danger">{{ validation.id_method[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-2">
                      <div class="col">
                        <div class="form-group">
                          <label>ATAS NAMA</label>
                          <input type="text" v-model="payment_acc.an" placeholder="Atas Nama cth. John Doe"
                            class="form-control">
                          <div v-if="validation.an" class="mt-2">
                            <b-alert show variant="danger">{{ validation.an[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-2">
                      <div class="col">
                        <div class="form-group">
                          <label>NO ACCOUNT BANK (REKENING, DLL)</label>
                          <input type="text" v-model="payment_acc.account_number" placeholder="NO REK"
                            class="form-control">
                          <div v-if="validation.account_number" class="mt-2">
                            <b-alert show variant="danger">{{ validation.account_number[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button class="btn btn-info mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i>
                      UPDATE</button>
                    <button class="btn btn-warning btn-reset" type="reset"><i class="fa fa-redo"></i>
                      RESET</button>
                  </form>
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
          title: 'Edit Payment Bank Account - Administrator',
        }
      },
      data() {
        return {
          payment_acc: {
            id_channel: '',
            id_method: '',
            account_number: '',
            an: '',
          },
          validation: [],
        }
      },
      async asyncData({ store,route }) {
        await store.dispatch('admin/payment_channel/getListOfPaymentChannels')
        await store.dispatch('admin/payment_method/getListOfPaymentMethods')
        await store.dispatch('admin/payment_bank_acc/getOnePaymentBankAcc', route.params.id)
      },
      computed: {
        allPm() {
            return this.$store.state.admin.payment_method.list_payment_methods
        },
        allPc(){
          return this.$store.state.admin.payment_channel.list_payment_channels
        }
      },
      //mounted
      mounted() {
          this.payment_acc.id_channel = this.$store.state.admin.payment_bank_acc.bank_acc.id_channel
          this.payment_acc.id_method = this.$store.state.admin.payment_bank_acc.bank_acc.id_method
          this.payment_acc.account_number = this.$store.state.admin.payment_bank_acc.bank_acc.account_number
          this.payment_acc.an = this.$store.state.admin.payment_bank_acc.bank_acc.an
      },
      methods: {
        async updateBankAcc() {
          let formData = new FormData();
          formData.append('id_channel', this.payment_acc.id_channel)
          formData.append('id_method', this.payment_acc.id_method)
          formData.append('account_number', this.payment_acc.account_number)
          formData.append('an', this.payment_acc.an)
          formData.append("_method", "PATCH")
          await this.$store.dispatch('admin/payment_bank_acc/updatePaymentBankAcc', {
              dataId: this.$route.params.id,
              payload: formData
          })
            .then(() => {
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Data Updated Successfully!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              this.$router.push({
                name: 'admin-payacc'
              })
            })
            .catch(error => {
              console.log(error)
              console.log(error.response.data.error)
              this.validation = JSON.parse(error.response.data.error)
              var new_error = ''
              for(let x in this.validation){
                new_error += this.validation[x][0]+'\n'
                // console.log(new_error)
              }
              this.$swal.fire({
                title: 'Failed!',
                text: new_error,
                icon: 'error',
                showConfirmButton: true,
              })
            })
        }
      }
    }
</script>