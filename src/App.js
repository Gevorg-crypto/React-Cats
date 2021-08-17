import React from "react";
import './App.css';
import CategoryList from "./components/CategoryList";
import Cats from "./components/Cats";
import {useSelector} from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// custom hook to get the current pathname in React


function App() {
    const {cats} = useSelector(s => s)
    return (
        <Router>
            <div className="App">
                <CategoryList/>
                <Switch>
                    <Route path={`/category/:id`}>
                        <Cats cats={cats}/>
                    </Route>
                </Switch>
            </div>
        </Router>

    );
}

export default App;
