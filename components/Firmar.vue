<template>
  <div>
      <h1>Firmar certificado</h1>
      
      <form @submit.prevent="Cargar()" enctype="multipart/form-data">
        <v-file-input
                accept=".crt"
                label="Click aqui para seleccionar archivo a firmar"
                filled
                v-model="chosenFile"
              >
              </v-file-input>

        <v-btn right @click="importTxt">Firmar Archivo</v-btn>
        
        
      </form>
<!--
      <v-btn right @click="prueba">prueba</v-btn>
        <v-btn right @click="create">test</v-btn>
      {{ datas }}
  ----------
  <p></p>
  {{ res }} 
  -->
</div>

</template>
  <script>
  import axios from "axios";
  import {SHA3} from "sha3";
  export default {
    data() {
      return {
        chosenFile: null, // <- initialize the v-model prop
        datas: null,
        bas:"",
        res:"" ,
        user : 0,           
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
      Cargar(){
        const formdata = new FormData();
        formdata.append('file', this.fichero);

        axios.post('http://127.0.0.1:7000/valida', form, {headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
          console.log(response.data);
        });
      },

      importTxt() {
        
        if (!this.chosenFile) {this.datas = "No File Chosen"}
        var reader = new FileReader();
        
        // Use the javascript reader object to load the contents
        // of the file in the v-model prop
        reader.readAsText(this.chosenFile);
        reader.onload = () => {
          this.datas = reader.result;
          axios({
  //url: 'http://172.16.214.73:8080/firmarCertificado', //your url
  url: 'http://127.0.0.1:7000/firmar', //your url
  method: 'POST',
  data:{
    id: this.user,
  certificado:this.datas,
},
  //responseType: 'json', // important
  responseType: 'blob'
}).then(response =>{ 
//this.res = response.data
//console.log(res)
// create file link in browser's memory
  const href = URL.createObjectURL(response.data);
console.log(response)
  // create "a" HTML element with href to file & click
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', 'certificadoFirmado.crt'); //or any other extension
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
/*
if(this.res.codigo=="000"){
  let contenido=atob(response.data.firma)
        let nombre ="certificadoFirmado.cert"
        const a = document.createElement("a");
        const archivo = new Blob([contenido], { type: 'text/cert' });
        const url = URL.createObjectURL(archivo);
        a.href = url;
        a.download = nombre;
        a.click();
        URL.revokeObjectURL(url);
}
*/
}
);
        }
        

      },
      create(){
        let contenido="asdfasdf"
        let nombre ="asdfasdf"
        const a = document.createElement("a");
        const archivo = new Blob([contenido], { type: 'text/plain' });
        const url = URL.createObjectURL(archivo);
        a.href = url;
        a.download = nombre;
        a.click();
        URL.revokeObjectURL(url);
    },
    prueba(){
      axios({
  url: 'http://127.0.0.1:7000/firmar', //your url
  method: 'POST',
  data:{
  certificado:"dfasdgaeradfhsdfgasd51",
  id:this.user
},
  //responseType: 'json', // important
}).then(response =>{ 
console.log(response.data)
/*
if(this.res.codigo=="000"){
  let contenido=atob(response.data.firma)
        let nombre ="certificadoFirmado.cert"
        const a = document.createElement("a");
        const archivo = new Blob([contenido], { type: 'text/cert' });
        const url = URL.createObjectURL(archivo);
        a.href = url;
        a.download = nombre;
        a.click();
        URL.revokeObjectURL(url);
}
*/
}
);
    }
    },
    
    
  };
  </script>
<style>

</style>
