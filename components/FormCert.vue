<template>
    <div>
      <v-text-field clearable label="Contraseña" type="password"></v-text-field>
      <h3>Llave generada:</h3>
        <p>
          {{ this.kp }}
        </p>
        <v-btn @click="crearLlave()"  variant="outlined">
  Crear llaves
</v-btn>
<v-btn @click="usar()" variant="outlined">
  Usar ->
</v-btn>

<div v-show="showPButton" >
  <v-btn @click="mostrarPriv()" variant="outlined">
  Mostrar privada
</v-btn>
</div>

<h3>Llave publica usada:</h3>
<p>
  {{ this.kpU }}
</p>
<div v-show="showkP" >
<h3>Llave privada usada:</h3>
<p>
  {{ this.kPriU }}
</p>
</div>
    </div>
    
  </template>
    <script>
    const NodeRSA = require('node-rsa');
    export default {
      data() {
        return {
            kp : "",
            kpU:"",
            kPri:"",
            kPriU:"",
            showkP:false,
            showPButton:false,
        };
      },
      methods: {
        crearLlave() {
          let getPrimes = (min, max) => {
  let result = Array(max + 1)
    .fill(0)
    .map((_, i) => i);
  for (let i = 2; i <= Math.sqrt(max + 1); i++) {
    for (let j = i ** 2; j < max + 1; j += i) delete result[j];
  }
  return Object.values(result.slice(Math.max(min, 2)));
};

let getRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let getRandPrime = (min, max) => {
  let primes = getPrimes(min, max);
  return primes[getRandNum(0, primes.length - 1)];
};
let primo = getRandPrime(10000, 10000000)
// Example
//console.log(getRandPrime(10000, 10000000));
          let key = new NodeRSA().generateKeyPair(3072,primo)

        let publicKey = key.exportKey("public");
        let privateKey = key.exportKey("private");
        /*
            const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 128; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    */
            this.kp = publicKey
            this.kPri = privateKey
            this.showPButton =true

        },
        usar(){
            this.kpU=this.kp
            this.kPriU = this.kPri
        },
        mostrarPriv(){
          this.showkP = true
        }
      },
    };
    </script>
  <style>

  </style>
