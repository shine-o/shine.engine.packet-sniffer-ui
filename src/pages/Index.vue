<template>
  <q-layout view="hHh LpR fFf">

    <q-dialog v-model="textCopied" position="top">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Copied to clipboard</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <br>
      </q-card>
    </q-dialog>

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          Shine Packet Sniffer
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left"  show-if-above side="left" behavior="desktop">
      <q-card>
        <q-card-section>
          <div class="text-bold text-h6">
            Filters
          </div>
          <q-separator></q-separator>
          <q-list>
            <q-item v-for="(ofv, ofk) in opFilters" :key="ofk">
              <q-item-section avatar>
                <q-checkbox v-model="appliedFilters" :val="ofv.opCode" color="teal" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ofv.friendlyName}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-drawer>

    <q-drawer :width="350" v-model="right" show-if-above side="right" behavior="desktop" bordered>
      <!-- drawer content -->
      <q-card class="my-card" v-if="packet.packetData">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Packet Headers</div>
          <q-separator />
          <br>
          <div class="text-bold" >
            <q-btn size="small" round color="teal" icon="file_copy" class="q-ml-lg-md"  @click="copyText(packet.packetData.length)">
            </q-btn>
            <span class="text-right">
              length ->    {{packet.packetData.length}} bytes
            </span>
          </div>
          <br>
          <div class="text-bold" >
            <q-btn size="small" round color="teal" icon="file_copy" class="q-ml-lg-md"  @click="copyText(packet.packetData.department)">
            </q-btn>
            <span >
              department ->    {{packet.packetData.department}}
            </span>
          </div>
          <br>
          <div class="text-bold" >
            <q-btn size="small" round color="teal" icon="file_copy" class="q-ml-lg-md"  @click="copyText(packet.packetData.command)">
            </q-btn>
            <span >
              command ->    {{packet.packetData.command}}
            </span>
          </div>
          <br>
          <div class="text-bold" >
            <q-btn size="small" round color="teal" icon="file_copy" class="q-ml-lg-md"  @click="copyText(packet.packetData.opCode)">
            </q-btn>
            <span >
              operation code ->    {{packet.packetData.opCode}}
            </span>
          </div>
          <br>
          <div class="text-bold">
            <q-btn size="small" round color="teal" icon="file_copy" class="q-ml-lg-md"  @click="copyText(packet.packetData.friendlyName)">
            </q-btn>
            <span >
              command name ->    {{packet.packetData.friendlyName}}
            </span>
          </div>
        </q-card-section>

        <q-separator />

      </q-card>
      <q-card class="my-card" v-if="packet.packetData">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Raw Data</div>
        </q-card-section>
        <q-card-section>
            {{packet.packetData.rawData}}
        </q-card-section>
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Packet Data</div>
        </q-card-section>
        <q-card-section>
          {{packet.packetData.data}}
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn size="small" round color="teal" icon="file_copy" class="q-ml-lg-md" @click="copyText(packet.packetData.data)"> </q-btn>
          <!--          <q-btn flat>Action 2</q-btn>-->
        </q-card-actions>
      </q-card>
      <q-card class="my-card" v-if="packet.packetData">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Unpacked data</div>
        </q-card-section>
        <q-card-section v-if="!isEmpty(packet.ncRepresentation.unpacked_data)">
          <json-viewer :value="JSON.parse(packet.ncRepresentation.unpacked_data)"></json-viewer>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn size="small" round color="teal" icon="file_copy" class="q-ml-lg-md" @click="copyText(packet.packetData.rawData)"> </q-btn>
          <!--          <q-btn flat>Action 2</q-btn>-->
        </q-card-actions>
      </q-card>
    </q-drawer>

    <q-page-container class="q-ma-md">
      <q-card>
        <q-card-section>
          <div class="text-h5">
           Active Clients
            <span>
              <q-btn  round color="red-4"  icon="stop"                v-if="listening" @click="stopListening"/>
              <q-btn round color="light-green-14"  icon="play_arrow" v-else           @click="listenForPackets"/>
            </span>
          </div>
        </q-card-section>
        <q-tabs
          class="q-ma-md"
          v-model="connectionPanel"
          align="left"
          active-bg-color="blue-grey-5"
          indicator-color="white"
          active-color="white"
        >
          <q-tab v-show="connections" v-for="(cv, ck) in connections" :key="ck" :name="ck" :label="ck ">
          </q-tab>
        </q-tabs>
        <br>
        <q-separator />

        <q-tab-panels v-model="connectionPanel" class="body--dark">
          <q-tab-panel v-for="(cv, ck) in connections" :key="ck" :name="ck" >
              <q-card flat>
                <q-card-section>
                </q-card-section>
                <div class="q-ma-md">
                  <q-scroll-area
                    dark
                    class="bg-dark text-white rounded-borders"
                    style="height: 1080px;"
                  >
                    <q-list dark bordered separator dense>
                      <q-item
                        dark
                        v-for="(pv, pk) in connectionPackets(ck)"
                        :key="pk"
                        clickable
                        v-ripple
                        :active="selectedPacket === pv.packetID"
                        @click="packetClick(pv)"
                        active-class="text-orange-10 mnu_active"
                      >
                        <q-item-section align="left">
                          {{pv.timestamp}}
                        </q-item-section>
                        <q-item-section align="left">
                          {{pv.direction}}
                        </q-item-section>
                        <q-item-section align="left">
                          {{pv.packetData.department}}
                        </q-item-section>
                        <q-item-section align="left">
                          {{pv.packetData.command}}
                        </q-item-section>
                        <q-item-section align="left">
                          {{pv.packetData.opCode}}
                        </q-item-section>
                        <q-item-section>
                          {{pv.packetData.friendlyName}}
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-scroll-area>
                </div>
              </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import {clientFlowPackets} from "../store/packets/getters";
  import { copyToClipboard } from 'quasar'

  export default {
    data () {
      return {
        connectionPanel: "connectionPanel",
        connectionPacketsPanel: "connectionPacketsPanel",
        left: false,
        right: false,
        textCopied: false,
        selectedPacket : '',
        packet : {}
        // appliedFilters: []
      }
    },

    methods: {
      isEmpty (input) {
        if (typeof input === 'array') {
          return input.length === 0;
        }

        return !input || Object.keys(input).length === 0;
      },
      packetClick(pv) {
        this.selectedPacket = pv.packetID;
        this.packet = pv;
      },
      copyText(text) {
        let vue = this;

        copyToClipboard(text)
          .then(function (){
            // success!
            vue.textCopied = true;
            setTimeout(function () {
              vue.textCopied = false
            }, 1000)
          })
          .catch(() => {
            // fail
          })
      },
      packetFilter(fk) {
        return clientFlowPackets(fk)
        // return obj
      },
      ...mapActions({
        listenForPackets: 'listenForPackets', // map `this.add()` to `this.$store.dispatch('increment')`
        stopListening: 'stopListening' // map `this.add()` to `this.$store.dispatch('increment')`
      }),
    },
    computed: {
      ...mapGetters([
        'connections',
        'connectionPackets',
        'listening',
        'opFilters'
      ]),
      appliedFilters: {
        get(){
          return this.$store.state.packets.appliedFilters;
        },
        set(filter){
          console.log(filter);
          this.$store.commit('applyFilter', filter);
        },
      }
    }
  }
</script>
