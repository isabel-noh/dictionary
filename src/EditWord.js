import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { editWord } from "./redux/modules/dictionary";
import Button from '@material-ui/core/Button';
import { editWordFB } from "./redux/modules/dictionary";


const EditWord = (props) => {
    //props로 받은 데이터에서 뭘 수정할 건지.
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const index = params.id;
    const dictionary_list = useSelector((state) => state.dictionary.list);

    const word = useRef("");
    const desc = useRef("");
    const example = useRef("");

    const editWord = () => {
        dispatch(
            editWordFB({
                word: word.current.value,
                desc: desc.current.value,
                example: example.current.value,
                id: dictionary_list[index].id,
            })
        );
        history.goBack();
    }

    return (
        <Wrap>
            <DictWrap>
                <AddWrap>
                    <h3>단어 수정하기</h3>
                    <AddDetail>
                        <form>
                            <p>WORD <Input required placeholder="단어" 
                            ref = {word} 
                            defaultValue = {dictionary_list[index].word} /></p> 
                            <p>DESCRIPTION <Input required placeholder="설명" 
                            defaultValue={dictionary_list[index].desc} 
                            ref={desc}/></p> 
                            <p>EXAMPLE <Input placeholder="예문" 
                            ref={example} 
                            defaultValue={dictionary_list[index].example} /></p>  
                        </form>
                    </AddDetail>
                    <Button onClick={editWord} 
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