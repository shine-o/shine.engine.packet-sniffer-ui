<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
<!--          <q-avatar>-->
<!--            <img src="../assets/shine-engine-logo-512x512.png">-->
<!--          </q-avatar>-->
          Shine packet sniffer
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left"  show-if-above side="left" behavior="desktop" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer v-model="right" show-if-above side="right" behavior="desktop" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="q-ma-md">
      <q-card>
        <q-card-section>
          <div class="text-h5">
            Connected clients
            <span >
              <q-btn round color="red-4"  icon="stop"                v-if="listening" @click="stopListening"/>
              <q-btn round color="light-green-14"  icon="play_arrow" v-else           @click="startListening"/>
            </span>
          </div>
        </q-card-section>
        <q-tabs
          v-model="clientPanel"
          align="left"
          active-bg-color="blue-grey-5"
          indicator-color="white"
          active-color="white"
        >
          <q-tab v-for="(cv, ck) in clients" :key="ck" :name="ck" :label="ck ">
            <span :class="[cv.active ? 'text-light-green-14' : 'text-red-4', 'text-bold']">{{(cv.active ? '[ ACTIVE ]' : '[ INACTIVE ]')}}</span>
          </q-tab>
        </q-tabs>
        <br>
        <q-separator />

        <q-tab-panels v-model="clientPanel" animated  class="body--dark">
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
                  <q-tab v-for="(fv, fk) in cv.flows" :key="fk" :name="fk" :label="fv.flowName">
                    <span :class="[fv.active ? 'text-light-green-14' : 'text-red-4', 'text-bold']">{{(fv.active ? '[ FLOWING ]' : '[ TERMINATED ]')}}</span>
                  </q-tab>
                </q-tabs>
                <q-tab-panels v-model="clientFlowsPanel" animated  class="body--dark">
                  <q-tab-panel v-for="(fv, fk) in cv.flows" :key="fk" :name="fk" class="body--dark">
                    <q-separator />
                    <br>
                    <q-list dark bordered separator>
                      <q-item v-for="(pv, pk) in fv.packets" :key="pk"  clickable v-ripple>
                        <q-item-section>{{pv}}</q-item-section>
                      </q-item>
                    </q-list>
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

  export default {
    data () {
      return {
        clientPanel: "clientPanel",
        clientFlowsPanel: "clientFlowsPanel",
        clientFlowPacketsPanel: "clientFlowPacketsPanel",
        left: false,
        right: false
      }
    },

    methods: {
      ...mapActions({
        startListening: 'startListening', // map `this.add()` to `this.$store.dispatch('increment')`
        stopListening: 'stopListening' // map `this.add()` to `this.$store.dispatch('increment')`
      })
    },
    computed: {
      ...mapGetters([
        'clients',
        'listening',
      ])
    }
  }
</script>
