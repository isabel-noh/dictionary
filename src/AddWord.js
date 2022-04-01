import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWordFB } from "./redux/modules/dictionary";
import { useRef } from "react";
import Button from '@material-ui/core/Button';

const AddWord = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const word = useRef("");
    const desc = useRef("");
    const example = useRef("");

    const addWord = () => {
        //firebase에 추가하기
        // addDoc(collection(db, "dictionary"), {word: "fiancé", desc: "약혼자", example: "le fiancé de Isabel", done: false})
        dispatch(
            addWordFB({
                word: word.current.value,
                desc: desc.current.value,
                example: example.current.valeu,
                done: false,
            })
        );
        history.goBack();
    }

    return (
        <Wrap>
            <DictWrap>
                <AddWrap>
                    <h3>단어 추가하기</h3>
                    <AddDetail>
                            <p>WORD <Input required placeholder="단어" ref={word} /></p>
                            <p>DESCRIPTION <Input required placeholder="설명" ref={desc}/></p>
                            <p>EXAMPLE <Input placeholder="예문" ref={example}/></p>
                    </AddDetail>
                    <Button onClick={addWord} 
                            variant="outlined"
                            style={{margin: "20px auto 5px auto", display: "block", border: "1px solid rgb(25, 118, 210)"}}>Add</Button>
                </AddWrap>
            </DictWrap>
        </Wrap>

    )
}
const Wrap = styled.div`
    background-color: #0492C2;
    width: 100vw;
    height: 100vh;
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
export default AddWord