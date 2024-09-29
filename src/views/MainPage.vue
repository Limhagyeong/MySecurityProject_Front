    <template>
            <v-card>
                <v-file-input 
                ref="imageFile" 
                v-model="imgFile"
                id="file" 
                accept="png" 
                label="이미지를 선택하세요"/>
                    <v-btn color="blue darken-1" flat @click="upload">파일올리기</v-btn>
            </v-card>
    </template>

    <script>
    import axios from 'axios';

    export default{
        data(){
            return{
                imgFile:''
            }
        },
        methods:{
            async upload(){
                try{
                    console.log(this.imgFile)
                    const formData=new FormData()
                    formData.append('image',this.imgFile)
                    
                    const res=await axios.post("/api/s3/upload",formData)
                    if(res.status===200){
                        alert("파일이 업로드 되었습니다")
                    }
                }catch(error){
                    alert(error.response.data.message) // 서버에서 검증 거침
                }           
            }
        }
    }
    </script>