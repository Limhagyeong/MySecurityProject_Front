<template>
    <v-container>
      <v-dialog
        v-model="detailDialog"
        max-width="850"
        persistent
      >
  
        <v-card
          prepend-icon="mdi-account"
          title="Post"
          style="height: 100%;"
        >
          <v-card-text style="display: flex; height: 100%;" no-gutters>
            <v-col cols="12" md="6" sm="6" style="cursor: pointer;" >
              <div class="imgBox">
              <v-img 
                :src="selectedPost.imgUrl"
                 height="100%"
               /> 
              </div>
            </v-col> 
            <v-row>
            <v-col cols="12" md="6" sm="6"> 
              <v-row style="margin-top: 10px;">
                <v-col style="font-weight: bold; font-size: 20px;">
                  {{ username }}
                  <v-divider style="width: 900px"></v-divider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  {{ selectedPost.content }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          </v-card-text>
  
          <v-divider></v-divider>

          <v-card-actions> 
  
            <v-btn
              text="Close"
              variant="plain"
              @click="dialogClose"
            ></v-btn>
  
            <v-btn
              color="primary"
              text="Save"
              variant="tonal"
              @click="upload"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>

  <script>
  export default{
    props:{
      selectedPost: {
        type: Object,
        required: true
      }
    },
    data(){
      return{
        detailDialog: false,
        username: this.$store.state.id
      }
    },
    methods:{
      dialogClose(){
        this.detailDialog=false
      }
    }
  }
  </script>