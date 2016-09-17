import React, { Component, PropTypes } from 'react';

export default class GradesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      url: ''
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onIdChange = this.onIdChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  onFormSubmit(e) {
    e.preventDefault();

    const { id, url } = this.state;

    if(id.length > 0 && url.length > 0) {
      this.context.router.push(`/grades?id=${id}&url=${url}`);
    }
  };

  onIdChange(e) {
    this.setState({
      id: e.target.value
    });
  }

  onUrlChange(e) {
    this.setState({
      url: e.target.value
    });
  }

  render() {
    return (
      <div id="grades-form" className="row">
        <div className="columns medium-6 small-centered">
          <h1 className="text-center">Welcome to SourceGrade</h1>
          <h3 className="text-center">Search for your grades</h3>
          <form onSubmit={this.onFormSubmit}>
            <input value={this.state.id} type="text" onChange={this.onIdChange} placeholder="Secret Number"/>
            <input value={this.state.url} type="text" onChange={this.onUrlChange} placeholder="Course URL"/>
            <button className="button expanded">Get Grades</button>
          </form>
        </div>
      </div>
    );
  }
}