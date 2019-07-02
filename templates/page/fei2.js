import React,{Component} from "react"
import {graphql,Link} from "gatsby"

export default class Fei2 extends Component {
	render(){
		console.log("fei2",this.props)
		const {html} = this.props.data.markdownRemark
		const {link} = this.props.pageContext
		return (
			<div>
				<Link to={link}>to {link}</Link>
				<div dangerouslySetInnerHTML={{__html: html}}></div>
			</div>
		)
	}
}

export const fei2Query = graphql`
  query($qq: String!) {
    markdownRemark(frontmatter: {path: {eq: $qq}}) {
      html
      frontmatter {
        path
        title
        description
        order
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