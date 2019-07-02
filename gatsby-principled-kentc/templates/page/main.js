import React,{Component} from "react"
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import {graphql, Link} from 'gatsby';
import {breakpoints} from '../utilities/styled';
import "./style.css"

const HeaderSection= styled.div({
  height: 420
})

const MainContent = styled.div({
  width: 790,
  [breakpoints.sm]: {
    width: '85%'
  }
})

const Declaration = styled.h3({
  maxWidth: 450,
  fontSize:55
});


export default class Main extends Component {

   static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

	render(){
		const {html,frontmatter} = this.props.data.markdownRemark
		const {edges} = this.props.data.allMarkdownRemark
		
		return (
            <React.Fragment>

                <HeaderSection className="header-section deep-header">
                  <div className="header-content horizontal-center">
                    <Declaration>用史上最多的股份，创造史上最多的亿万富豪</Declaration>
                  </div>
                </HeaderSection>

                <div className="main-content card top-card">
                    <div dangerouslySetInnerHTML={{__html: html}}></div>
                </div>
              
            </React.Fragment>
		)
	}
}

export const mainQuery = graphql`
  query($querySlug: String!) {
    markdownRemark(frontmatter: {path: {eq: $querySlug}}) {
      html
      frontmatter {
        path
        title
        description
        order
        nav
        image {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }

    allMarkdownRemark(sort: {order: ASC, fields: [frontmatter___order]}) {
      edges {
        node {
          excerpt
          tableOfContents(pathToSlugField: "frontmatter.path", maxDepth: 2)
          headings {
            depth
            value
          }
          frontmatter {
            path
            title
            description
            order
            nav
            image {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;