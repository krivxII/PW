const { React, ReactDOM } = window

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    this.refresh = this.refresh.bind(this);
  }
  
  refresh() {
    this.setState({ date: new Date() });
  }
  
  renderTitle() {
    return (<h1>Hello, world!</h1>)
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <button onClick={this.refresh}>Refresh</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);