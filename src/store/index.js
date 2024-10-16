import { createStore } from 'vuex'; 

const store = createStore({
  state: { // 상태 초기화
    id: '',
    role: '',
    deleteState: false,
    imgFile: null // 최초 업로드한 이미지 파일
  },
  mutations: { // 상태 변경 메서드 정의
    setUser(state, user) { // user 객체를 인자로 받아 state의 값을 업데이트
      state.id = user.id;
      state.role = user.role;
    },
    clearUser(state) { // 로그아웃
      state.id = '';
      state.role = '';
    },
    setDeleteState(state, OK){ // 게시물 삭제 상태 업데이트
      state.deleteState=OK;
    },
    setImgFile(state, file) { // 게시물 수정 시 업데이트한 이미지
      state.imgFile = file;
    },

  },
  actions: { // 로직 처리 메서드 정의 => setUser 뮤테이션을 호출하여 user 객체를 전달
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('clearUser');
    },
    deleteOK({ commit }, OK){
      commit('setDeleteState', OK);
    },
    saveImgFile({ commit }, file){
      commit('setImgFile', file);
    }
  },
});

export default store;