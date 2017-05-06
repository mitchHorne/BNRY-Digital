import React from 'react';

export default class Slider extends React.Component {
      constructor(props) {
            super(props);
            this.initProps(props);
            this.createSlides(props);
            this.state = {
                  key: 0,
                  direction: 'left'
            };
      }

      initProps({ width = "100%", height = "400px", duration = 500 }) {
            this.width = width;
            this.height = height;
            this.duration = duration + 'ms';
      }

      createSlides({ children }) {
            this.slides = children.map((slide, index) => {
                  const backgroundColor = slide.props.background;
                  const style = Object.assign({
                        width: this.width,
                        height: this.height,
                        flexShrink: 0,
                        background: backgroundColor,
                  });
                  return React.cloneElement(slide, {
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
                  }
            };
      }

      render() {
            const style = this.getStyle();
            return (
                  <div className="infinite-slider-container"
                        style={style.container}>
                        <div className="infinite-slider-wrapper"
                              style={style.wrapper}>
                              {this.head}
                              {this.slides}
                              {this.tail}
                        </div>
                  </div>
            );
      }
}

Slider.propTypes = {
      children: React.PropTypes.arrayOf(React.PropTypes.element),
      width: React.PropTypes.string,
      height: React.PropTypes.string,
};