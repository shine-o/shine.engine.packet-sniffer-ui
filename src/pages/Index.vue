<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/shine-engine-logo-512x512.png">
          </q-avatar>
          Shine packet sniffer
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
      <q-tabs align="left">
        <!-- > sdada for clients in state.clients <-->
        <q-route-tab to="#page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="left" side="left" overlay behavior="desktop" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer v-model="right" side="right" overlay behavior="desktop" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  export default {
    data () {
      return {
        left: false,
        right: false
      }
    }
  }
</script>
