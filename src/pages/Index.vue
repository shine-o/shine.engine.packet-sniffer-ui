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

    <q-drawer v-model="left"  show-if-above side="left" behavior="desktop" >
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

    <q-drawer v-model="right" show-if-above side="right" behavior="desktop" bordered>
      <!-- drawer content -->
      <q-card class="my-card" v-if="packet.data">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Packet Headers</div>
          <q-separator />
          <br>
          <div class="text-bold" >
            <q-btn size="small" round color="teal" icon="file_copy" class="q-ml-lg-md">
            </q-btn>
            <span class="text-right">
              length ->    {{packet.data.length}} bytes
            </span>
          </div>
          <br>
          <div class="text-bold" >
            <q-btn size="small" round color="teal" icon="file_copy" class="q-ml-lg-md">
            </q-btn>
            <span >
              department ->    {{packet.data.department}}
            </span>
          </div>
          <br>
          <div class="text-bold" >
            <q-btn size="small" round color="teal" icon="file_copy" class="q-ml-lg-md">
            </q-btn>
            <span >
              command ->    {{packet.data.command}}
            </span>
          </div>
          <br>
          <div class="text-bold" >
            <q-btn size="small" round color="teal" icon="file_copy" class="q-ml-lg-md">
            </q-btn>
            <span >
              operation code ->    {{packet.data.opCode}}
            </span>
          </div>
        </q-card-section>

        <q-separator />

      </q-card>
      <q-card class="my-card" v-if="packet.data">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Raw Data</div>
        </q-card-section>
        <q-card-section>
            {{packet.data.rawData}}
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn size="small" round color="teal" icon="file_copy" class="q-ml-lg-md"> </q-btn>
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
          v-model="clientPanel"
          align="left"
          active-bg-color="blue-grey-5"
          indicator-color="white"
          active-color="white"
        >
          <q-tab v-show="clients" v-for="(cv, ck) in clients" :key="ck" :name="ck" :label="ck ">
<!--            <span :class="[cv.active ? 'text-light-green-14' : 'text-red-4', 'text-bold']">{{(cv.active ? '[ ACTIVE ]' : '[ INACTIVE ]')}}</span>-->
          </q-tab>
        </q-tabs>
        <br>
        <q-separator />

        <q-tab-panels v-model="clientPanel" class="body--dark">
          <q-tab-panel v-for="(cv, ck) in clients" :key="ck" :name="ck" >
              <q-card flat>
                <q-card-section>
                  <div class="text-h6">TCP Flows</div>
                </q-card-section>

                <q-tabs
                  v-model="clientFlowsPanel"
                  align="left"
                  active-bg-color="blue-grey-5"
                  indicator-color="white"
                  active-color="gray"
                >
                  <q-tab v-for="(fv, fk) in clientFlows(ck)" :key="fk" :name="fk" :label="fv.flowName">
                    <span :class="[fv.active ? 'text-light-green-14' : 'text-red-4', 'text-bold']">{{(fv.active ? '[ FLOWING ]' : '[ TERMINATED ]')}}</span>
                  </q-tab>
                </q-tabs>
                <q-tab-panels v-model="clientFlowsPanel" class="body--dark">
                  <q-tab-panel v-for="(fv, fk) in clientFlows(ck)" :key="fk" :name="fk" class="body--dark">
                    <q-separator />
                    <br>
                    <div class="q-ma-md">
                      <q-scroll-area
                        dark
                        class="bg-dark text-white rounded-borders"
                        style="height: 1080px;"
                      >
                        <q-list dark bordered separator dense>
                            <q-item
                              dark
                              v-for="(pv, pk) in clientFlowPackets(fk)"
                              :key="pk"
                              clickable
                              v-ripple
                              :active="selectedPacket === pv.packetID"
                              @click="packetClick(pv)"
                              active-class="text-orange-10 mnu_active"
                            >
                              <q-item-section align="left">
                                {{pv.packetID}}
                              </q-item-section>
                              <q-item-section align="left">
                                {{pv.timeStamp}}
                              </q-item-section>
                              <q-item-section>
                                {{pv.data.friendlyName}}
                              </q-item-section>
                            </q-item>
                        </q-list>
                      </q-scroll-area>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
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
        clientPanel: "clientPanel",
        clientFlowsPanel: "clientFlowsPanel",
        clientFlowPacketsPanel: "clientFlowPacketsPanel",
        left: false,
        right: false,
        textCopied: false,
        selectedPacket : '',
        packet : {}
        // appliedFilters: []
      }
    },

    methods: {
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
        'clients',
        'clientFlows',
        'clientFlowPackets',
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
