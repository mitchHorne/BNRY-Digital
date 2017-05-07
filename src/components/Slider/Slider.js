import React from 'react';
import ReactTooltip from 'react-tooltip';
import './slider.css';

const data = require('./images.json');

export default class Slider extends React.Component {
      constructor(props) {
            super(props);
            this.initProps(props);
            this.createSlides(props);
            this.bindHanlders([
                  'onSlideLeft',
                  'onSlideRight'
            ]);
            this.state = {
                  key: 0,
                  direction: 'left',
            };
      }

      initProps({ width = "100%", height = "600px", duration = 500 }) {
            this.width = width;
            this.height = height;
            this.duration = duration + 'ms';
      }

      createSlides() {
            this.slides = data.map((data, index) => {
                  const style = Object.assign({
                        width: this.width,
                        height: this.height,
                        flexShrink: 0,
                        background: `url(${data.url}) center`,
                        backgroundSize: 'cover',
                  });
                  return React.createElement('div', {
                        style,
                        key: index
                  });
            });
            this.head = React.cloneElement(this.slides[this.slides.length - 1], {
                  key: this.slides.length,
                  className: 'head'
            });
            this.tail = React.cloneElement(this.slides[0], {
                  key: -1,
                  className: 'tail'
            });
      }

      componentWillUpdate(nextProps, nextState) {
            const { key, direction } = nextState;
            const skipToLastSlide = (
                  direction === 'left' &&
                  this.state.key === -1 &&
                  key === this.slides.length - 1
            );
            const skipToFirstSlide = (
                  key === 0 &&
                  direction === 'right' &&
                  this.state.key === this.slides.length
            )

            if (skipToFirstSlide || skipToLastSlide) {
                  this.duration = '0s';
            } else {
                  this.duration = this.props.duration + 'ms';
            }
      }

      componentDidUpdate(prevProps, prevState) {
            const { key } = prevState;
            const { direction } = this.state;
            const slideLeftAtHead = (key === -1) && direction === 'left';
            const slideRightAtTail = (key === this.slides.length) && direction === 'right';
            const doSlideAfterSkip = (flag, slideFn) => {
                  if (flag) {
                        setTimeout(() => slideFn.call(this), 200);
                  }
            };
            doSlideAfterSkip(slideLeftAtHead, this.onSlideLeft);
            doSlideAfterSkip(slideRightAtTail, this.onSlideRight);
      }

      bindHanlders(handlers) {
            handlers.forEach((handler) => {
                  this[handler] = this[handler].bind(this);
            });
      }

      onSlideLeft() {
            let key = this.state.key === - 1 ?
                  this.slides.length - 1 :
                  this.state.key - 1;

            this.setState({
                  key,
                  direction: 'left',
            });
      }

      onSlideRight() {
            let key = this.state.key === this.slides.length ?
                  0 : this.state.key + 1;

            this.setState({
                  key,
                  direction: 'right'
            });
      }

      renderDescription() {
            const key = this.state.key;

            if (key === -1) return data[data.length - 1].description;
            if (key === data.length) return data[0].description;
            return data[key].description;
      }

      getPrevSlide() {
            const key = this.state.key;
            const message = 'Previous: Image#';

            if (key === 0) return message + data.length;
            if (key === -1) return message + (data.length - 1);
            return message + key;
      }

      getNextSlide() {
            const key = this.state.key;
            const message = 'Next: Image#';

            if (key === -1 || key === data.length - 1) return message + 1;
            if (key === data.length) return message + 2;
            return message + (key + 2);
      }


      getStyle() {
            return {
                  container: {
                        overflow: 'hidden',
                        position: 'relative',
                        width: this.width,
                        height: this.height,
                  },
                  wrapper: {
                        display: 'flex',
                        transitionDuration: this.duration,
                        transform: `translateX(${100 * -(this.state.key + 1)}%)`,
                  },
            };
      }

      getLeftArrowStyle() {
            return {
                  background: '#000',
                  color: '#fff',
                  left: 0,
                  position: 'absolute',
                  top: '50%',
                  zIndex: 2,
            }
      }

      getRightArrowStyle() {
            return {
                  background: '#000',
                  color: '#fff',
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  zIndex: 2,
            }
      }

      getLeftDiv() {
            return {
                  background: 'rgba(0,0,0,0)',
                  height: this.height,
                  left: 0,
                  position: 'absolute',
                  top: 0,
                  width: '50%',
                  zIndex: 1,
            }
      }

      getRightDiv() {
            return {
                  background: 'rgba(0,0,0,0)',
                  height: this.height,
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  width: '50%',
                  zIndex: 1,
            }
      }

      render() {
            const style = this.getStyle();
            const leftArrow = this.getLeftArrowStyle();
            const rightArrow = this.getRightArrowStyle();
            const leftDiv = this.getLeftDiv();
            const rightDiv = this.getRightDiv();
            return (
                  <div className="infinite-slider-container"
                        style={style.container}>
                        <div data-tip data-for="prevTip" onClick={() => ReactTooltip.rebuild()} className="arrows" style={leftArrow} onClick={this.onSlideLeft}><i className="fa fa-angle-left fa-fw fa-3x"></i></div>
                        <div className="infinite-slider-wrapper"
                              style={style.wrapper}>
                              {this.head}
                              {this.slides}
                              {this.tail}
                        </div>
                        <div data-tip data-for="nextTip" onClick={() => ReactTooltip.rebuild()} className="arrows" style={rightArrow} onClick={this.onSlideRight}><i className="fa fa-angle-right fa-fw fa-3x"></i></div>
                        <h1 className="description">{this.renderDescription()}</h1>

                        <div style={leftDiv} onClick={this.onSlideLeft}></div>
                        <div style={rightDiv} onClick={this.onSlideRight}></div>

                        <ReactTooltip id="prevTip" globalEventOff="click" getContent={() => this.getPrevSlide()} place="right" effect="solid" />
                        <ReactTooltip id="nextTip" globalEventOff="click" getContent={() => this.getNextSlide()} place="left" effect="solid" />
                  </div>
            );
      }
}

Slider.propTypes = {
      children: React.PropTypes.arrayOf(React.PropTypes.element),
      width: React.PropTypes.string,
      height: React.PropTypes.string,
      delay: React.PropTypes.number,
      duration: React.PropTypes.number,
};