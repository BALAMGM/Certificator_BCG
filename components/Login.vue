<template>
    <v-sheet width="300" class="mx-auto">

      <v-form ref="form">

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Correo electrónico"
          required
        ></v-text-field>

      
        <v-text-field 
          clearable label="Passwords" :type="tipo" v-model="pass" >
        </v-text-field>
        <v-btn @click="verpass()"  variant="outlined">
          ver
        </v-btn>


        <div class="d-flex flex-column">
          <v-btn
            color="success"
            class="mt-4"
            block
            @click="validate"
          >
            LOGIN
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </template>





    <script>
    import axios from "axios";
    import { SHA3 } from 'sha3';
    export default {
      data() {
        return {
            devmode:false,

            tipo:"password",


            name: '',
            nameRules: [
              v => !!v || 'Este campo es requerido',
              //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            
            emailRules: [
                v => !!v || 'E-mail es requerido',
                v => /.+@.+/.test(v) || 'E-mail debe ser válido'
            ]
        };
      },
      created: function(){
        let today = new Date();
        let min = Math.ceil(105610680);
        let max = Math.floor(654106598470506);
        let r = today.getHours()*today.getMinutes()*today.getSeconds()+today.getMilliseconds()+(Math.floor(Math.random() * (max - min) + min));
        const hash = new SHA3(256);

        hash.update(r.toString());
        let d = hash.digest('hex');
        console.log(d)
        console.log(today.getHours()*today.getMinutes()*today.getSeconds()+today.getMilliseconds()+r)

        this.user = d
      },
      methods: {
        crearLlave() {
          axios({
    url: 'http://127.0.0.1:7000/privada', //your url
    method: 'POST',
    data:{
      id: this.user.toString(),
    keyS: this.SSelect,
    pass: this.pass,
    shaS: this.shaS,
    AesS:this.AesS,
    c:this.c,
    st:this.st,
    l:this.l,
    o:this.o,
    ou:this.ou,
    cn:this.cn,
    dias: this.dias,

  },
    responseType: 'blob', // important
}).then((response) => {
});
        },

      verpass(){
        if(this.tipo=="password"){
          this.tipo = "text"
        }else{
          this.tipo = "password"
        }
      }
      },
      
      
    };
    </script>
  <style>

  </style>