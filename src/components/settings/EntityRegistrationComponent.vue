<template>
  <div class="EntityRegistrationComponent">
    <form @submit.prevent="entitySubmission()">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="e1 > 1">Business Details</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="e1 > 2">Representative Details</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Confirm Details</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-5">
            <v-container>
              <v-text-field
                v-model="entity.name"
                label="Entity Name"
                :error-messages="errors.collect('Entity Name')"
                v-validate="{rules: {required: isCompany} }"
                data-vv-name="Entity Name"
                v-bind:required="isCompany"
                v-bind:disabled="!isCompany"
              ></v-text-field>
              <v-select
                :items="types"
                v-model="entity.type"
                label="Account Type"
                single-line
                :error-messages="errors.collect('Account Type')"
                v-validate="'required'"
                data-vv-name="Account Type"
              required></v-select>
              <v-text-field
                v-model="entity.addressLine1"
                label="Entity Address Line 1"
                :error-messages="errors.collect('Entity Address Line 1')"
                v-validate="'required'"
                data-vv-name="Entity Address Line 1"
                required
              ></v-text-field>
              <v-text-field
                v-model="entity.addressLine2"
                label="Entity Address Line 2"
              ></v-text-field>
              <v-text-field
                v-model="entity.city"
                label="Entity City"
                :error-messages="errors.collect('Entity City')"
                v-validate="'required'"
                data-vv-name="Entity City"
                required
              ></v-text-field>
              <v-layout row justify-space-between>
                <v-flex xs4>
                  <v-select
                    :items="states"
                    v-model="entity.state"
                    label="State"
                    single-line
                    :error-messages="errors.collect('Entity State')"
                    v-validate="'required'"
                    data-vv-name="Entity State"
                  required></v-select>
                </v-flex>
                <v-flex xs7>
                  <v-text-field
                    v-model="entity.zipcode"
                    label="Entity Zipcode"
                    :error-messages="errors.collect('Entity Zipcode')"
                    :counter="5"
                    v-validate="'required|numeric|max:5'"
                    data-vv-name="Entity Zipcode"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-flex xs7 md4>
                <v-select
                  :items="countries"
                  v-model="entity.country"
                  label="Country"
                  single-line
                  :error-messages="errors.collect('Entity Country')"
                  v-validate="'required'"
                  data-vv-name="Entity Country"
                required></v-select>
              </v-flex>
            </v-container>
          </v-card>
          <v-btn color="primary" @click.native="e1 = 2" >Continue</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="mb-5">
            <v-container>
              <v-layout row justify-space-between>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="entity.personal.first_name"
                    label="First Name"
                    :error-messages="errors.collect('First Name')"
                    v-validate="'required'"
                    data-vv-name="First Name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md7>
                  <v-text-field
                    v-model="entity.personal.last_name"
                    label="Last Name"
                    :error-messages="errors.collect('Last Name')"
                    v-validate="'required'"
                    data-vv-name="Last Name"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-menu
                    ref="menu2"
                    lazy
                    :close-on-content-click="false"
                    v-model="date"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    min-width="290px"
                    :return-value.sync="date"
                  >
                    <v-text-field
                      slot="activator"
                      label="Date of Birth"
                      v-model="entity.personal.dob"
                      prepend-icon="event"
                      readonly
                      :error-messages="errors.collect('Date of Birth')"
                      v-validate="'required'"
                      data-vv-name="Date of Birth"
                      required></v-text-field>
                    <v-date-picker v-model="entity.personal.dob" @input="$refs.menu2.save(date)"></v-date-picker>

                  </v-menu>
                </v-flex>
              </v-layout>
              <v-text-field
                v-model="entity.personal.addressLine1"
                label="Address Line 1"
                :error-messages="errors.collect('Address Line 1')"
                v-validate="'required'"
                data-vv-name="Address Line 1"
                required
              ></v-text-field>
              <v-text-field
                v-model="entity.personal.addressLine2"
                label="Address Line 2"
              ></v-text-field>
              <v-text-field
                v-model="entity.personal.city"
                label="City"
                :error-messages="errors.collect('City')"
                v-validate="'required'"
                data-vv-name="City"
                required
              ></v-text-field>
              <v-layout row justify-space-between>
                <v-flex xs4>
                  <v-select
                    :items="states"
                    v-model="entity.personal.state"
                    label="State"
                    single-line
                    :error-messages="errors.collect('State')"
                    v-validate="'required'"
                    data-vv-name="State"
                    required></v-select>
                </v-flex>
                <v-flex xs7>
                  <v-text-field
                    v-model="entity.personal.zipcode"
                    label="Zipcode"
                    :error-messages="errors.collect('Zipcode')"
                    :counter="5"
                    v-validate="'required|numeric|max:5'"
                    data-vv-name="Zipcode"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
          <v-btn flat @click.native="e1 = 1">Back</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card class="mb-5">
            <v-container>
              <h4><u>Business Details</u></h4>
              <h5>Type: {{entity.type}}</h5>
              <h5>{{entity.name}}</h5>
              <h5>{{entity.addressLine1}}</h5>
              <h5>{{entity.addressLine2}}</h5>
              <h5>{{entity.city}}, {{entity.state}} {{entity.zipcode}}</h5>
              <br>
              <h4><u>Representative Details</u></h4>
              <h5>{{entity.personal.first_name}} {{entity.personal.last_name}}</h5>
              <h5>{{entity.personal.addressLine1}}</h5>
              <h5>{{entity.personal.addressLine2}}</h5>
              <h5>{{entity.personal.city}}, {{entity.personal.state}} {{entity.personal.zipcode}}</h5>
            </v-container>
          </v-card>
          <v-btn color="primary" type="submit" :loading="loading">Submit <v-icon right>send</v-icon></v-btn>
          <v-btn flat @click.native="e1 = 2">Back</v-btn>
          <v-layout row class="my-2">
            <small>By clicking submit, you agree to our <a href="#">Terms of Service</a> and the <a href="https://stripe.com/us/connect-account/legal" target="_blank">Stripe Connected Account Terms of Service</a></small>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    </form>
    </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'EntityRegistrationComponent',
    data() {
      return {
        ssn_mask:'####',
        entity: {
          name: '',
          addressLine1: null,
          addressLine2: null,
          city:null,
          state:null,
          zipcode:null,
          ein: null,
          country: null,
          type: null,
          personal: {
            first_name: this.$store.state.user.profile.first_name,
            last_name: this.$store.state.user.profile.last_name,
            addressLine1: null,
            addressLine2: null,
            city: null,
            state: null,
            zipcode:null,
            ssn_last4: null,
            dob: null
          }
        },
        e1: 0,
        states: [
          'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN',
          'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM',
          'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI',
          'VA', 'WA', 'WV', 'WI', 'WY'
        ],
        types: [
          'individual',
          'company'
        ],
        date:null,
        countries: [
          'US'
        ]
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      loading() {
        return this.$store.state.loading
      },
      isCompany() {
        if (this.entity.type === 'company') {
          return true
        } else {
          return false
        }
      }
    },
    created() {
    },
    methods: {
      entitySubmission() {
        this.$store.dispatch('setLoading', true)
        let stripe = Stripe('pk_test_mOI2Fyt6CNWUtXmOu9TiRHha');
        let date = this.entity.personal.dob.split('-')
        stripe.createToken('account', {
          legal_entity: {
            business_name: this.entity.name,
            first_name: this.entity.personal.first_name,
            last_name: this.entity.personal.last_name,
            dob: {
              day: parseInt(date[2], 10),
              month: parseInt(date[1], 10),
              year: parseInt(date[0], 10)
            },
            address: {
              line1: this.entity.addressLine1,
              city: this.entity.city,
              state: this.entity.state,
              postal_code: this.entity.zipcode
            },
            personal_address: {
              line1: this.entity.personal.addressLine1,
              city: this.entity.personal.city,
              state: this.entity.personal.state,
              postal_code: this.entity.personal.zipcode
            },
            type: this.entity.type
          },
          tos_shown_and_accepted: true
        }).then(res => {
          axios.post(this.$store.state.baseApiUrl + 'entities', {
            acct_type: this.entity.type,
            entity_name: this.entity.name,
            country: this.entity.country,
            entity_address_city: this.entity.city,
            entity_address_state: this.entity.state,
            entity_address_line1: this.entity.addressLine1,
            entity_address_line2: this.entity.addressLine2,
            entity_address_zipcode: this.entity.zipcode,
            stripe_acct_token: res.token.id
          }, {
            headers: {
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.$store.state.authObject.token}`
            }
          }).then(response => {
            this.$store.dispatch('refreshUser', this.$store.state.authObject.token).then(() => {
              this.$store.dispatch('setLoading', false)
            })
          }).catch(error => {
            console.log(error)
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
