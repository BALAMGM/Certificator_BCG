<template>
  <div>
    <v-form>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="c"
          label="Nombre de region(2 Letras)"
          :counter="2"
          required
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="st"
          label="Estado"
          required
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="l"
          label="Ciudad"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="o"            
          label="Nombre de Compañia"
          required
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
        v-model="ou"
          label="Nombre de unidad organizacional"
          required
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="cn"
          label="Nombre completo"
          required
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</v-form>
<v-text-field
          v-model="dias"
          label="dias"
          type="number"
          min="1"
          required
        ></v-text-field>
    <v-text-field clearable label="Passwords" :type="tipo" v-model="pass" ></v-text-field> 
    <v-btn @click="verpass()"  variant="outlined">
ver
</v-btn>
<v-btn @click="test()"  variant="outlined">
probar
</v-btn>
<v-btn @click="descargar()"  variant="outlined">
probar2
</v-btn>
<v-select
        :items="sizes"
        label="Tamaño de llave RSA"
        v-model="SSelect"
      ></v-select>
      <v-select
        :items="SimetricSize"
        label="Tamaño de AES"
        v-model="AesS"
      ></v-select>
      <v-select
        :items="SimetricSize"
        label="Tamaño de Sha"
        v-model="shaS"
      ></v-select>
       
      <div v-show="showkP" >
        
      
    <h3>Generar llaves :</h3>
      <v-btn @click="crearLlave()" variant="outlined">
Generar llave privada
</v-btn>
      <v-btn @click="usar()"  variant="outlined">
Generar llaver publica
</v-btn>
<v-btn v-show="devmode" @click="descargar()"  variant="outlined">
test
</v-btn>
{{ this.testData }}
</div>

  </div>
  
</template>
  <script>
  import axios from "axios";
  import { SHA3 } from 'sha3';
  export default {
    data() {
      return {
          devmode:false,
          kp : "",
          kpU:"",
          kPri:"",
          kPriU:"",
          pass:"",
          showkP:true,
          showPButton:false,
          tipo:"password",
          sizes: [2048, 3072, 4096 ],
          SSelect:2048,
          SimetricSize:[512,256],
          shaS: 256,
          AesS: 256,
          user: 0,
          c:"",
          st:"",
          l:"",
          o:"",
          ou:"",
          cn:"",
          dias:1,
          testData:"",
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
    test(){
        axios({
  url: 'http://172.16.214.73:8080/firmarCertificado', //your url
  method: 'POST',
  data:{
  hash:"dc00352742e74628efcf21095c15f0407fd125fe7ea62a47e17b2b8da914464a",
  tipo:1,
},
  //responseType: 'json', // important
}).then(response => 
this.testData = response.data
);

    },
    test2(){
        axios({
  url: 'http://172.16.214.81:7000/handy', //your url
  method: 'POST',
  data:{
  hash:"dc00352742e74628efcf21095c15f0407fd125fe7ea62a47e17b2b8da914464a",
  tipo:1,
},
  //responseType: 'json', // important
}).then(response => 
this.testData = response.data
);

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
