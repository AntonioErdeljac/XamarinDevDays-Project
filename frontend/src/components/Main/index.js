import React from "react";
import agent from "../../agent";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

//Na componentDidMount fetchamo sve poslove

class Modal extends React.Component {
    constructor(props){
        super(props);

        this.state={
            username: '',
            avatar: '',
            description: ''
        }

        this.handleSubmit = ev => {
            ev.preventDefault();

            this.props.onSubmitForm({Name: this.state.username, Avatar: this.state.avatar, Description: this.state.description})
        }
    }
    render(){
    return (
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add new user</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <fieldset>
                        <fieldset className="form-group">
                            <input placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input placeholder="Description" value={this.state.description} onChange={ev => this.setState({description: ev.target.value})} className="form-control"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input placeholder="Picture" value={this.state.avatar} onChange={ev => this.setState({avatar: ev.target.value})} className="form-control"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <button className="btn btn-primary">Save</button>
                        </fieldset>
                    </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}
}

class Main extends React.Component{
    componentWillMount(){
        this.props.onLoad(agent.Speakers.all());
    }
    
    constructor(props){
        super(props);

        
    }

    handleDelete (id){
        this.props.onDelete(id);
    }

    render(){
        if(this.props.speakers){
            const handleClick = id => {
               this.props.onDelete(id);
            }
        return(
            <div className="container my-3">
                <Modal onSubmitForm={this.props.onSubmitForm} />
                <div className="col-12 col-md-2 offset-md-5">
                <button data-toggle="modal" data-target="#exampleModal" className="btn btn-primary form-control"><i className="fa fa-plus" />&nbsp;Add new</button>
                </div>
                <div className="row">
                        {this.props.speakers.map(function(speaker){

                            const idUser = speaker.id
                            console.log(idUser);
                            return (

                            <div className="col-12 col-md-4">
                                <div className="card my-2" style={{minHeight: '400px'}}>
                                    <div className="card-body"> 
                                    <p><img src={speaker.Avatar} className="mx-3" height="50px" style={{borderRadius: '50%'}}/> {speaker.Name}</p>
                                    <p>{speaker.Description}</p>
                                    <button className="btn btn-danger float-right" onClick={() => handleClick(idUser)}><i className="fa fa-trash-o" />&nbsp;Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                        })}
                    </div>
                </div>
            
        );
    }
    return (
        <div className="container text-center" style={{marginTop: '20%'}}>
            
            <i style={{color: '#2d89e5'}} class="my-auto fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            <br />
            <span className="text-muted my-3">Loading..</span>
        </div>
        )
    }
}


const mapStateToProps = state => ({
    speakers: state.speakers.speakers
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: 'MAIN_PAGE_LOADED', payload}),
    onDelete: id =>
        dispatch({type: 'DELETE_SPEAKER', id, payload: agent.Speakers.del(id)}),
    onSubmitForm: speaker =>
        dispatch({type: 'ADD_SPEAKER', payload: agent.Speakers.post(speaker)})
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);