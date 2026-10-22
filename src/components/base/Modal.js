import React, { useState } from 'react';
import styled from 'styled-components';
import styles from 'styles/Modal.module.css';

const Wrapper = styled.div`
  position: fixed;
  z-index: 900;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate3d(0, 0, 1em);
  pointer-events: ${(props) => (props.$open ? 'inherit' : 'none')};
`;
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, ${(props) => (props.$open ? 0.6 : 0)});
  transition: background-color ${(props) => (props.$open ? '300ms' : '1ms')} ease-in-out;
`;
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => props.$width || '40em'};
  height: ${(props) => props.$height || 'auto'};
  max-width: 90vw;
  max-height: 90vh;
  margin: 1rem;
  background-color: ${(props) => props.$backgroundColor || props.theme.colors.white};
  border-radius: 1em;
  box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.2);
  visibility: ${(props) => (props.$open ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.$open ? 1 : 0)};
  transform: scale(${(props) => (props.$open ? 1 : 0.7)})
    translateY(${(props) => (props.$open ? 0 : '10em')});
  transition: all 300ms ease-in-out;
`;
export default function Modal(props) {
  const [contentLoaded, setContentLoaded] = useState(props.open);

  // Delay unmount on close so the CSS disappear animation can finish playing.
  if (props.open && !contentLoaded) {
    setContentLoaded(true);
  } else {
    setTimeout(() => setContentLoaded(false), 300);
  }

  return (
    <Wrapper $open={props.open}>
      <Background $open={props.open} onClick={() => props.setOpen(false)} />
      <Container
        $open={props.open}
        $width={props.width}
        $height={props.height}
        $backgroundColor={props.backgroundColor}
      >
        <button className={styles.modalButtonClose} onClick={() => props.setOpen(false)}>
          +
        </button>
        {contentLoaded && <div className={styles.modalContent}>{props.children}</div>}
      </Container>
    </Wrapper>
  );
}
