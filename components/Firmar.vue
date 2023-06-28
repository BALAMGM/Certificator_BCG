<template>
  <div>
      <h1>Firmar certificado</h1>
      
      <form @submit.prevent="Cargar()" enctype="multipart/form-data">
        <v-file-input
                accept=".pem"
                label="Click aqui para seleccionar archivo a firmar"
                filled
                v-model="chosenFile"
              >
              </v-file-input>

        <v-btn right @click="importTxt">Firmar Archivo</v-btn>
      </form>
      
        <v-btn right @click="create">test</v-btn>
      {{ datas }}
  ----------
  <p></p>
  {{ res }} 
  
</div>

</template>
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        chosenFile: null, // <- initialize the v-model prop
        datas: null,
        bas:"",
        res:""            
      };
    },
    created: function(){
      
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
  url: 'http://172.16.214.73:8080/firmarCertificado', //your url
  method: 'POST',
  data:{
  certificado:btoa(this.datas),
},
  //responseType: 'json', // important
}).then(response =>{ 
this.res = response.data
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
    }
    },
    
    
  };
  </script>
<style>

</style>
