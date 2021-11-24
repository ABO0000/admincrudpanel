import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';
import AddArticles from '../components/AddArticles';
import Article from '../components/Article';
import Update from '../components/Update';
import AllArticles from '../components/AllArticles';

const Router = (props) => (
        <div>
            <BrowserRouter>
                <div className="py-4">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/addArticles" component={AddArticles} />
                        <Route path="/article/:id" component={Article} />
                        <Route path="/update/:id" component={Update} />
                        <Route path="/allArticles" component={AllArticles}/>
                        
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );


 

export default Router;