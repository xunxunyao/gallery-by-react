require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//获取图片相关数据
let imageDatas = require('json!../data/imageData.json');

//利用webpack url-loader,只需要传入文件名，即可生成图片的url地址
//获得图片URL
imageDatas = (function (imgs) {
  for (let value of imgs) {
    value.imageURL = require('../images/' + value.fileName)
  }
  return imgs;
})(imageDatas);

//获取区间內的一个随机值
function getRangeRandom([low, high]) {
  return Math.ceil(Math.random() * (high - low) + low);
}

//图片组件
class ImageFigure extends React.Component {
  render() {
    let styleObj = {};
    this.props.arrange.pos && (styleObj = this.props.arrange.pos);
    return (
      <figure className="img-figure" style={styleObj}>
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
  constructor(props) {
    super(props);
    let imgPosArr = [];
    imageDatas.forEach(() =>{
      imgPosArr.push({
        pos: {
          left: 0,
          right: 0
        }
      });
    });

    this.state = {
      //初始化每一个图片的状态对象
      imgsArrangeArr: imgPosArr
    }
  }

  /**
   * 重新布局所有图片
   * @param centerIndex 指定居中显示的图片
   */
  rearrange(centerIndex) {
    let Constant = this.Constant,
      hPosRangeLORX,
      imgsArranges = this.state.imgsArrangeArr,//所有图片状态信息
      imgsArrangeTops = [],//上侧状态信息
      topImgNum = Math.floor(Math.random() * 2),//上侧图片数量0-1
      topImgSpliceIndex = 0, //上侧图片位置
      imgsArrangeCenters = imgsArranges.splice(centerIndex, 1);//中间图片状态信息

    //居中centerIndex的图片
    imgsArrangeCenters[0].pos = Constant.centerPos;

    //取出要布局上侧的图片状态信息
    topImgSpliceIndex = Math.floor(Math.random() * (imgsArranges.length - topImgNum));
    imgsArrangeTops = imgsArranges.splice(topImgSpliceIndex, topImgNum);

    //布局位于上侧的图片
    imgsArrangeTops.forEach((value)=> {
      value.pos = {
        top: getRangeRandom(Constant.vPosRange.topY),
        left: getRangeRandom(Constant.vPosRange.x)
      }
    });

    //布局左右两侧的图片
    for (let i = 0, j = imgsArranges.length, k = j / 2; i < j; i++) {

      //前半部分布局左边，后半部分布局右边
      hPosRangeLORX = i < k ? Constant.hPosRange.leftSecX : Constant.hPosRange.rightSecX;
      imgsArranges[i].pos = {
        top: getRangeRandom(Constant.hPosRange.y),
        left: getRangeRandom(hPosRangeLORX)
      }
    }

    //刚才去除的上侧和中间的图片现在要合并回来
    if (imgsArrangeTops && imgsArrangeTops[0]) {
      imgsArranges.splice(topImgSpliceIndex, 0, imgsArrangeTops[0]);
    }
    imgsArranges.splice(centerIndex, 0, imgsArrangeCenters[0]);

    //设置state重新渲染
    this.setState({
      imgsArrangeArr: imgsArranges
    })
  };

  //组件加载以后，为每一张图片计算其位置的范围
  componentDidMount() {
    //首先拿到舞台的大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      {
        scrollWidth:stageW,
        scrollHeight:stageH
      } = stageDOM,
      [
        halfStageW,
        halfStageH
      ]=[
        Math.ceil(stageW / 2),
        Math.ceil(stageH / 2)
      ];

    //拿到一个图片的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      {
        scrollWidth:imgW,
        scrollHeight:imgH
      } = imgFigureDOM,
      [
        halfImgW,
        halfImgH
      ]=[
        Math.ceil(imgW / 2),
        Math.ceil(imgH / 2)
      ];

    //计算各个区域图片位置的取值范围
    this.Constant = {
      centerPos: {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
      },
      hPosRange: { //水平方向的取值范围 左右区域
        leftSecX: [-halfImgW, halfStageW - halfImgW * 3],
        rightSecX: [halfStageW + halfImgW, stageW - halfImgW],
        y: [-halfImgH, stageH - halfImgH]
      },
      vPosRange: { //垂直方向的取值范围 上面区域
        x: [halfStageW - imgW, halfStageW],
        topY: [-halfImgH, halfStageH - halfImgH * 3]
      }
    };
    this.rearrange(0)


  }

  render() {
    let controllerUnit = [],
      imgFigures = [];

    imageDatas.forEach((value, index)=> {
      imgFigures.push(
        <ImageFigure data={value} ref={'imgFigure' + index}
                     arrange={this.state.imgsArrangeArr[index]}/>)
    });

    return (
      <section className="stage" ref="stage">
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

