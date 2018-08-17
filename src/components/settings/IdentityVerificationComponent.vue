<template>
  <div class="IdentityVerificationComponent">
    <v-layout row justify-center>
      <v-flex xs12>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Identity Verification</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <v-layout row justify-center>
              <v-flex xs12 sm8 md8 lg8>
                <v-alert v-if="!user.entity.verified" outline color="orange" value="true" icon="priority_high">
                  Your account requires some additional verification information!
                </v-alert>
              </v-flex>
            </v-layout>
            <form @submit.prevent="verificationSubmit()">
              <v-layout row justify-center>
                <v-flex xs12 md8>
                  <v-text-field
                    v-model="verification.ein"
                    label="Tax I.D. or EIN"
                    hint="Company Accounts Only"
                    :mask="customMask"
                    :error-messages="errors.collect('Tax I.D. or EIN')"
                    v-validate="{rules: {required: isCompany} }"
                    data-vv-name="Tax I.D. or EIN"
                    persistent-hint
                    v-bind:required="isCompany"
                    ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row justify-center>
                <v-flex xs12 md8>
                  <v-text-field
                    v-model="verification.social"
                    label="Social Security Number"
                    hint="SSN or Foreign Equivalent"
                    persistent-hint
                    :error-messages="errors.collect('Social Security Number')"
                    v-validate="'required|max:9'"
                    data-vv-name="Social Security Number"
                    :mask="mask"
                    required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout class="my-1" row justify-center>
                <h4>Scanned Image of Government Issued ID</h4>
              </v-layout>
              <v-layout row justify-center>
                <div v-if="fileBase64.length > 0">
                  <img id="imagePreview" :src="fileBase64">
                </div>
              </v-layout>
              <v-layout class="my-2" row justify-center>
                <input type="file" style="display: none" @change="onFileSelected" ref="fileInput" required>
                <v-btn @click="$refs.fileInput.click()">Upload Image <v-icon right>file_upload</v-icon></v-btn>
                <v-btn color="primary" type="submit" :loading="loading">Submit <v-icon right>send</v-icon></v-btn>
              </v-layout>
            </form>
            <v-layout row justify-center>
              <small>PII data such as SSNs and ID scans are securely transmitted to Stripe.</small>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<style>
  #imagePreview {
    max-height: 200px;
    max-width: 200px;
  }
</style>
<script>
  import axios from 'axios'
  export default {
    name: 'IdentityVerificationComponent',
    data() {
      return {
        verification: {
          ein: '',
          social: null
        },
        mask: 'social',
        customMask:'##-#######',
        selectedFile: null,
        fileBase64: ''
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      loading() {
        return this.$store.state.loading
      },
      isOwner() {
        return this.$store.state.isOwner
      },
      isCompany() {
        if(this.$store.state.user.entity.acct_type === 'company') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      verificationSubmit() {
        this.$store.dispatch('setLoading', true).then(() => {
          let stripe = Stripe('pk_test_mOI2Fyt6CNWUtXmOu9TiRHha');
          let data = new FormData()
          data.append('file', this.selectedFile)
          data.append('purpose', 'identity_document')
          axios.post('https://uploads.stripe.com/v1/files', data, {
            headers: {
              'Authorization': `Bearer ${stripe._apiKey}`
            }
          }).then(response => {
            let fileData = response.data
            stripe.createToken('account', {
              legal_entity: {
                business_tax_id: this.verification.ein,
                personal_id_number: this.verification.social,
                verification: {
                  document: fileData.id
                }
              }
            }).then(token => {
              axios.patch(this.$store.state.baseApiUrl + `entities/${this.$store.state.user.entity.uuid}`, {
                acct_token: token.token.id
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.$store.state.authObject.token}`
                }
              }).then(() => {
                this.$store.dispatch('refreshUser', this.$store.state.authObject.token).then(() => {
                  this.$store.dispatch('setLoading', false)
                })
              }).catch(err => {
                this.$store.dispatch('setLoading', false)
                console.log(err)
              })
            })
          })
        })
      },
      onFileSelected(event) {
        this.selectedFile = event.target.files[0]
        let reader = new FileReader()
        reader.onload = (e) => {
          this.fileBase64 = e.target.result
        }
        reader.readAsDataURL(this.selectedFile)
      }
    }
  }
</script>
