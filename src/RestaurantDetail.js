import React, { Component} from 'react';
import zomato from './api/zomato';
import './Component/card-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Slide } from 'react-slideshow-image';

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}

class RestaurantDetail extends Component {
  
   constructor(props)
   {
     super(props);
     this.state={
       resdet : [],
       resdet_loc:[],
       resdet_photos:[],
       resdet_review:[],
     };
   }
 
   componentDidMount(){
     try {
           let response_resdet =  zomato.get(`/restaurant?res_id=${this.props.id}`)
             .then(response_resdet=>{
                this.setState({  
                  resdet : response_resdet.data,
                  resdet_loc:response_resdet.data.location,
                  resdet_photos:response_resdet.data.photos
                 })
              });
              let response_reviews = zomato.get(`reviews?start=0&count=5&res_id=${this.props.id}`)
              .then(response_reviews=>{
                  this.setState({
                    resdet_review : response_reviews.data.user_reviews,
                  })
              });
              
            } 
        catch(err) {
            return(
              <div>
                <h4>Sorry No Results Found!!</h4>
              </div>
            )
        }
   }

   render(){
    const count =0;
      return (
        <div className="text-center">
            <div className="container-fluid d-flex ">
              <div className="row">
                <h2 className="heading">Details Of Restaurant</h2>
              </div> 
            </div>    
            <div className="container-fluid d-flex ">
              <div className="row">
                <div className="card-body text-dark">
                    <h1 className="heading">{this.state.resdet.name}</h1>
                    <img src={this.state.resdet.featured_image} alt="Alternate Image" style={{width:'50%'}}></img>
                </div>
              </div>    
            </div> 
            <div >
               <Tabs style={{width:'50%',marginLeft:'15%'}}>
                  <TabList> 
                    <Tab style={{borderColor:'black'}}>Photos</Tab>
                    <Tab style={{borderColor:'black'}}>Basics</Tab>
                    <Tab style={{borderColor:'black'}}>Reviews</Tab>
                  </TabList>
                  <TabPanel style={{borderColor:'black'}}>
                  <div className="slide-container">
                        <Slide {...properties}>
                          {
                            this.state.resdet_photos.map((items)=>
                               <div className="each-slide">
                                 <img src={items.photo.thumb_url}  alt="Alternate Image"></img>
                               </div>  
                          )}
                      </Slide>
                  </div>      
                  </TabPanel>
                  <TabPanel>
                    <div>
                        <p className="text-left">
                          <p><span className="fa fa-map-marker" style={{paddingRight:'5%'}}/> {this.state.resdet_loc.address} </p>
                          <p><span className="fa fa-cutlery" style={{paddingRight:'5%'}}/> {this.state.resdet.cuisines} </p>
                          <p><span className="fa fa-clock-o" style={{paddingRight:'5%'}}/> {this.state.resdet.timings} </p>
                          <p><span className="fa fa-inr" style={{paddingRight:'5%'}}/>{this.state.resdet.average_cost_for_two} </p>
                          <p><span className="fa fa-phone" style={{paddingRight:'5%'}}/> {this.state.resdet.phone_numbers} </p>
                        </p>
                    </div>
                  </TabPanel>
                  <TabPanel>
                  <div className="slide-container">
                        <Slide {...properties}>
                          {
                            this.state.resdet_review.map((items)=>
                               <div className="each-slide">
                                 <p className="text-left">
                                 <p><span className="fa fa-user" style={{paddingLeft:'5%'}}/>Name :  {items.review.user.name} </p>
                                   <p><span className="fa fa-star" style={{paddingLeft:'5%'}}/>Rating : {items.review.rating} </p>
                                   <p><span className="fa fa-thumbs-up" style={{paddingLeft:'5%'}}/>Likes : {items.review.likes} </p>
                                   <p><span className="fa fa-align-justify " style={{paddingLeft:'5%'}}>Review : {items.review.review_text}</span></p>
                                     
                                </p>
                               </div>  
                          )}
                      </Slide>
                  </div>      
                  
                    <div>
                        <p className="text-left">
                          <p><span style={{paddingRight:'5%'}}/> {this.state.resdet_review.rating} </p>
                        </p>
                    </div>
                  </TabPanel>
                </Tabs>
            </div>
        </div>
     );
  }
}
export default RestaurantDetail;
    