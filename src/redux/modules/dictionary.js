import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

//Action
const LOAD = "dictionary/LOAD"; 
const ADD = "dictionary/ADD";
const DELETE = "dictionary/DELETE";
const DONE = "dictionary/DONE";
// const EDIT = "dictionary/EDIT";

//Initial State 
const initialState = {
    list: [
        {word: 'word', desc: '말, 단어, 이야기', example: 'sentence is made of several words', done: false},
        {word: 'sentence', desc: '문장, 징역을 살다', example: 'the judge sentenced him to a fine of $50 and time served', done: false},
    ]
};

//Action Creaters
export function loadWord(dictionary_list){
    return{type: LOAD, dictionary_list};
}
export function addWord(word, desc, example){
    return {type: ADD, word, desc, example};
}
export function deleteWord(index){
    return {type: DELETE, index};
}
export function doneWord(index){
    return {type:DONE, index};
}
// export function editWord(word, desc, example, index){
//     return {type: EDIT, word, desc, example, index};
// }

//MiddelWares
export const loadDictFB = () => {
    return async function (dispatch) { // Firebase는 비동기통신으로 정보를 주기 때문에 async 붙여줌
        const dictionary_data = await getDocs(collection(db, "dictionary"));
        console.log(dictionary_data);  // 여기에서 아무것도 안찍힘
    }
}


//Reducer
export default function reducer(state = initialState, action = {} ){
    switch (action.type) {
        // case "dictionary/LOAD" : {
        //     console.log("heeha");
        //     return {list:initialState}
        // }
        case "dictionary/ADD": {
            const new_word = {word: action.word, desc: action.desc, example: action.example, done: false}
            const new_word_list = [...state.list, new_word];
            return {list: new_word_list};
        }
        case "dictionary/DELETE":{
            const new_word_list = state.list.filter((x, idx)=>{
                return parseInt(action.index) !== idx;
            });
            return {list: new_word_list};
        }
        case "dictionary/DONE":{
            const new_word_list = state.list.map((x, idx) =>{
                if(parseInt(action.index) === idx && x.done === false){
                    return {...x, done: true};
                }else if(parseInt(action.index) === idx && x.done === true){
                    return {...x, done: false};
                }                
                else return x;
            });
            console.log(new_word_list);
            return {list: new_word_list};
        }
        //단어장 수정
        // case "dictionary/EDIT": {
        //     const new_word_list = state.list.filter((l, idx) => {
        //         return parseInt(action.index) !== idx;
        //     })
        //     const edit_word = {word: action.word, desc: action.desc, example: action.example, done: false}
        //     const edit_word_list = [new_word_list, edit_word];
        //     return {list: edit_word_list};
        // }
        default:  return state;
    }
}