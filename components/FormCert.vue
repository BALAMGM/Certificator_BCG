<template>
    <div>
      <v-text-field clearable label="Contraseña" :type="tipo" :v-model="pass" ></v-text-field> 
      <v-btn @click="verpass()"  variant="outlined">
  ver
</v-btn>
<v-select
          :items="sizes"
          label="Tamaño de llave"
          v-model="SSelect"
        ></v-select>
        <div v-show="showkP" >

        
      <h3>Generar llaves :</h3>
        <p>
          {{ this.kp }}
        </p>
        <v-btn @click="crearLlave()" variant="outlined">
  Generar llave privada
</v-btn>
        <v-btn @click="usar()"  variant="outlined">
  Generar llaver publica
</v-btn>

</div>
    </div>
    
  </template>
    <script>
    import axios from "axios";
    import { SHA3 } from 'sha3';
    export default {
      data() {
        return {
            kp : "",
            kpU:"",
            kPri:"",
            kPriU:"",
            pass:"",
            showkP:false,
            showPButton:false,
            tipo:"password",
            sizes: [2048, 3072, 4096 ],
            SSelect:"",
            user: 0,
        };
      },
      created: function(){
        let today = new Date();
        let min = Math.ceil(105610680);
        let max = Math.floor(654106598470506);
        let r = Math.floor(Math.random() * (max - min) + min);
        const hash = new SHA3(512);

        hash.update(r.toString());
        let d = hash.digest('hex');
        console.log(d)
        console.log(today.getHours()*today.getMinutes()*today.getSeconds()+today.getMilliseconds()+r)

        this.user = r
      },
      methods: {
        crearLlave() {
          axios({
    url: 'http://127.0.0.1:7000/privada', //your url
    method: 'POST',
    data:{
    id: this.user.toString(),
    keyS: this.SSelect,
    pass: this.pass},
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
    pass: this.pass},
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
       
      },
      verpass(){
        if(this.tipo=="password"){
          this.tipo = "text"
        }else{
          this.tipo = "password"
        }
      }
      },
      watch: {
      SSelect(){
      if(this.SSelect!=""){
        this.showkP = true
      }
    }
  }
      
    };
    </script>
  <style>

  </style>
