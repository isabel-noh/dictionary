import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

//Action
const LOAD = "dictionary/LOAD"; 
const ADD = "dictionary/ADD";
const DELETE = "dictionary/DELETE";
const DONE = "dictionary/DONE";
const UNDO = "dictionary/UNDO"
// const EDIT = "dictionary/EDIT";

//Initial State 
const initialState = {
    list: [
        {word: 'word', desc: '말, 단어, 이야기', example: 'sentence is made of several words', done: false},
        {word: 'sentence', desc: '문장, 징역을 살다', example: 'the judge sentenced him to a fine of $50 and time served', done: false}
    ],
};

//Action Creaters
export function loadWord(dictionary_list){
    return{type: LOAD, dictionary_list};
}
export function addWord(word){
    return {type: ADD, word};
}
export function deleteWord(word_id){
    return {type: DELETE, word_id};
}
export function doneWord(word_id){
    return {type:DONE, word_id};
}
export function undoWord(word_id){
    return {type:UNDO, word_id};
}
// export function editWord(word){
//     return {type: EDIT, word};
// }

//MiddelWares
export const loadDictFB = () => {
    return async function (dispatch) { // Firebase는 비동기통신으로 정보를 주기 때문에 async 붙여줌
        const dictionary_data = await getDocs(collection(db, "dictionary"));

        let dict_list = [];
        dictionary_data.forEach((x) => {
            dict_list.push({id: x.id, ...x.data()});
        }) 
        dispatch(loadWord(dict_list));

    };
};
//데이터 추가 삭제 및 수정하여 firebase로 연결하는 것은 아직 하지 못하였습니다. 

export const addWordFB = (word) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "dictionary"), word);
        const _word = {id: docRef.id, ...word};

        dispatch(addWord(_word));
    };
};
export const deleteWordFB = (word_id) => {
    return async function (dispatch, getState) {
      const docRef = doc(db, "dictionary", word_id);
      await deleteDoc(docRef);
      dispatch(deleteWord(word_id));
    };
  };

export const doneWordFB = (word_id) => {
    return async function (dispatch, getState) {
      const docRef = doc(db, "dictionary", word_id);
      await updateDoc(docRef, { done: true });
      dispatch(doneWord(word_id));
    };  
};
export const undoWordFB = (word_id) => {
    return async function (dispatch, getState) {
      const docRef = doc(db, "dictionary", word_id);
      await updateDoc(docRef, { done: false });
      dispatch(undoWord(word_id));
    };  
};


//Reducer
export default function reducer(state = initialState, action = {} ){
    switch (action.type) {
        case "dictionary/LOAD" : {
            return {list:action.dictionary_list};//
        }
        case "dictionary/ADD": {
            const new_word_list = [
                ...state.list, {
                    id: action.word.id, 
                    done: false, 
                    word: action.word.word, 
                    desc: action.word.desc, 
                    example: action.word.example,
                }
            ];
            return {list: new_word_list};
        }
        case "dictionary/DELETE":{
            const new_word_list = state.list.filter((x, idx)=>{
                return parseInt(action.word_id) !== idx;
            });
            return {list: new_word_list};
        }
        case "dictionary/DONE":{
            const new_word_list = state.list.map((x, idx) =>{
                if(parseInt(action.word_id) === idx && x.done === false){
                    return {...x, done: true};
                }             
                else return x;
            });
            return {list: new_word_list};
        }
        case "dictionary/UNDO":{
            const new_word_list = state.list.map((x, idx) =>{
                if(parseInt(action.word_id) === idx && x.done === true){
                    return {...x, done: false};
                }
                else return x;
            });
            return {list: new_word_list};
        }
        //단어장 수정
        case "dictionary/EDIT": {
            const new_word_list = state.list.filter((l, idx) => {
                return parseInt(action.index) !== idx;
            })//배열을 spread...
            const edit_word = {word: action.word, desc: action.desc, example: action.example, done: false}
            const edit_word_list = [...new_word_list, edit_word];
            return {list: edit_word_list};
        }
        default:  return state;
    }
}
