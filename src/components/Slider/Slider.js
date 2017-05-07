import React from 'react';
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
                  direction: 'left'
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
                  direction: 'left'
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
                  background: '#fff',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  zIndex: 2,
            }
      }

      getRightArrowStyle() {
            return {
                  background: '#fff',
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  zIndex: 2,
            }
      }

      render() {
            const style = this.getStyle();
            const leftArrow = this.getLeftArrowStyle();
            const rightArrow = this.getRightArrowStyle();
            return (
                  <div className="infinite-slider-container"
                        style={style.container}>
                        <div style={leftArrow} onClick={this.onSlideLeft}>Left</div>
                        <div className="infinite-slider-wrapper"
                              style={style.wrapper}>
                              {this.head}
                              {this.slides}
                              {this.tail}
                        </div>
                        <div style={rightArrow} onClick={this.onSlideRight}>Right</div>
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