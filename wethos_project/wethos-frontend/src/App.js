import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router'
var qs = require('qs');

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      freelancers: [],
      single_freelancer: [], 
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/getfreelancers/')
      .then(res => {
        const freelancers = res.data.map(obj => obj);
        this.setState({ freelancers });
      });
  }

  componentWillMount() {
    const freelancer_id = window.location.pathname.split("/").pop();
    axios.get('http://localhost:8000/getfreelancers/' + freelancer_id)
      .then(res => {
      const single_freelancer = res.data[0].fields;
      single_freelancer["pk"] = res.data[0].pk;
      this.setState({ single_freelancer: single_freelancer });
    });
  }

  toggleApproveFreelancer(user_pk) {
    const checkbox_val = document.getElementById("approveFreelancer").checked;
    var checkbox_val_int = checkbox_val == true ? 1 : 0;
    console.log(checkbox_val_int);
    axios.post('http://localhost:8000/approve/' + checkbox_val_int + "/" + user_pk + "/")
      .then(function (response) {
      })
  }

  render() {
    return (
      <div>
        <main>
          <Route
            path='/'
            exact
            render={() => (
              <div style={{paddingLeft: 10}}>
              <h1 style={{color: "#904aff"}}>Wethos</h1>
              <h2>Nonprofits Deserve the Best Talent</h2>
              <p>
                Wethos matches nonprofits of all sizes with skilled, affordable freelancers that care about your cause so you can get back to solving the world’s toughest problems
              </p>
              
              <button type="button" style={{marginLeft: 10}} ><a href={`/register`}>Register Now!</a></button>


              </div>            
            )
          }/>
          <Route
            path='/admin/freelancers'
            render={() => (
              <div style={{marginLeft: 10}}>
                <h1 style={{color: "#904aff"}}>Wethos Admin Dashboard: Freelancers</h1>
                <table>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Bio</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Personal Website URL</th>
                    <th>Previous Work URLs</th>
                    <th>Details Page</th>
                  </tr>

                  {
                    this.state.freelancers.map(
                      freelancer => <tr>
                                <td>{freelancer.fields.first_name}</td>
                                <td>{freelancer.fields.last_name}</td>
                                <td>{freelancer.fields.bio}</td>
                                <td>{freelancer.fields.city}</td>
                                <td>{freelancer.fields.state}</td>
                                <td>{freelancer.fields.country}</td>
                                <td>{freelancer.fields.personal_website_url}</td>
                                <td>{freelancer.fields.previous_work_urls}</td>
                                <td><a href={`/admin/freelancer/${freelancer.pk}`}>Details Page</a></td>
                              </tr>
                      )
                  }
                </table>
              </div>
              )
            }/>
        <Route 
          exact
          path='/admin/freelancer/:id' 
          render={(props) =>
          (
            <div style={{paddingLeft: 10}}>
              <h1 style={{color: "#904aff"}}>{this.state.single_freelancer.first_name} {this.state.single_freelancer.last_name}</h1>

              <p>{this.state.single_freelancer.bio}</p>

              <label>
                <strong>{this.state.single_freelancer.city}, {this.state.single_freelancer.state}, {this.state.single_freelancer.country}</strong>
              </label>

              <div style={{paddingTop: 10}}>
                <label>Personal Website: </label><a>{this.state.single_freelancer.personal_website_url}</a>
                <br></br>
                <label>Previous Work URLs: </label><a>{this.state.single_freelancer.previous_work_urls}</a>
              </div>

              <div style={{paddingTop: 10}}>
                <input id="approveFreelancer" type="checkbox"/>
                { this.state.single_freelancer.approved ?  'Freelacer Approved' : 'Freelancer Not Approved' }
                <button type="button" style={{marginLeft: 10}} onClick={() => this.toggleApproveFreelancer(this.state.single_freelancer.pk)}>Update Freelacer Approval Status</button>
              </div>
              

            </div>
              )
        }/>
          <Route 
            path='/register' 
            exact 
            render={() => (
              <html>
                  <head>
                      <title>Freelancer Registration</title>
                  </head>
                  <body style={{paddingLeft: 10}}>
                      <div class="page-header">
                          <a href="http://127.0.0.1:3000/" class="top-menu"><span></span></a>
                      </div>
                      <div class="content container">
                          <div class="row">
                              <div class="col-md-8">
                                <h1 style={{color: "#904aff"}}>Sign Up as a Freelancer today!</h1>
                                <form method="POST" action="http://127.0.0.1:8000/register/">
                                <input type='hidden' name='csrfmiddlewaretoken' value='RmSKNpSiHISfGpzeXhPgNyFARduMiACx7W0psBS3pcMUy4lK3IHGgkfRthU4t52N'/>
                                    <p>
                                      <label for="first_name">First Name: </label> 
                                      <input type="text" name="first_name" required id="id_first_name" rows="4" cols="50" maxlength="200" />
                                    </p>
                                    <p>
                                      <label for="last_name">Last Name: </label> 
                                      <input type="text" name="last_name" required id="id_last_name" maxlength="200" />
                                    </p>
                                    <p>
                                      <label for="bio">Bio: </label> 
                                      <textarea name="bio" id="id_bio" rows="5" cols="50" required></textarea>
                                    </p>
                                    <p>
                                      <label for="city">City: </label> 
                                      <input type="text" name="city" required id="id_city" maxlength="200" />
                                    </p>
                                    <p>
                                      <label for="state">State: </label> 
                                      <input type="text" name="state" required id="id_state" maxlength="200" />
                                    </p>
                                    <p>
                                      <label for="country">Country: </label> 
                                      <input type="text" name="country" required id="id_country" maxlength="200" />
                                    </p>
                                    <p>
                                      <label for="personal_website_url">Personal Website URL (optional): </label> 
                                      <input type="text" name="personal_website_url" id="id_personal_website_url" maxlength="200" />
                                    </p>
                                    <p>
                                      <label for="previous_work_urls">Previous Work URLs (list, maximum of 5, optional): </label> 
                                      <input type="text" name="previous_work_urls" id="id_previous_work_urls" maxlength="200" />
                                    </p>

                                    <button type="submit" class="save btn btn-default">Register</button>

                                </form>

                              </div>
                          </div>
                      </div>
                  </body>
              </html>
                )
            }/>
        </main>
      </div>
    )
  };
};

export default App;