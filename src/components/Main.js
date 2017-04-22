require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片相关数据
let imageDatas = require('json!../data/imageData.json');

//利用webpack url-loader,只需要传入文件名，即可生成图片的url地址
//获得图片URL
imageDatas = (function(imgs){
  for (let value of imgs) {
    value.imageURL = require('../images/' + value.fileName)
  }
  return imgs;
})(imageDatas);

class ImageFigure extends React.Component {
  render() {
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL}
              alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}

//舞台 大管家的角色
class GalleryByReactApp extends React.Component {
  render() {

    let controllerUnit = [],
      imgFigures = [];

    imageDatas.forEach(value=>{
      imgFigures.push(<ImageFigure data={value}/>)
    });

    return (
      <section className="stage">
        <section className="image-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnit}
        </nav>
      </section>
    );
  }
}

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;

