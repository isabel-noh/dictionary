import React from "react";
import { Route, useHistory } from 'react-router-dom'
import Main from "./Main";
import { useDispatch } from "react-redux";
import { loadDictFB } from "./redux/modules/dictionary";
import AddWord from "./AddWord";
import EditWord from "./EditWord";
import styled from 'styled-components';

function App() {
  
  const history= useHistory();

  const dispatch = useDispatch();

  React.useEffect(() => { 
    dispatch(loadDictFB()); 
  }, []);


  return (
    <div className="App">
      <TitleWrap>
        <Title onClick={() => { history.push("/")}}>My Dictionary</Title>
      </TitleWrap>
      <Route path= "/" exact>
        <Main />
      </Route>
      <Route path ="/editword/:word" >
        <EditWord />
      </Route>
      <Route path ="/addword" >
        <AddWord />
      </Route>
    </div>
  );
}

const Title = styled.h1`
    color: #0492C2;
    font-weight: 200;
    letter-spacing: 0.01em;
    text-transform: uppercase;
`
const TitleWrap = styled.div`
    text-align: center;
    margin: 5px auto;
`

export default App;
