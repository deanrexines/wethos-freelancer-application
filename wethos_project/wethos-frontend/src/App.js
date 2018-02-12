import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router'

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
        const freelancers = res.data.map(obj => obj.fields);
        this.setState({ freelancers });
      });
  }

  componentWillMount() {
    const freelancer_id = window.location.pathname.split("/").pop();
    axios.get('http://localhost:8000/getfreelancers/' + freelancer_id)
      .then(res => {
      const single_freelancer = res.data[0].fields;
      this.setState({ single_freelancer: single_freelancer });
    });
  }

  render() {
    return (
      <div>
        <main>
          <Route
            path='/freelancers'
            render={() => (
              <div>
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
                  </tr>

                  {
                    this.state.freelancers.map(
                      freelancer => <tr>
                                <td>{freelancer.first_name}</td>
                                <td>{freelancer.last_name}</td>
                                <td>{freelancer.bio}</td>
                                <td>{freelancer.city}</td>
                                <td>{freelancer.state}</td>
                                <td>{freelancer.country}</td>
                                <td>{freelancer.personal_website_url}</td>
                                <td>{freelancer.previous_work_urls}</td>
                              </tr>
                      )
                  }
                </table>
              </div>
              )
            }/>
        <Route 
          exact
          path='/freelancer/:id' 
          render={(props) =>
          (
            <div>
              <div>{this.state.single_freelancer.first_name} {this.state.single_freelancer.last_name}</div>
              <p>{this.state.single_freelancer.bio}</p>
              <label>{this.state.single_freelancer.city}, {this.state.single_freelancer.state}, {this.state.single_freelancer.country}</label>
              <div>{this.state.single_freelancer.personal_website_url}</div>
              <div>{this.state.single_freelancer.previous_work_urls}</div>
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
                  <body>
                      <div class="page-header">
                          <a href="http://127.0.0.1:3000/" class="top-menu"><span></span></a>
                          <h1><a href="/">Freelancer Registration</a></h1>
                      </div>
                      <div class="content container">
                          <div class="row">
                              <div class="col-md-8">
                                <h1>Freelancer Sign Up</h1>
                                <form method="POST" action="http://127.0.0.1:8000/register/">
                                <input type='hidden' name='csrfmiddlewaretoken' value='RmSKNpSiHISfGpzeXhPgNyFARduMiACx7W0psBS3pcMUy4lK3IHGgkfRthU4t52N'/>
                                    <p>
                                      <label for="first_name">First Name:</label> 
                                      <input type="text" name="first_name" required id="id_first_name" rows="4" cols="50" maxlength="200" />
                                    </p>
                                    <p>
                                      <label for="last_name">Last Name:</label> 
                                      <input type="text" name="last_name" required id="id_last_name" maxlength="200" />
                                    </p>
                                    <p>
                                      <label for="bio">Bio:</label> 
                                      <textarea name="bio" id="id_bio" rows="5" cols="50" required></textarea>
                                    </p>
                                    <p>
                                      <label for="city"> City:</label> 
                                      <input type="text" name="city" required id="id_city" maxlength="200" />
                                    </p>
                                    <p>
                                      <label for="state">State:</label> 
                                      <input type="text" name="state" required id="id_state" maxlength="200" />
                                    </p>
                                    <p>
                                      <label for="country">Country:</label> 
                                      <input type="text" name="country" required id="id_country" maxlength="200" />
                                    </p>
                                    <p>
                                      <label for="personal_website_url">Personal Website URL (optional):</label> 
                                      <input type="text" name="personal_website_url" id="id_personal_website_url" maxlength="200" />
                                    </p>
                                    <p>
                                      <label for="previous_work_urls">Previous Work URLs (list, maximum of 5, optional):</label> 
                                      <input type="text" name="previous_work_urls" id="id_previous_work_urls" maxlength="200" />
                                    </p>

                                    <button type="submit" class="save btn btn-default">Save</button>

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