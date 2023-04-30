<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold"><i class="fa fa-folder"></i> ADD PROMO</span>
                </div>
                <div class="card-body">
                  <form @submit.prevent="storePromo">
                    <div class="row py-2">
                      <div class="col">
                        <div class="form-group">
                          <label>NAMA PROMO</label>
                          <input type="text" v-model="promo.title" placeholder="NAMA PROMO"
                            class="form-control">
                          <div v-if="validation.title" class="mt-2">
                            <b-alert show variant="danger">{{ validation.title[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-2">
                      <div class="col">
                        <div class="form-group">
                          <label>DESCRIPTION</label>
                          <textarea class="form-control" v-model="promo.description" placeholder="Deskripsi Promo"></textarea>
                          <div v-if="validation.description" class="mt-2">
                            <b-alert show variant="danger">{{ validation.description[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-2">
                      <div class="col">
                        <div class="form-group">
                          <label>Tanggal Berlaku</label>
                          <input type="date" v-model="promo.from_date"
                            class="form-control">
                          <div v-if="validation.from_date" class="mt-2">
                            <b-alert show variant="danger">{{ validation.from_date[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label>Sampai Dengan</label>
                          <input type="date" v-model="promo.to_date"
                            class="form-control">
                          <div v-if="validation.to_date" class="mt-2">
                            <b-alert show variant="danger">{{ validation.to_date[0] }}</b-alert>
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
          title: 'Add New Promo - Administrator',
        }
      },
  
      data() {
        return {
          promo: {
            title: '',
            from_date: '',
            to_date: '',
            description: '',
          },
          validation: [],
        }
      },
  
      methods: {
        async storePromo() {
          let formData = new FormData();
          formData.append('title', this.promo.title)
          formData.append('from_date', this.promo.from_date)
          formData.append('to_date', this.promo.to_date)
          formData.append('description', this.promo.description)
          await this.$store.dispatch('admin/promo/storePromo', formData)
            .then(() => {
              this.$swal.fire({
                method: 'SUCCESS!',
                text: "Data Saved Successfully!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              this.$router.push({
                name: 'admin-promo'
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