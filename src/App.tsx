import React from 'react';

import './App.css';
import BoardItem from './components/BoardItem';
import Top3Item from './components/Top3Item';
import { latestBoardListMock, top3BoardListMock } from 'mocks';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
             <div style = {{display : 'flex', justifyContent : 'center', gap : '24px'}}>
                {top3BoardListMock.map(top3ListItem => 
                    <Top3Item key={top3ListItem.boardIdx} top3ListItem={top3ListItem}/>
                    )}
            </div>
            </BrowserRouter>

            
        </>
    );
}

/*
function App() {
    return (
        <>
            <BrowserRouter>
                {latestBoardListMock.map(boardListItem => 
                    <BoardItem key={boardListItem.boardIdx} boardListItem={boardListItem}/>
                    )}
            </BrowserRouter>

            
        </>
    );
}
*/

export default App;
