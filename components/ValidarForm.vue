<template>
    <div>
        <h1>Validar certificado</h1>
     
    
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
      },
      
      
    };
    </script>
  <style>

  </style>
