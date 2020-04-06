import React from 'react';
import './card-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const Card = props=>{

    function getid(value){
        window.location.href="/restaurantdetail?id="+value;
    }

    return(
        <form>
            <div className="card shadow">
                <div className="overflow">
                <img src={props.imgsrc} className="card-img-top" alt="Alternate Image"></img>
                </div>
                <div className="card-body text-dark">
                    <h4 className="card-title text-center">{props.title}</h4>
                    <p className="card-text text-secondary text-left ">
                        <p><span className="fa fa-map-marker" style={{paddingRight:'5%'}}/> {props.location} </p>
                        <p><span className="fa fa-cutlery" style={{paddingRight:'5%'}}/> {props.cuisines} </p>
                        <p><span className="fa fa-clock-o" style={{paddingRight:'5%'}}/> {props.timing} </p>
                        <p><span className="fa fa-inr" style={{paddingRight:'5%'}}/>Avg. Cost for 2 : {props.average_cost_for_two} </p>
                        <p><span className="fa fa-star" style={{paddingRight:'5%'}}/>Ratings :  {props.rating} </p>
                    </p>
                    <input type="hidden" id="restaurantid" value={props.id}/>
                    <Button type="button" className="btn btn-info" role="button" aria-disabled="true" value ={props.id} onClick={e => getid(e.target.value)}>Restaurant Details</Button>
                </div>
            </div>    
        </form>
    );   
}
export default Card;