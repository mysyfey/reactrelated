import React,{Component} from "react"
import PropTypes from 'prop-types'
import {graphql,Link} from "gatsby"


export default class Fei extends Component {


	render(){
		const {html} = this.props.data.markdownRemark
		const {edges} = this.props.data.allMarkdownRemark
						console.log(edges)
		return (
			<div>
				<ul>
					<li key="/">
								<Link to="/">
									Principled GraphQL
								</Link>
							</li>
					{
						edges.map(({node}) =>{
							return node.frontmatter.title == "" ? null : (
							<li key={node.frontmatter.path}>
								<div>
									<Link to={node.frontmatter.path}>
										{node.frontmatter.title}
									</Link>
									<div dangerouslySetInnerHTML={{__html: node.tableOfContents}}></div>
								</div>
							</li>
							)
						})
					}
				</ul>
				<div dangerouslySetInnerHTML={{__html: html}}></div>
			</div>
		)
	}
}

export const feiQuery = graphql`
  query($querySlug: String!) {
    markdownRemark(frontmatter: {path: {eq: $querySlug}}) {
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