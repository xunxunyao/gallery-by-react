require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let imageDatas = require('../data/images.json');

//利用webpack url-loader,只需要传入文件名，即可生成图片的url地址
//let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator"/>
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
