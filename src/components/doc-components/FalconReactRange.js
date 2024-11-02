import React from 'react';
import PropTypes from 'prop-types';
import { Range, getTrackBackground } from 'react-range';
import { useAppContext } from 'providers/AppProvider';

const FalconReactRange = ({
  step = 0.1,
  min = 0,
  max = 100,
  variant = 'primary',
  trackHeight = '0.75rem',
  tipFormatter,
  draggableTrack = false,
  alwaysShowTooltip = false,
  marks = false,
  values,
  onChange
}) => {
  const {
    config: { isDark },
    getThemeColor
  } = useAppContext();

  const Track = ({ props: properties, children }) => (
    <div
      key={properties.key}
      onMouseDown={properties.onMouseDown}
      onTouchStart={properties.onTouchStart}
      style={{
        ...properties.style
      }}
      className="falcon-react-range"
    >
      <div
        ref={properties.ref}
        className="falcon-react-range-track"
        style={{
          height: trackHeight,
          cursor: !draggableTrack ? 'pointer' : 'ew-resize',
          background: getTrackBackground({
            values,
            colors:
              values.length == 2
                ? [
                    getThemeColor('gray-300'),
                    getThemeColor(variant),
                    getThemeColor('gray-300')
                  ]
                : [getThemeColor(variant), getThemeColor('gray-300')],
            min,
            max
          })
        }}
      >
        {children}
      </div>
    </div>
  );

  Track.propTypes = {
    props: PropTypes.shape({
      onMouseDown: PropTypes.func,
      onTouchStart: PropTypes.func,
      style: PropTypes.object,
      ref: PropTypes.object,
      key: PropTypes.number
    }),
    children: PropTypes.node
  };

  const Thumb = ({ props: properties, isDragged, index }) => (
    <div
      {...properties}
      key={properties.key}
      className={`falcon-react-range-thumb ${isDragged && 'dragging'}`}
      style={{
        ...properties.style
      }}
    >
      <div
        className={`falcon-react-range-tooltip ${
          (alwaysShowTooltip || isDragged) && 'show'
        }`}
      >
        {tipFormatter
          ? () => tipFormatter(values[index])
          : values[index].toFixed(1)}
      </div>
    </div>
  );

  Thumb.propTypes = {
    props: PropTypes.shape({
      onMouseDown: PropTypes.func,
      onTouchStart: PropTypes.func,
      style: PropTypes.object,
      key: PropTypes.number
    }),
    isDragged: PropTypes.bool,
    index: PropTypes.number
  };

  const Mark = ({ props: properties, index }) => {
    return (
      <div
        {...properties}
        key={properties.key}
        className="falcon-react-range-mark"
        style={{
          ...properties.style,
          height: '16px',
          width: '4px',
          backgroundColor:
            values.length === 1
              ? index * step < values[0]
                ? getThemeColor(variant)
                : getThemeColor('gray-300')
              : index * step > values[0] && index * step < values[1]
              ? getThemeColor(variant)
              : getThemeColor('gray-300')
        }}
      ></div>
    );
  };

  Mark.propTypes = {
    props: PropTypes.shape({
      style: PropTypes.object,
      key: PropTypes.number
    }),
    index: PropTypes.number
  };

  return (
    <Range
      draggableTrack={draggableTrack}
      key={isDark}
      values={values}
      step={step}
      min={min}
      max={max}
      onChange={onChange}
      renderTrack={Track}
      renderThumb={Thumb}
      renderMark={marks && Mark}
    />
  );
};

FalconReactRange.propTypes = {
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'warning',
    'danger',
    'info',
    'success'
  ]),
  tipFormatter: PropTypes.func,
  draggableTrack: PropTypes.bool,
  trackHeight: PropTypes.string,
  alwaysShowTooltip: PropTypes.bool,
  marks: PropTypes.bool
};

export default FalconReactRange;
