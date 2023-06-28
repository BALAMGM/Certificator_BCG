<template>
  <div>
      <h1>Validar certificado</h1>
      <v-alert
  border="bottom"
  :color="color"
  outlined
  prominent
  shaped
  text
  type="success"
  v-show="alerta"
>
{{ this.mensaje }}
</v-alert>
      <form @submit.prevent="Cargar()" enctype="multipart/form-data">
        <v-file-input
                accept=".pem"
                label="Click aquí para selccionar archivo a validar"
                filled
                v-model="chosenFile"
              >
              </v-file-input>

        <v-btn right @click="importTxt">Validar Archivo </v-btn>
      </form>

      
   
  
</div>

</template>
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        chosenFile: null, // <- initialize the v-model prop
        datas: null,
        res : "",
        color:"orange",
        mensaje:"",
        alerta:false           
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
        }
        axios({
  url: 'http://172.16.214.73:8080/validarCertificado', //your url
  method: 'POST',
  data:{
  certificado:btoa(this.data),
},
  //responseType: 'json', // important
}).then(response => 
this.res = response.data
);
      }
    },
    watch:{
      res : function(){
        if(this.res.codigo!="000"){
          this.alerta = true
          this.color="red"
          this.mensaje = this.res.descripcion
        }else{
          this.alerta = true
          this.color="green"
          this.mensaje = this.res.descripcion
        }
        
      }

    }
    
    
  };
  </script>
<style>

</style>
