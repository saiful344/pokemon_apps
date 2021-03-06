import React from 'react';
import js from "./asset/asset.js";
import css from "./asset/asset.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import loading from "./asset/loading.gif";
import axios from "axios";

class Detail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data : null,
      id : null,
      url : "http://localhost:9000",
    }
  }
  componentDidMount() {
      const id = this.props.match.params.id;
      this.getData(id);
  }

  getData = (id) => {
    axios.get(this.state.url+"/pokemon/"+id)
    .then((res) => {
      this.setState({data:res.data, id : res.data.Data.id})
    })
  }

  render(){
    let ability = this.state.data != null ? this.state.data.Data.abilities[0].ability.name : "0";
    let name = this.state.data != null ? this.state.data.Data.forms[0].name : "Waiting";
    let height = this.state.data != null ? this.state.data.Data.height : "0";
    let weight = this.state.data != null ? this.state.data.Data.weight : "0";
    let id = this.state.data != null ? this.state.data.Data.id : "0";
    return(
        <div>
        <section className="wrapper">
          <nav className="menu">
            <ul className="menu__list">
              <li className="menu__item  js-modify  active" data-target=".card" data-effect="zoom">Zoom out</li>
              <li className="menu__item  js-modify" data-target=".card" data-effect="blur">Blur</li>
              <li className="menu__item  js-modify" data-target=".card" data-effect="color">Colors</li>
            </ul>
          </nav>
          <div className="card" data-effect="zoom">
            <button className="card__save  js-save" type="button">
              <i className="fa  fa-bookmark"></i>
             </button>
            <figure  className="card__image">
              <img src="https://c1.staticflickr.com/4/3935/32253842574_d3d449ab86_c.jpg" alt="Short description"/>
            </figure>
            <div className="card__header">
              <figure className="card__profile">
                <img src={this.state.id != null ?"https://pokeres.bastionbot.org/images/pokemon/"+this.state.id+".png" : loading } alt="Short description"/>
              </figure>
            </div>
            <div className="card__body">
              <h3 className="card__name">{name}</h3>
              <p className="card__job">{ability}</p>
              <p className="card__bio">{ "This poekemon is "+height+" cm tall and weighs "+weight+" gram"}</p>
            </div>
          </div>

        </section>
        </div>
      )
    }
}

export default withRouter(Detail);
