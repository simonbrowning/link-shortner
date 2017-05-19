import React, {Component} from 'react';

class LinkCreate extends Component {

  constructor (props) {
    super(props);

    this.state = {error: ""};
  }

  handleSumbit(evt){
    evt.preventDefault();


    Meteor.call('links.insert',this.refs.input.value,(err) => {
      if(err){
        this.setState({error: "Enter a valid URL"});
      }else {
        this.setState({error: ""});
        this.refs.input.value = "";
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSumbit.bind(this)}>
        <div className="form-group">
          <label>Link to Shorten</label>
          <input ref="input" type="text" className="form-control"/>
        </div>
        <div className="text-danger">{this.state.error}</div>
        <button className="btn btn-primary">Shorten!</button>
      </form>
    )
  }
}

export default LinkCreate;
