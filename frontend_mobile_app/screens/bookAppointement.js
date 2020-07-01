import React, { Component } from 'react';
import { View, Text , TouchableOpacity, TextInput} from 'react-native';

//this component is used to create a appointement
export default class AddAppointement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointement:{
        appointee_name: "",
        fromTime: "",
        toTime: ""
      }
    };
  }

  //this method is to update the value in state
  onChange =(name,value)=>{
    let appointement = this.state.appointement
    if(name === "toTime" )
    {
     let toTime = parseInt(value) <= this.props.route.params.item.toTime && parseInt(value) >= this.props.route.params.item.fromTime ? parseInt(value) : this.props.route.params.item.toTime
      appointement["toTime"] = toTime
      this.setState({toTime_validate: false})
    }
    if(name === "fromTime")
    {
      let fromTime = parseInt(value) >= this.props.route.params.item.fromTime &&  parseInt(value) <= this.props.route.params.item.toTime ? parseInt(value) : this.props.route.params.item.fromTime
      appointement["fromTime"] = fromTime
      this.setState({fromTime_validate: false})
    }
    if(name === "appointee_name")
    {
      appointement["appointee_name"] = value
      this.setState({appointee_name_validate: false})
    }
    this.setState({appointement})
  }

  // this method is used for validation of fields 
  validation = () => {
    let appointement = this.state.appointement
    if(appointement.appointee_name === "" || appointement.fromTime === "" || appointement.toTime === "")
    {
      if(appointement.appointee_name === "")
      {
        this.setState({appointee_name_validate: true})
      }
      if(appointement.fromTime === "")
      {
        this.setState({fromTime_validate: true})
      }
      if(appointement.toTime === "")
      {
        this.setState({toTime_validate: true})
      }  
    }
    else{
      return true;
    }
  }

  //for submit the fields on submit button click
  onSubmit = () => {
    let appointement = this.state.appointement
    if(!this.validation())return;{
      let detail = this.props.route.params.item
      let data = {
        name: detail.name,
        appointement: appointement
      } 
      this.props.navigation.navigate("Sellers List" , {data , update: true})  
    }
  }

  render() {
    return (
      <View style={{margin: 10 , flex: 1}}>
        <View>
          <Text style={{marginTop: 5}}> Name </Text>
          <TextInput editable = {false} style={{color: "red",height: 40,borderRadius: 20 , borderColor: 'gray', borderWidth: 1 , paddingLeft: 15 , paddingRight: 15 , paddingTop: 8 , paddingBottom: 8 , marginTop: 5 , marginLeft: 2 , marginRight: 2}} value={this.props.route.params.item.name}/>
        </View>
        <View>
          <Text style={{marginTop: 5}}> Location </Text>
          <TextInput editable = {false} style={{color: "red",height: 40, borderRadius: 20 ,  borderColor: 'gray', borderWidth: 1 , paddingLeft: 15 , paddingRight: 15 , paddingTop: 8 , paddingBottom: 8 , marginTop: 5 , marginLeft: 2 , marginRight: 2}} value={this.props.route.params.item.location}/>
        </View>
        <View>
          <Text style={{marginTop: 5}}> Available Time </Text>
          <TextInput editable = {false} style={{color: "red",height: 40, borderRadius: 20 , borderColor: 'gray', borderWidth: 1 , paddingLeft: 15 , paddingRight: 15 , paddingTop: 8 , paddingBottom: 8 , marginTop: 5 , marginLeft: 2 , marginRight: 2}} value={this.props.route.params.item.fromTime + " to " + this.props.route.params.item.toTime}/>
        </View>
        <View>
          <Text style={{marginTop: 5}}> Appointee's Name </Text>
          <TextInput placeholder="Type your name" name="appointee_name" onChangeText={(text) => {this.onChange("appointee_name", text)}} value={this.state.appointee_name} style={{color: "red",height: 40, borderRadius: 20 , borderColor: 'gray', borderWidth: 1 , paddingLeft: 15 , paddingRight: 15 , paddingTop: 8 , paddingBottom: 8 , marginTop: 5 , marginLeft: 2 , marginRight: 2}} />
           {this.state.appointee_name_validate && <Text style={{color: "red" , fontSize: 12 , paddingLeft: 15 , paddingRight: 15}}>Field are require to submit</Text>}
        </View>
        <View>
          <Text style={{marginTop: 5}}> Appointement Time </Text>
          <View style={{flexDirection:"row"}}>
            <View style={{flex: 2}}>
              <TextInput placeholder="From" name="fromTime" numeric keyboardType={'numeric'} maxLength = {2} onChangeText={(text) => {this.onChange("fromTime", text)}} value={this.state.fromTime} style={{color: "red",height: 40, borderRadius: 20 , borderColor: 'gray', borderWidth: 1 , paddingLeft: 15 , paddingRight: 15 , paddingTop: 8 , paddingBottom: 8 , marginTop: 5 , marginLeft: 2 , marginRight: 2}} />
               {this.state.fromTime_validate && <Text style={{color: "red" , fontSize: 12 , paddingLeft: 15 , paddingRight: 15}}>Field are require to submit</Text>}
            </View>
            <View style={{flex: 2}}>
              <TextInput placeholder="To" name="toTime" numeric keyboardType={'numeric'} maxLength = {2} onChangeText={(text) => {this.onChange("toTime", text)}} value={this.state.toTime} style={{color: "red",height: 40, borderRadius: 20 , borderColor: 'gray', borderWidth: 1 , paddingLeft: 15 , paddingRight: 15 , paddingTop: 8 , paddingBottom: 8 , marginTop: 5 , marginLeft: 2 , marginRight: 2}} />
               {this.state.toTime_validate && <Text style={{color: "red" , fontSize: 12 , paddingLeft: 15 , paddingRight: 15}}>Field are require to submit</Text>}
            </View>
          </View>
        </View> 
        <View style={{justifyContent: "center" , alignItems: "center" }}>
          <TouchableOpacity onPress={this.onSubmit.bind(this)}>
            <Text style={{ backgroundColor: '#f4511e' , height:40 , marginTop: 14 ,textAlign: "center" , color:"white" , fontSize:15 , paddingTop: 10, paddingBottom: 10,  paddingLeft: 15 , paddingRight:15 , borderRadius: 30}}> Submit </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
