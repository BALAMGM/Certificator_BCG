<template>
    <div>
        <v-text-field label="Public Key" variant="outlined" v-model="kp" ></v-text-field>
        <v-btn @click="crearLlave()"  variant="outlined">
  Crear llaves
</v-btn>
<v-btn @click="usar()" variant="outlined">
  Usar ->
</v-btn>
<v-text-field label="Public Key"  v-model="kpU" variant="outlined"></v-text-field>
    </div>
    
  </template>
    <script>
    export default {
      data() {
        return {
            kp : "",
            kpU:"",
        };
      },
      methods: {
        crearLlave() {
            const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 128; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
            this.kp = result1
        },
        usar(){
            this.kpU=this.kp
        },
      },
    };
    </script>
  <style>

  </style>
