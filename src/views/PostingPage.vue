<template>
<div class="avatar-container">
    <v-list-item
      :prepend-avatar="require('@/assets/default_profile.png')"
      title="id.."
      @click="selectImage"
    ></v-list-item>
    
    <v-file-input 
      ref="imageFile" 
      v-model="imgFile"
      id="file" 
      accept="image/png, image/jpeg" 
      label="이미지를 선택하세요"
      hide-input
      @change="handleImageChange"
      class="file-input"
    />
  </div>

</template>

<script>
import api from '@/api';

export default{

data(){
    return{
        imgFile:'',
        content:'',
        id:'',
    }
},
methods:{
    selectImage() {
      this.$refs.imageFile.$el.querySelector('input[type="file"]').click(); // 파일 입력 요소 클릭
    },
    async upload(){
        try{
            console.log(this.imgFile)
            const formData=new FormData()
            formData.append('p_img',this.imgFile)
            formData.append('p_content',this.content)
            formData.append('username',this.$store.state.id)
            
            const res=await api.post("/post",formData,{
            headers: {
            'Content-Type': 'multipart/form-data'
            }
            })

            if(res.status===200){
                alert("파일이 업로드 되었습니다")
                this.imgFile=''
            }
        }catch(error){
            alert(error.response.data.message) // 서버에서 검증 거침
        }           
    }
}
}
</script>

<style scoped>
.avatar-container {
  position: relative; /* 부모 요소에 상대적인 위치 지정 */
  display: inline-block; /* 필요에 따라 인라인 블록으로 설정 */
}

.file-input {
  position: absolute; /* 파일 입력 요소를 절대 위치로 설정 */
  top: 0; /* 위치 조정 */
  left: 0; /* 위치 조정 */
  width: 100%; /* 전체 너비로 설정 */
  height: 100%; /* 전체 높이로 설정 */
  opacity: 0; /* 투명하게 하여 보이지 않게 함 */
  cursor: pointer; /* 커서 포인터로 변경 */
}
</style>