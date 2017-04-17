require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片相关数据
let imageDatas = require('json!../data/imageData.json');

//利用webpack url-loader,只需要传入文件名，即可生成图片的url地址
//获得图片URL
imageDatas = (function (imgs) {
  for (let value of imgs) {
    value.imageURL = require('../images/' + value.fileName)
  }
  return imgs
})(imageDatas);

class GalleryByReactApp extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="image-sec">
        </section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
}

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;

