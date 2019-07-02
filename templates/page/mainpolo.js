import React,{Component} from "react"
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import NavItem from './../../component/NavItem'
import {  
  DesktopHeader,
  MobileHeader,
  FlexWrapper,
  Layout,
  LogoTitle,
  MenuButton,
  ResponsiveSidebar,
  Sidebar,
  SidebarNav,
  breakpoints,
  headerHeight
} from 'gatsby-theme-apollo';
import {graphql} from 'gatsby';
import "./style.css"

const Header = styled(DesktopHeader)({
    justifyContent : "center",
    //backgroundColor: "transparent",
    color: "black",
    ':hover': {
      color: "#220a82"
    },
    //position:"relative"
})

const Nav = styled.div({
  display: 'flex',
  alignSelf: 'stretch',
  //marginLeft: 'auto',
  //paddingLeft: 40,
  [breakpoints.sm]: {
    display: 'none'
  }
})

const MainContent = styled.div({
  width: 630,
  [breakpoints.sm]: {
    width: '85%'
  }
})

const MainWrapper = styled.main({
  flexGrow: 1,
  outline: 'none',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch'
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
			<Layout>
				 <ResponsiveSidebar>
                {({sidebarRef, onWrapperClick, openSidebar, sidebarOpen}) => (
                  <FlexWrapper onClick={onWrapperClick}>

                  <MainWrapper>

                    <MobileHeader>
                      <MenuButton onClick={openSidebar} />
                    </MobileHeader>

                    <Header>
                      <Nav>
                        {
                          edges.map(({node})=>{
                            const {path,nav} = node.frontmatter;
                            const isActive = this.props.location.pathname == path;
                            return (
                                  <NavItem
                                    key={path}
                                    href={path}
                                    active={isActive}
                                  >
                                    {nav}
                                  </NavItem>
                                );
                          })
                        }
                      </Nav>
                    </Header>

                    <MainContent className="main-content">
                      <div dangerouslySetInnerHTML={{__html: html}}></div>
                    </MainContent>
                  </MainWrapper>
                  </FlexWrapper>
                )}
        </ResponsiveSidebar>				
			</Layout>
		)
	}
}
//<div className="nav-wrapper"/>

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