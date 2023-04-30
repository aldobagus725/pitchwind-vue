<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> ADD PAYMENT CHANNEL</span>
                </div>
                <div class="card-body">
                  <form @submit.prevent="storePayChannel">
                    <div class="row py-3">
                      <div class="col">
                        <div class="form-group">
                          <label>NAMA PAYMENT CHANNEL</label>
                          <input type="text" v-model="payment_channel.channel" placeholder="NAMA PAYMENT CHANNEL"
                            class="form-control">
                          <div v-if="validation.channel" class="mt-2">
                            <b-alert show variant="danger">{{ validation.channel[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label>LOGO BANK</label>
                          <input type="file" @change="handleFileChange" class="form-control">
                          <div v-if="validation.img" class="mt-2">
                            <b-alert show variant="danger">{{ validation.img[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button class="btn btn-info mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i>
                      SAVE</button>
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
          title: 'Add New Payment Channel - Administrator',
        }
      },
      data() {
        return {
          payment_channel: {
            channel: '',
            image: '',
          },
          validation: [],
        }
      },
      methods: {
          handleFileChange(e) {
            let image = this.payment_channel.image = e.target.files[0]
            if (!image.type.match('image.*')) {
              e.target.value = ''
              this.category.image = null
              this.$swal.fire({
                title: 'OOPS!',
                text: "Format File Tidak Didukung!",
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
              })
            }
          },
        async storePayChannel() {
          let formData = new FormData();
          formData.append('channel', this.payment_channel.channel)
          formData.append('img', this.payment_channel.image)
          await this.$store.dispatch('admin/payment_channel/storePaymentChannel', formData)
            .then(() => {
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Data Saved Successfully!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              this.$router.push({
                name: 'admin-paychannel'
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