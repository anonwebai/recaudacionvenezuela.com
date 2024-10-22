import * as React from "react"

import HomePage from '../components/HomePage';

import '../styles/global.css';

const IndexPage = () => {
  return (
    <HomePage/>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>Recaudación Venezuela</title>
    <meta name="description" content="Seguimiento de donaciones de yacasivenezuela.com" />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="Recaudación Venezuela" />
    <meta property="og:description" content="Seguimiento de donaciones de yacasivenezuela.com" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://recaudacionvenezuela.com/" />
    <meta property="og:image" content="https://recaudacionvenezuela.com/background.png" />
    <link rel="canonical" href="https://recaudacionvenezuela.com/" />
  </>
);
