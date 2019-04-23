import styled from 'styled-components'
import React from 'react'

const Box = styled.div`
  height: 50vh;
	width: 100%;
	background: #E5F1FF;
	color: #001F4C;
`;

const Head = styled.div`
  background: #021926;
  color: #dfe6e9;
  margin: 0;
  padding: 1rem;
`;

const HeadTitle = styled.h3`
  margin: 0;
  overflow: hidden;
  text-align: center;

  &:before,
  &:after {
    background: #000;
    border-top: 2px solid #dfe6e9;
    border-bottom: 2px solid #dfe6e9;
    content: "";
    display: inline-block;
    height: 5px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }

  &:before {
    right: 0.5em;
    margin-left: -50%;
  }

  &:after {
    left: 0.5em;
    margin-right: -50%;
  }
`;

export default ({title, children, className}) => (
  <Box className={className}>
    {title && <Head><HeadTitle>{title}</HeadTitle></Head>}
    {children}
  </Box>
)