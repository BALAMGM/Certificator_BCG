<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Bienvenido al certificador
        </v-card-title>
        <v-card-text>
            
          <p>
            Este es un proyecto de la materia de Seguridad en Sistemas de Informacion, que busca simular una entidad certificadora el cual cumple con las siguientes funciones:
            <ol>
              <li>Crear certificado</li>
              <li>Firmar certificado</li>
              <li>Subir certificado</li>
              <li>Validar certificado</li>
            </ol>
          </p>
<p>
  Con la ayuda de <strong>openssl</strong>  se crearon los certificados con el formato x509
</p>
          <hr class="my-3" />
          <p><strong>Balam Garcia Morgado</strong></p>
            <p><strong>Gustavo Perez Briones</strong></p>
            <p><strong>Christian Ruiz Hernandez</strong></p>
            <p><strong>Adriana Perez Navarro</strong></p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
