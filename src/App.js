import React from 'react';
import RX from 'reactxp';
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import styled from 'styled-components/native'

const Hello = styled.Button``
const Login = styled.View`
  background-color: papayawhip;
  flex: 1;
  justify-content: center;
  padding: 20px;
  width: 100%;
`

const UsernameInput = styled.TextInput`
  color: palevioletred;
  width: 100%;
`
const PasswordInput = styled.TextInput`
  color: palevioletred;
  width: 100%;
`

// const LoginView = () => (
//   <Login>
//     <Hello title={"Hello!"} onPress={this.onButtonPress}/>
//     <RX.Text>Counter: {this.state.counter}</RX.Text>
//     <RX.Text>Username</RX.Text>
//     <UsernameInput 
//       defaultValue={this.state.username} 
//       onChangeText={text => this.onChangeText(text, `username`)} 
//     />
//     <RX.Text>Password</RX.Text>
//     <PasswordInput defaultValue={this.state.password} />
//   </Login>
// )

export default () => {

  console.disableYellowBox = true;

  class App extends RX.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        counter: 0,
      }
  
    }
  
    componentDidMount() {
      configureStore(
        // rehydration callback (after async compatibility and persistStore)
        _ => this.setState({ storeRehydrated: true })
      ).then(
        // creation callback (after async compatibility)
        store => this.setState({ store, storeCreated: true })
      );
    }
  
    onButtonPress = (e) => {
      this.setState({
        counter: this.state.counter + 1
      }, () => console.log(`onButtonPress:  `, this.state.counter))
    }
  
    onChangeText = (text, id) => {
      console.log(text, id)
      this.setState({
        [id]: text
      })
    }
  
    render() {
      if (!this.state.storeCreated || !this.state.storeRehydrated) {
        return <Hello title={"Launch screen"} onPress={this.onButtonPress}/>;
      }
      return (
        <Provider store={this.state.store}>
          <Hello title={"Hello!"} onPress={this.onButtonPress}/>
        </Provider>
      );
    }
  }

  return (<App />)
}