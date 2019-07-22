
import React from 'react';
import Main from './main.component'


class Login extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
            login: true,
            username: "",
            password: "",
            age: null,
            loggedIn: false,
            registerError: false,
            userExists: false,
            loginError:false     
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange =this.onPasswordChange.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this)
        this.setRegister = this.setRegister.bind(this)
        this.setLogin = this.setLogin.bind(this)
        this.register = this.register.bind(this);
        this.login = this.login.bind(this)
        this.formIsValid = this.formIsValid.bind(this)

      }

    login(){
      fetch('/users',{ headers:{
        'Content-Type': 'application/json'
      }}).then(response => {
        return response.json()
      }).then(data => {
        
        var data = data.filter(value => value.name == this.state.username)
        
        if (data.length == 1) {
          if (data[0].password == btoa(this.state.password)) {
            this.setState({loggedIn: true})
          }
          else this.setState({loginError: true})
        } else  this.setState({loginError: true})

      })
    }

    formIsValid() {
      console.log(this.state.username.length, this.state.password.length )
      return this.state.username.length > 5 && this.state.password.length > 5
    }

    register() {
      if (this.formIsValid()){
        fetch('/users',{ headers:{
          'Content-Type': 'application/json'
        }}).then(response => {
          return response.json()
        }).then(data => {
          console.log(data, this.state.username)
          var data = data.filter(value => value.name == this.state.username)
          console.log(data)
          if (data.length == 0) {
            var data = {}
            data.name = this.state.username
            data.password = btoa(this.state.password);
            data.age = this.state.age
            fetch('/users',{method:'POST',   headers:{
              'Content-Type': 'application/json'
            },  body: JSON.stringify(data)}).then(() => {
              this.setState({login: true})
            })
          } else this.setState({userExists:true});
    

        })
      } else this.setState({registerError:true});
      // var data = {}
      // data.title = this.state.title
      // fetch('/products',{method:'POST',   headers:{
      //   'Content-Type': 'application/json'
      // },  body: JSON.stringify(data)})
    }



    setRegister() {
        this.setState({login: false})
    }

    setLogin() {
        this.setState({login: true})
    }

    onUsernameChange(e) {
      this.setState({username: e.target.value})
    }


    onPasswordChange(e) {
      this.setState({password: e.target.value})
    }

    onAgeChange(e) {
      this.setState({age: e.target.value})
    }

    render() {
      return <div>
          {(this.state.login && !this.state.loggedIn) ? <div>
              <h1>Login</h1>
              <p>Username: <input onChange={e => this.onUsernameChange(e)}/></p>
              <p>Password: <input onChange={e => this.onPasswordChange(e)}/></p>
              <p><button onClick={this.login}>Login</button></p>
              <p><a href="#" onClick={this.setRegister}>Register</a></p>
              { this.state.loginError ? <span>Login error</span> : null }
              </div> : null }
          {(!this.state.login && !this.state.loggedIn) ?
              <div>
              <h1>Register</h1>
              <p>Age: <input onChange={e => this.onAgeChange(e)}/></p>
              <p>Username: <input onChange={e => this.onUsernameChange(e)}/></p>
              <p>Password: <input onChange={e => this.onPasswordChange(e)}/></p>
              <p><button onClick={this.register}>Register</button></p>
              <p><a href="#" onClick={this.setLogin}>Login</a></p>
              { this.state.userExists ?<span>User exists</span> : null}
              { this.state.registerError ? <span>Form is not valid. Check: Username and password length > 5, not empty</span> : null }
              </div> : null 
              }
            {this.state.loggedIn ? <div>
                <Main/>
            </div>: null}
      </div>
    }
  }
  export default Login