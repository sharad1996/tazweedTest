import React , {Component} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { data } from "../appointments"
import "../style.css";

export default class AppointementList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reject_appointement_array:[],
      accept_appointement_array:[],
      //static data to show the info on the list
      appointements: []
    };
  }

  async componentDidMount() {
    try {
      const baseUrl = process.env.REACT_APP_API;
      const response = await axios.get(`${baseUrl}/api/appointments`);
      console.log(response.data.appointments);
      if (response && response.data.appointements) {
        this.setState({ appointements: response.appointements });
      } else {
        this.setState({ appointements: data });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /*with the help of this function we can reject the appointment and remove 
    those rejected appointement from the list and save the rejected appointement 
    into the reject_appointement_array*/
  rejectAppointement = (item) => {
    let appointements = this.state.appointements
    let reject_item_id = item.item.id
    const index = appointements.map((e) => e.id).indexOf(reject_item_id);
    if(index > -1)
    {
       appointements.splice(index, 1);
       let reject_appointement_array = this.state.reject_appointement_array
       let new_reject_item = reject_appointement_array.concat(item)
       this.setState({reject_appointement_array: new_reject_item , appointements})
    }
  }

  /*with the help of this function we can accept the appointment and save 
    those accepted appointement into the accept_appointement_array*/
  acceptAppointement = (item) => {
    let appointements = this.state.appointements
    let reject_item_id = item.item.id
    const index = appointements.map((e) => e.id).indexOf(reject_item_id);
    if(index > -1)
    {
       let accept_appointement_array = this.state.accept_appointement_array
       let new_accept_item = accept_appointement_array.concat(item)
       appointements[index].status = true
       debugger
       this.setState({accept_appointement_array: new_accept_item , appointements})
    }
  }

  //with the help of forward function we can move to other page with detail
  forward = (name) => {
    if(name === "accept")
    {
        this.props.history.push({ pathname: '/accept_appointement', state: { detail: this.state.accept_appointement_array } })
    }
    if(name === "reject")
    {
        this.props.history.push({ pathname: '/rejected_appointement', state: { detail: this.state.reject_appointement_array } })
    }
  }

  render() {
    return (
        <div className='container'>
            <h2>List of Appointements</h2>
            {
                this.state.appointements && this.state.appointements.length > 0
                ?
                <tabel>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Appointee Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Actions</th>
                    </tr>
                    {
                        this.state.appointements && this.state.appointements.map((item , index) => {
                            return(
                                    <tr style={{textAlign: "center"}}>
                                        <td><label>{index+1}</label></td>
                                        <td><label>{item.id}</label></td>
                                        <td><label>{item.appointee_name}</label></td>
                                        <td><label>{item.fromTime}</label></td>
                                        <td><label>{item.toTime}</label></td>
                                        {
                                            item.status 
                                            ?
                                            <td><button>Accepted</button></td>
                                            :
                                            <td>
                                                <button onClick={() => {this.rejectAppointement({item})}}>Reject</button>
                                                <button onClick={() => {this.acceptAppointement({item})}}>Accept</button>
                                            </td>
                                        }
                                    </tr>
                                )

                        })
                    }
                </tabel>
                :
                <div>
                    No more record found
                </div>
            }
            <div className="m1">
                <button onClick={() => {this.forward("reject")}} >Rejected Appointement List</button>
                <button onClick={() => {this.forward("accept")}} >Accepted Apoointement List</button>
            </div>
        </div>
    );
  }
}
