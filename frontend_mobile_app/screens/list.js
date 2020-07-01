import React, { Component } from 'react';
import axios from "axios";
import { View, Text , TouchableOpacity ,FlatList , TextInput} from 'react-native';
import { sellers } from "../sellers";
//to show the list of all seller on the page
export default class SellerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: "",
      update: false,
      searchTrue: true,
      list: sellers
    };
  }

 //it is used to search the seller from the list
 Search = (event) => {
 	if(this.state.searchField !== "")
 	{
	 	let list = this.state.list
	 	let data = list.filter((item) => item.name.toLowerCase() === event.toLowerCase())
		if(data.length > 0){
			data.map(({name ,location ,fromTime , toTime}) => ({name ,location ,fromTime , toTime}))
			this.props.navigation.navigate("SearchResult", {data})
		}
		else{
			data = [{name:"norecord" , location:"norecord" , fromTime: "norecord" , toTime: "norecord" }]
			this.props.navigation.navigate("SearchResult" , {data})
		}
		this.setState({searchField: "" , searchTrue: true})
 	}
 }

 async componentDidMount() {
    try {
      const baseUrl = process.env.REACT_APP_API;
      const response = await axios.get(`${baseUrl}/api/sellers`);
      console.log(response.users);
      if (response && response.data.users) {
        this.setState({ list: response.data.users });
      } else {
        this.setState({ list: sellers });
      }
    } catch (error) {
      console.error(error);
    }
  }

 componentDidUpdate(){
 	if(this.state.searchTrue && this.props.route.params && this.props.route.params.data.name)
 	{	
	 	let list = this.state.list
	 	let updateRecordName = this.props.route.params.data.name
	 	let data = list.filter((item) => item.name === updateRecordName).map(({name ,location ,toTime , fromTime , appointement}) => ({name ,location ,toTime , fromTime , appointement}))
	 	let newAppointement = this.props.route.params.data.appointement
	 	const index = list.map((e) => e.name).indexOf(updateRecordName);
        list[index].appointement.push(newAppointement) 
	 	return list;
 	}
 }

  render() {
    return (
      <View style={{ flex: 1 , marginLeft: 10 , marginRight: 10 , marginTop: 5 , marginBottom: 5}}>
      	   	<View style={{ flexDirection: 'row' }}>
      	  		<View style={{ flex: 8 }}>
	      	  		<TextInput placeholder="Search for seller" 
	      	  				   style={{ height: 40, borderColor: 'gray', borderWidth: 1 , padding: 8 , marginTop: 5 , marginBottom:5}}
	      	  				   onChangeText={(text) => this.setState({searchField: text , searchTrue: false})}
	      	  				   value={this.state.searchField}
	      	  				   />
	      	  	</View>
	      	  	<View style={{ flex: 2 , alignItems: "center" , justifyContent: "center" , backgroundColor: "grey" , height: 40 , marginLeft: 5 ,marginTop: 5 , marginBottom: 5}}>  
      	   			<TouchableOpacity onPress={this.Search.bind(this, this.state.searchField)}><Text style={{backgroundColor: '#f4511e' , textAlign: "center" , color:"white" , fontSize:15 , padding: 10 , paddingTop: 8 ,paddingBottom:8 , borderRadius: 30}}>Search</Text></TouchableOpacity>
      	   		</View>
      	   	</View>	
	      	<FlatList
		        data={this.state.list}
		        renderItem={({ item , index }) => (
		        	<TouchableOpacity key={index} style={{marginTop: 5 , marginBottom: 5 , borderWidth: 1, borderColor: "grey"}} onPress={() => {this.props.navigation.navigate('Details', {item})}}>
			          	<View style={{flex: 1 , backgroundColor: "#ccc" ,padding: 5 , flexDirection: "row" }} >
				          	<View style={{flex: 7}}>
				          		<Text style={{fontWeight:"bold" , fontSize: 15 , marginBottom: 0}}>{item.name}</Text>
				          		<Text style={{fontSize: 12}}>Location : {item.location}</Text>
				 			</View>
				 			<View style={{flex: 3, justifyContent: "center"}}>
				 				<Text style={{fontSize: 12}}>{item.fromTime + " to " + item.toTime}</Text>
				          	</View>
				          	<View style={{flex: 1, justifyContent: "center"}}>
				 				<Text style={{fontSize: 20, fontWeight: "bold" , color: "grey" }}> > </Text>
				          	</View>
			          	</View>
			        </TouchableOpacity>  
		        )}
	      	/>
	    </View>
    );
  }
}
