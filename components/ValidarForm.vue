<template>
    <div>
        <h1>Validar certificado</h1>
        
        <form @submit.prevent="Cargar()" enctype="multipart/form-data">
          <v-file-input clearable label="Certificado"></v-file-input>

          <v-btn @click="Cargar()" variant="outlined"> Enviar </v-btn>
        </form>

        
     
    
</div>

  </template>
    <script>
    import axios from "axios";
    export default {
      data() {
        return {
            
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
        }
      },
      
      
    };
    </script>
  <style>

  </style>
