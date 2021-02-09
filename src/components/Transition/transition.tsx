import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

type TarnsitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
};

const Transition: React.FC<TarnsitionProps> = (props) => {
  const { classNames, children, animation, wrapper, ...restProps } = props;
  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true, // 在元素退场时，自动删除 DOM
  appear: true,
};

export default Transition;
