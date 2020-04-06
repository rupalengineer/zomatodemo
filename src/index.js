import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.min.css';
import RestaurantDetail from './RestaurantDetail';

const url = window.location.href;
const rid = url.split('=')[1];
if(rid){
    ReactDOM.render(<RestaurantDetail id={rid}/>, document.getElementById('root'));
}else{
    ReactDOM.render(<App />, document.getElementById('root'));
}

serviceWorker.unregister();
