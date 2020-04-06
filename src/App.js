import React, { Component} from 'react';
import './App.css';
import zomato from './api/zomato'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../src/Component/CardUI';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      city : '',
      restaurants : [],
      finalsearchlist : [],
      search : ""
    };
    this.handleonchange = this.handleonchange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleonchange(e){
    const cityname = document.getElementById("search-input");
    this.setState({
      city : cityname,
    })
    document.getElementById("title2").style.visibility="visible";
    document.getElementById("search-category").style.visibility="visible";
    document.getElementById("search-label").style.visibility="visible";
  }

  onChange(e){
    this.setState({ search: e.target.value});
  }
  componentDidUpdate(){
      let city_id;    
      const cityname = document.getElementById("search-input").value;
      try {
            let response_city =zomato.get(`/cities?q=${cityname}`)
             .then(response_city => {
              if(response_city.data.location_suggestions.length<=0){
                console.log("Zomato is not available in this city");
              }else{
                city_id=response_city.data.location_suggestions[0].id;
              }
                let response_restaurant = zomato.get(`/search?entity_type=city&entity_id=${city_id}`)
                .then(response_restaurant=>{
                  if(response_restaurant.data.restaurants.length>0){
                    this.setState({
                      restaurants : response_restaurant.data.restaurants,
                    })
                    }else{
                      console.log("No Data");
                  }
                })
            })
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
      const {search} = this.state;
      const filteredlist = this.state.restaurants.filter(restaurants=>{
        return restaurants.restaurant.cuisines.toLowerCase().indexOf(search.toLowerCase())!==-1
      })
       return (
         <div className="App">
           <div className="searchdiv">
            <span>
              <h2 className="heading">Restaurant Search</h2>
              <input type="text" className="search-label" id="search-input" 
                placeholder="Search For City..." name="city_name" />
              <i className="fa fa-search icon"  onClick={this.handleonchange}/>
            </span>
            <span>
              <h2 className="heading" style={{visibility:'hidden'}} id="title2">List Of Restaurant</h2>
              <label className="text-dark" style={{fontSize:'20px !important', visibility:'hidden'}} id="search-label">Search for Cuisines : </label>
              <input type="text" className="search-label" id="search-category" icon="fa fa-searcg-icon" onChange={this.onChange}
                placeholder="Search For Cuisines..." name="city_name"  style={{visibility:'hidden',marginLeft:'2%'}}/>
            </span>
           </div>
           <div className="container-fluid d-flex ">
                <div className="row">
                {
                  filteredlist.map((items) => (
                  <div className="col-md-4">
                    <Card imgsrc={items.restaurant.thumb} title={items.restaurant.name} 
                          location={items.restaurant.location.address} 
                          cuisines={items.restaurant.cuisines}
                          timing={items.restaurant.timings}
                          average_cost_for_two = {items.restaurant.average_cost_for_two}
                          rating={items.restaurant.user_rating.aggregate_rating}
                          id ={items.restaurant.id}
                         />
                  </div>
                  ))
                } 
                </div> 
            </div>    
          </div>
      );
   } 
}
export default App;
    