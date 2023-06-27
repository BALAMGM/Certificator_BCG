<template>
    <v-sheet width="300" class="mx-auto">
  
      <v-form ref="form">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nombre de Usuario"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Correo electrónico"
          required
        ></v-text-field>

        <v-text-field
          v-model="c"
          :counter="2"
          :rules="nameRules"
          label="Nombre del país (2 caracteres)"
          required
        ></v-text-field>

        <v-text-field
          v-model="st"
          :rules="nameRules"
          label="Nombre del estado"
          required
        ></v-text-field>

        <v-text-field
          v-model="l"
          :rules="nameRules"
          label="Nombre de la ciudad"
          required
        ></v-text-field>

        <v-text-field
          v-model="ou"
          :rules="nameRules"
          label="Nombre de la compañia"
          required
        ></v-text-field>

        <v-text-field
          v-model="cn"
          :rules="nameRules"
          label="Nombre común o nombre de host"
          required
        ></v-text-field>




  
  
        <div class="d-flex flex-column">
          <v-btn
            color="success"
            class="mt-4"
            block
          >
            REGISTRAR
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
            email:"",
            c:"",
            st:"",
            l:"",
            o:"",
            ou:"",
            cn:"",


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
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'llave.key'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
});
/*

          axios.post("http://127.0.0.1:7000/privada",{
    id: '123123',
    keyS: '2084',
    pass: '123123',
  }).then((result) => {
      console.log(result.data);
    });
    */
        },
        usar(){

          axios({
    url: 'http://127.0.0.1:7000/publica', //your url
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
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'certificado.cert'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
});

    /*
      axios.post('http://127.0.0.1:7000/test', {
    id: 'test',
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });*/

        },
        mostrarPriv(){
          this.showkP = true
        },
        descargar(){
          axios({
    url: 'http://127.0.0.1:7000/test', //your url
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
    //responseType: 'blob', // important
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