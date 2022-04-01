import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch }from 'react-redux';
import { deleteWordFB, doneWordFB, undoWordFB } from "./redux/modules/dictionary";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Main = () => {
    const history = useHistory();
    
    const dispatch = useDispatch();
    //store에서 정보 불러오기
    const dictionary_list = useSelector((state) => state.dictionary.list);

    const deleteWord = (idx) => {
        dispatch(deleteWordFB(dictionary_list[idx].id));
    }

    const doneWord = (idx) => {
        dispatch(doneWordFB(dictionary_list[idx].id));
    }

    const undoWord = (idx) => {
        dispatch(undoWordFB(dictionary_list[idx].id));
    }
    // useEffect(async()=>{  // async 비동기 await : 기다렸다가 나오면 값 줘~ 
    //     console.log(db);
    //     // firebase db 불러오기
    //     const query = await getDocs(collection(db, "dictionary"));
    //     query.forEach((doc) =>
    //         console.log(doc.id, doc.data())
    //     )                                       //firestore에서 redux로 데이터 가져온 다음 여기서 불러서 뷰에 보여주기

    //     const docRef = doc(db, "dictionary", "dR2jtENkATWXG6TWZ2KO"); // (firebase, "collection", "collectionID")
    //      //firebase에 업데이트하기
    //     // updateDoc(docRef, {done: true});
        
    //     //firebase에서 삭제하기
    //     //deleteDoc(docRef);
    // }, [])

    //DOM으로 올라갈 요소 return
    return(
        <Wrap>
            <DictWrap>
                <div className="CardWrap">
                    {dictionary_list.map((word, idx) => {
                        return(
                            <Card key={idx} done={word.done}>
                                <div className="buttonBox" style={{float:"right"}}>
                                    <Buttons onClick={() => word.done === false ? doneWord(idx) : undoWord(idx)}><CheckIcon/></Buttons>
                                    {/* 버튼>state를 props로 보내줘야돼 */}
                                    {/*query parameeter */}
                                    {/*find index */}
                                    <Buttons onClick={() => history.push("/editword/"+word.id)}><EditIcon /></Buttons>  
                                    <Buttons onClick={() => deleteWord(idx)}><DeleteForeverIcon /></Buttons>
                                </div>
                                <div className="WordWrap">
                                    <InnerTitle>단어</InnerTitle>
                                    <p><b>{word.word}</b></p>
                                </div>
                                <div className="ExplaneWrap">
                                    <InnerTitle>설명</InnerTitle>
                                    <p>{word.desc}</p>
                                </div>
                                <div className="ExampleWrap">
                                    <InnerTitle>예시</InnerTitle>
                                    <Example>{word.example}</Example>
                                </div>
                            </Card>
                        )
                    })}
                </div>
                
                <AddBtn onClick={() => history.push("/addword")}><AddCircleIcon/></AddBtn>
            </DictWrap>
        </Wrap>
    )
}

const Wrap = styled.div`
    background-color: #0492C2;
    width: 100vw;
    height: 100vh;
    padding: 30px 0px;
`
const DictWrap = styled.div`
    width: 400px;
    margin: 0 auto;
    border: 1px solid darkgrey;
    border-radius: 5px;
    background-color: white; 
`

const Buttons = styled.button`
    display: inline-flex;
    flex-direction: row;
    align-items:flex-end;
    border: none;
    background-color: transparent;   

`

const Card = styled.div`
    width: 350px;
    min-height: 200px;

    margin: 10px auto;
    padding: 10px 20px; 

    border: 1px solid #eee;
    border-radius: 15px;

    background-color: ${(props)=> (props.done ? "#0090bd7d" : "transparent")}

`

const InnerTitle = styled.h5`
    color: grey;
    text-decoration: underline;
    text-underline-position: under;
    margin: 10px auto;
`
const Example = styled.p`
    color: #63C5DA;
`
const AddBtn = styled.button`
    position: fixed;
    bottom: 20px;
    z-index: 9999;
    right: 20px;

    width: 30px;
    height: 30px;
    background-color: transparent;
    color: white;
    border: transparent;

`
export default Main