import React, { useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { editWord } from "./redux/modules/dictionary";
import Button from '@material-ui/core/Button';
import { db } from "./firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const EditWord = (props) => {
    //props로 받은 데이터에서 뭘 수정할 건지.
    const history = useHistory();
    console.log(props); // {}아무것두 없음

    const params = useParams();
    console.log(params.word);  //단어칸에서 edit 찍으면 해당 단어 edit페이지로 넘어오는거야

    useEffect(async()=>{  // async 비동기 await : 기다렸다가 나오면 값 줘~ 
        console.log(db);
        // firebase db 불러오기
        const query = await getDocs(collection(db, "dictionary"));
        query.forEach((doc) =>
            console.log(doc.id, doc.data())
        )                                       //firestore에서 redux로 데이터 가져온 다음 여기서 불러서 뷰에 보여주기

        const docRef = doc(db, "dictionary", "dR2jtENkATWXG6TWZ2KO"); // (firebase, "collection", "collectionID")
         //firebase에 업데이트하기
        // updateDoc(docRef, {done: true});
        
    }, [])



    const word = useRef(params.word);
    const desc = useRef(null);
    const example = useRef(null);

    const dispatch = useDispatch;
    // dispatch(editWord())

    return (
        <Wrap>
            <DictWrap>
                <AddWrap>
                    <h3>단어 수정하기</h3>
                    <AddDetail>
                        <form>
                            <p>WORD <Input required placeholder="단어" ref={word} value={params.word} onChange={() => {console.log(word.current.value)}}/></p> {/* props.word */}
                            <p>DESCRIPTION <Input required placeholder="설명" ref={desc}/></p>   {/* props.desc */}
                            <p>EXAMPLE <Input placeholder="예문" ref={example}/></p>  {/* props.example */}
                        </form>
                    </AddDetail>
                    <Button onClick={() => { history.push("/")}} 
                            variant="outlined"
                            style={{margin: "20px auto 5px auto", display: "block", border: "1px solid rgb(25, 118, 210)"}}>Edit</Button>

      
                </AddWrap>
            </DictWrap>
        </Wrap>

    )
}
const Wrap = styled.div`
    background-color: #0492C2;
    width: 100vw;
    height: 90vh;
    padding-top: 30px;
`
const DictWrap = styled.div`
    width: 400px;
    margin: 10px auto;
    border: 1px solid transparent;
    border-radius: 10px;
    background-color: white; 
`
const AddWrap = styled.div`
    margin: 30px;
    h3{text-align: center; margin: 30px auto; font-size: 1.5em; color: #007ba6}
`
const AddDetail = styled.div`
    width: 350px;
    margin: 0px auto;
`
const Input = styled.input`
    border: 1px solid rgb(25, 118, 210);
    width: 90%;
    display: block;
    padding: 10px 15px;
    margin: 5px auto;
    border-radius: 60px;

    font-weight: 100;
    letter-spacing: 0.01em;
    position: relative;

`
export default EditWord