import React, { Component } from 'react';

export default class Contestants extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      apiData: ''
    }
  }

  componentDidMount() {
    fetch('https://stateapi-test.votenow.tv/widgets/get?wid=31204006f9270601')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          apiData: json,
        })
        console.log(this.state.apiData);
      });
  }

  render() {
    var { isLoaded, apiData } = this.state;
    let contestantContent;

    if (this.state.isLoaded) {
      contestantContent = (
        <div className="contestants">
          {apiData.data.map(data => (
            <div key={data.id} className="cards">
              <img src={data.image} alt={data.name}/>
              <div className="card-info">
                <h1>{data.name}</h1>
                <p>{data.bio}</p>
                <a href={data.link}>{data.link_text}</a>
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      contestantContent = (
        <div>Loading...</div>
      )
    }

    return (
      <div>{contestantContent}</div>
    )
  }
}
