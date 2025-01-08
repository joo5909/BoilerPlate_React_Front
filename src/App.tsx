import React from 'react';
import './App.css';
import BoardItem from './components/BoardItem';
import Top3Item from './components/Top3Item';
import CommentItem from './components/CommentItem';
import FavoriteItem from './components/FavoriteItem';
import InputBox from 'components/InputBox';
import { latestBoardListMock, top3BoardListMock, commentListMock, favoriteListMock } from 'mocks';
import { Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import User from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import { MAIN_PATH, AUTH_PATH, SEARCH_PATH, USER_PATH, BOARD_PATH, BOARD_WRITE_PATH, BOARD_DETAIL_PATH, BOARD_UPDATE_PATH } from 'constant';


function App() {   
    return (
        <Routes>
            <Route element={<Container/>}>
                <Route path={MAIN_PATH()} element = {<Main/>}/>
                <Route path={AUTH_PATH()} element = {<Authentication/>}/>
                <Route path={SEARCH_PATH(':serchWord')} element = {<Search/>}/>
                <Route path={USER_PATH(':userEmail')} element = {<User/>}/>
                <Route path={BOARD_PATH()}>                
                    <Route path={BOARD_WRITE_PATH()} element = {<BoardWrite/>}/>                
                    <Route path={BOARD_DETAIL_PATH(':boardIdx')} element = {<BoardDetail/>}/>
                    <Route path={BOARD_UPDATE_PATH(':boardIdx')} element = {<BoardUpdate/>}/>
                </Route>
            </Route>
            <Route path="*" element={<h1>Not Found</h1>}/>
        </Routes>
    );
}


/*
function App() {
    const [value, setValue] = React.useState<string>('');
    return (
        <>
            <BrowserRouter>
                <InputBox label='이메일' type='text' placeholder='이메일 주소를 입력해 주세요' value={value} error={false} setValue={setValue} message={'ddd'}/>
            </BrowserRouter>            
        </>
    );
}
*/
/*
function App() {
    return (
        <>
            <BrowserRouter>
             <div style = {{display : 'flex', rowGap : '20px', columnGap : '30px'}}>
                {favoriteListMock.map(favoriteListItem => 
                    <FavoriteItem key={favoriteListItem.email} favoriteListItem={favoriteListItem}/>
                    )}
            </div>
            </BrowserRouter>

            
        </>
    );
}
*/



/*
function App() {
    return (
        <>
            <BrowserRouter>
             <div style = {{padding : '0 20px', display : 'flex', flexDirection : 'column', gap : '30x'}}>
                {commentListMock.map(commentListItem => 
                    <CommentItem key={commentListItem.nickname} commnetListItem={commentListItem}/>
                    )}
            </div>
            </BrowserRouter>

            
        </>
    );
}
*/


/*
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
*/
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
