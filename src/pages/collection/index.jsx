import React, { Component } from 'react';

import UserGallery from './userGallery'
import Blurb from '../../components/blurb'
import Projects from '../../components/projects'

export default class CollectionPage extends Component {
  render() {
    return (
      <div>
        <Blurb className="col-lg-1 pagination-center" info={this.props.info}/>
        <UserGallery data={this.props.data}/>
        <h2 className="text-center">Projects</h2>
        <Projects projects={this.props.projects}/>
      </div>
    );
  }
}
