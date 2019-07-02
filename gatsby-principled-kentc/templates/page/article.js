import React,{Component} from "react"
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import {  
  breakpoints,
} from 'gatsby-theme-apollo';
import {graphql, Link} from 'gatsby';
import "./style.css"

const MainContent = styled.div({
  //width: 790,
  marginTop:130,
  //[breakpoints.sm]: {
  //  width: '85%'
  //}
})



export default class Article extends Component {

   static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

	render(){
		const {html,frontmatter} = this.props.data.markdownRemark
		
		return (
            <React.Fragment>

                <MainContent className="main-content">
                    <div dangerouslySetInnerHTML={{__html: html}}></div>
                </MainContent>
              
            </React.Fragment>
		)
	}
}

export const articleQuery = graphql`
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